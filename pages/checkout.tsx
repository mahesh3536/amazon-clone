import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/dist/client/image'
import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice'
const stripePromise = loadStripe(process.env.stripe_public_key as any)
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal)
  const session = useSession();
  const total1 = total.toFixed(2);
  
  const  createCheckoutSession = async() => {
      const  stripe = await stripePromise;
      
      const checkoutSession = await axios.post('/api/create-checkout-session',{
        items:items,
        email:session.data?.user?.email
      })
      const result = await stripe?.redirectToCheckout({
        sessionId:checkoutSession.data.id
      })
      if(result?.error) {
        alert(result.error.message);
      }
  }
  return (
    <div className='bg-gray-100'>
      <Header/>
       <main className='lg:flex max-w-screen-xl mx-auto '>
        {/* left */}
        <div className='flex-grow-0 m-5 shadow-sm'>
            <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt="hello"
            className='object-contain'
            />
            <div className='flex flex-col p-5 space-y-18 bg-white'>
                <h1 className='text-3xl border-b pb-4'>
                  {items.length === 0 ? "Your Amazon Basket is empty." : "Shopping Basket"}
                </h1>
                {
                  items.map((item:any,i:any) =>(
                    <CheckoutProduct
                    key = {i}
                    id={item.id}
                    title = {item.title}
                    rating = {item.rating}
                    price = {item.price}
                    description = {item.description}
                    category = {item.category}
                    image = {item.image}
                    hasPrime = {item.isPrime}
                    
                    />
                  ))
                }
            </div>
        </div>
         {/* right */}
         <div className='flex flex-col bg-gray-100 p-10 shadow-sm'>
          {
            items.length >0 && (
              <>
                <h2>Subtotal ({items.length} items):</h2>
                <span className='font-bold'>
                     ${total1}
                </span>
                <button className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}
                disabled={!session}
                role="link"
                onClick={createCheckoutSession}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </>
            )
          }
         </div>
       </main>
    </div>
  )
}

export default Checkout
