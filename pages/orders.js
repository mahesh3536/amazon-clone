import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore/lite';
import {getDoc} from "firebase/firestore"
import moment from 'moment/moment';
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import Header from '../components/Header'
import db from "../firebase"
import Order from "../components/OrderComponent"
function Orders({orders}) {
  const { data: session, status }  = useSession();
  // console.log(orders);
  // const colRef1 = collection(db,`users/${session?.user?.email}/orders`);
  return (
    <div>
        <Header/>
        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
            {session ? ( <h2>x orders</h2>) : (<h2>Please sign in to see your orders</h2>)}
            <div className='mt-5 space-y-4'>
              {orders?.map(({id,amount,images,timestamp,items}) => (
                <Order
                key={id}
                id={id}
                amount={amount}
                items = {items}
                timestamp = {timestamp}
                images = {images}
                />
              ))}
            </div>
           
        </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context){
       const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
       //get the user logged in credentials 
       const session = await getSession(context);
       if(!session){
        return {
            props:{}
        }
       }
       
       const colRef1 = collection(db,`users/${session?.user?.email}/orders`);
       const q = query(colRef1,orderBy("timestamp","desc"))
       const stripeOrders = await getDocs(q);
       
       const orders = await Promise.all(
        stripeOrders.docs.map( async(order)=>(
          {
            id:order.id,
            amount : order.data().amount,
            images : order.data().images,
            timestamp : moment(order.data().timestamp.toDate()).unix(),
            items: (
              await stripe.checkout.sessions.listLineItems(order.id,{
                limit : 100
              })
            ).data
          }
        ))
       )
       return {
         props:{
          orders
         }
       }
}
