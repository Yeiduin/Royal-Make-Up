import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryCard } from '../ListProducts/GalleryCard';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import styles from '../../assets/css/Home.module.css'
import { SwiperComponent } from "./SwiperComponent";




export const SpecialOffers = ({ offers }) => {
 

  return (
    <SwiperComponent array={offers}/>
  );



    // <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
     
    // <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    // <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //   {offers?.map((p) => {
    //     return (
    //         <Link to={`/details/${p.id}`} key={p.id}>
    //           <GalleryCard
    //             name={p.name}
    //             price={p.price}
    //             image_link={p.image_link}
    //             rating={p.rating}
    //           />
    //         </Link>
    //     );
    //   })}
    // </div>
    // </div></div>
  
}
