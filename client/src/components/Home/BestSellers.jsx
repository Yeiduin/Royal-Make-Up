import React from "react";
import { Link } from "react-router-dom";
import { GalleryCard } from "../ListProducts/GalleryCard";
import styles from "../../assets/css/Home.module.css"
import { SwiperComponent } from "./SwiperComponent";

export const BestSellers = ({ bestSellers }) => {
  
  return (
    <div >
      <SwiperComponent array={bestSellers}/>
      </div>
   
    // <div className="bg-white">
     
    //   <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    //   <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //   {bestSellers?.map((p) => {
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
    // </div>
    // </div>

  );
};
