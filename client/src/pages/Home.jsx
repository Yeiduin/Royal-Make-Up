import React, { useEffect } from "react";
import { Brands } from "../components/Home/Brands";
import { NewArrivals } from "../components/Home/NewArrivals";
import { useHomeServices } from "../hooks/useHomeServices";
import { useGlobalServices } from "../hooks/useGlobalServices"
import { useNavigate } from "react-router-dom";
import { SwiperComponent } from "../components/Home/SwiperComponent";



export const Home = () => {
const navigate = useNavigate()
  const {
    getGalleries,
    home: { listNew, listPopular, listOffers },
  } = useHomeServices();

  const {
    changeOrderBy
  } = useGlobalServices();

  const handleSeeAll = (order) => {
    changeOrderBy(order);
    navigate("/listproducts/1")    
  };

  useEffect(() => {
    getGalleries();
  }, []);

  return (
    <div className="font-sans">
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">Special Offers</h2>
        <button onClick={()=>handleSeeAll("priceAsc")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <SwiperComponent array={listOffers} />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
      <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">Popular</h2>
        <button onClick={()=>handleSeeAll("ratingDesc")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <SwiperComponent array={listPopular}/>
      
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
      <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">New Arrivals</h2>
        <button onClick={()=>handleSeeAll("newest")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <NewArrivals newArrivals={listNew} />
      </div>
      
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
      <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">Featured Brands</h2>
      
        
      </div>
      <Brands/>
      </div>
    </div>
  );
};
