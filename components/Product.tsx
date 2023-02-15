import { StarIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
const MAX_RATING = 5;
const MIN_RATING = 1;
export default function Product({id,title,price,description,category,image}:any) {
  const dispatch = useDispatch();
  // const [rating] = useState(
  //   Math.floor(Math.random() + (MAX_RATING-MIN_RATING+1)) + MIN_RATING
  // );
  // const [hasPrime] = useState(Math.random() < 0.5);
  const [isPrime,setIsPrime] = useState(false);
  const [rating,setRating] = useState(3);
  useEffect(()=>{
    setRating(
      Math.floor(Math.random() * (MAX_RATING-MIN_RATING +1))+MIN_RATING
    )
    setIsPrime(Math.random() < 0.5)
  },[])
  const  addItemToBasket = () => {
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
  return (
    <div className='relative flex flex-col m-5 bg-red z-30 p-10 justify-center bg-white'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
        <div className='flex flex-col justify-center items-center'>
        <img src={image} height={200} width={200} className="object-contain"/>
        </div>
        
        <h4>{title}</h4>
        <div className='flex'>
            {
                Array(rating).fill(1).map((_,i)=>(
                    <StarIcon className='h-5 text-yellow-500'/>
                ))
            }
        </div>
        <p className='text-xs my-2 line-clamp-2'>{description}</p>
        <div className='mb-5'>
          ${price}
        </div>
        {
          isPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
              <img src="https://links.papareact.com/fdw" alt="" className='w-12'/>
              <p className='text-xs text-gray-500'>Free next day delivery</p>
            </div>
          )
        }
        <button className='mt-auto button' onClick= {addItemToBasket}>Add to basket</button>
    </div>
  )
}
