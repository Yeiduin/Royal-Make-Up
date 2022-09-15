import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BestSellers } from "../components/Home/BestSellers";
import { NewArrivals } from "../components/Home/NewArrivals";
import { SpecialOffers } from "../components/Home/SpecialOffers";
import { useHomeServices } from "../hooks/useHomeServices";
import { useListProductsServices } from "../hooks/useListProductsServices";


export const Home = () => {
  const {
    getGalleries,
    home: { listNew, listPopular, listOffers },
  } = useHomeServices();

  useEffect(() => {
    getGalleries();
  }, [listNew, listPopular, listOffers]);
  
  return (
    <div>
      <div>
        <h2>Special Offers</h2>
        <button>see all</button>
        <SpecialOffers offers={listOffers}/>
      </div>
      <div>
        <h2>Popular</h2>
        <button>see all</button>
        <BestSellers bestSellers={listPopular}/>
      </div> 
      <div>
        <h2>New Arrivals</h2>
        <button>see all</button>
        <NewArrivals newArrivals={listNew}/>
      </div>
    </div>
  );
};
