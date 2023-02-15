import moment from 'moment'
import React from 'react'

function Order({id,amount,images,timestamp,items}:any) {
  return (
    <div className='relative border rounded-md'>
       <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
          <div>
            <p className='font-bold text-xs'>ORDER PLACED</p>
            <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
          </div>
          <div>
            <p className='text-xs font-bold'>TOTAL</p>
            <p>{amount} -Next Day Delivery {" "} $2.50</p>
          </div>
          <p className='text-sm whitespace-nowrap sm:text-xl  flex-1 text-right text-blue-500'>{items.length} items</p>
          <p className='top-2 right-2 absolute w-40 lg:w-72 truncate text-xs whitespace-nowrap'>ORDER #{id}</p>
       </div>
       <div className='p-5 sm:p-10'>
          <div className='flex space-x-6 overflow-x-auto'>
             {images.map((image : any) =>(
              <img src={image} alt="helo" className='h-20 sm:h-32 object-contain'/>
             ))}
          </div>
       </div>
    </div>
  )
}

export default Order