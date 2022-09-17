import React from "react";
import { SwiperComponent } from "./SwiperComponent";

export const BestSellers = ({ bestSellers }) => {
  
  return (
    <div >
      <SwiperComponent array={bestSellers}/>
      </div>
  );
};
