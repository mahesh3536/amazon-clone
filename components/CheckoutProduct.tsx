import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/dist/client/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
const MAX_RATING = 5;
const MIN_RATING = 1;
function CheckoutProduct({id,title,price,rating,description,category,image,hasPrime}:any) {
    const [isPrime,setIsPrime] = useState(false);
    const [israting,setRating] = useState(3);
    useEffect(()=>{
      setRating(
        Math.floor(Math.random() * (MAX_RATING-MIN_RATING +1))+MIN_RATING
      )
      setIsPrime(Math.random() < 0.5)
    },[])
    const dispatch = useDispatch()
    const addItemToBasket = () =>{
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            isPrime
        }
        //sending the basket as an action to the redux store .. the basket slice 
        dispatch(addToBasket(product as any))
    }
    const removeItemFromBasket = () =>{
        dispatch(removeFromBasket({id} as any))
    }
  return (
    <div className='grid grid-cols-5 mt-7'>
       <Image
        src={image}
        alt = "image"
        height={200}
        width = {200}
        className="object-contain"
       />
       {/* Middle */}
       <div className='col-span-3 mx-5'>
          <p>{title}</p>
          <div className='flex'>
            {
                Array(rating).fill(1).map((_,i)=>(
                    <StarIcon className='h-5 text-yellow-500'/>
                ))
            }
          </div>
          <p className='text-xs my-2 line-clamp-3'>{description}</p>
          <div className='font-semibold'>${price}</div>
          {
          hasPrime && (
            <div className='flex items-center space-x-2'>
              <img src="https://links.papareact.com/fdw" alt="" className='w-12' loading='lazy'/>
              <p className='text-xs text-gray-500'>Free next day delivery</p>
            </div>
          )
        }
       </div>
       <div className='flex flex-col space-y-2 my-auto justify-self-end'>
         <button className='button' onClick={addItemToBasket}>Add to Basket</button>
         <button className='button' onClick = {removeItemFromBasket}>Remove from Basket</button>
       </div>
    </div>
  )
}

export default CheckoutProduct
