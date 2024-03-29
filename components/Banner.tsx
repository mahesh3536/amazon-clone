import React from 'react';
import { Carousel } from 'react-responsive-carousel';//using for slider 
import "react-responsive-carousel/lib/styles/carousel.min.css";//import this css for proper working 
function Banner() {
  return (
    <div className='relative'>
      <div className='w-full absolute h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}
      >
        <div>
           <img src="https://links.papareact.com/gi1" alt="" loading='lazy'/>
        </div>
        <div>
           <img src="https://links.papareact.com/6ff" alt="" loading='lazy'/>
        </div>
        <div>
        <img src="https://links.papareact.com/7ma" alt="" loading='lazy'/>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
