import { buffer } from "micro"
import * as admin from "firebase-admin"
const serviceAccount = require('../../permissions.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
}) : admin.app();
//establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullfillOrder = async (session) =>{
    return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders").doc(session.id).set({
        amount : session.amount_total/100,
        images : JSON.parse(session.metadata.images),
        timestamp : admin.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
        console.log(`success : order ${session.id} had been added to the db`)
    }).catch((err) => console.log("not added to db"));
}
export default async(req,res) => {
    if(req.method === "POST"){
       
       const reqbuffer =await buffer(req);
       const payload = reqbuffer.toString();
       const sig = req.headers["stripe-signature"]; 

       let event;
       //verify that the event posted came from stripe 
       try{
        event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);
       }
       catch(err){
         console.log('Error',err.message);
         return res.status(400).send(`webhook error : ${err.message}`)
       }
       //handle the checkout.session.completed event
       if(event.type === 'checkout.session.completed'){
        const session = event.data.object;
        //fullfill the order
        return fullfillOrder(session).then(()=> res.status(200)).catch((err)=>res.status(400).send(`webhook error ${err.message}`)) 

       }

    }
    
}

export const config = {
    api : {
        bodyParser : false,
        externalResolver : true
    }
}