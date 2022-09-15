import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BestSellers } from "../components/Home/BestSellers";
import { NewArrivals } from "../components/Home/NewArrivals";
import { SpecialOffers } from "../components/Home/SpecialOffers";

export const Home = () => {
  const { bestSellers, newArrivals, offers } = useSelector((state) => state.home);
  
  return (
    <div>
      <div>
        <h2>Special Offers</h2>
        <button>see all</button>
        <SpecialOffers offers={offers}/>
      </div>
      <div>
        <h2>Popular</h2>
        <button>see all</button>
        <BestSellers bestSellers={bestSellers}/>
      </div>
      <div>
        <h2>New Arrivals</h2>
        <button>see all</button>
        <NewArrivals newArrivals={newArrivals}/>
      </div>
    </div>
  );
};
