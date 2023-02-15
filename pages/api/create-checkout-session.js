const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async(req,res)=>{
    const {items,email} = req.body;
    // console.log(items);
    const transformedData = items?.map(item => ({
        
        quantity : 1,
        price_data : {
            currency:'gbp',
            unit_amount : item.price * 100,
            product_data : {
                name : item.title,
                images : [item.image]
            },
        }
    }))
    
    // console.log(transformedData)
//     const session = await stripe.checkout.sessions.create({
//         success_url: 'https://example.com/success',
//         line_items : [transformedData],
//   mode: 'payment'
//       });
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        // shipping_rates : ['shr_1MY6n7SDdBJpgyFTZsmh5Cfb'],
        shipping_address_collection: {
            allowed_countries : ['GB','US','CA']
        },
        line_items : transformedData,
        mode : "payment",
        success_url : `${process.env.HOST}/success`,
        cancel_url : `${process.env.HOST}/checkout`,
        metadata : {
            email,
            images : JSON.stringify(items?.map(item => item.image))
        }
    })

    res.status(200).json({id:session.id})
}