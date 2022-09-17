import React, { useEffect } from "react";
import { BestSellers } from "../components/Home/BestSellers";
import { Brands } from "../components/Home/Brands";
import { NewArrivals } from "../components/Home/NewArrivals";
import { SpecialOffers } from "../components/Home/SpecialOffers";
import { useHomeServices } from "../hooks/useHomeServices";
import { useGlobalServices } from "../hooks/useGlobalServices"
import { useNavigate } from "react-router-dom";
import styles from '../assets/css/Home.module.css'



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

  // ! hay que agregar los onClick que dirijan a la página listProducts con el ordenamiento correspondiente
  return (
    <div className="font-sans">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">Special Offers</h2>
        <button onClick={()=>handleSeeAll("priceAsc")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <SpecialOffers offers={listOffers}/>
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">Popular</h2>
        <button onClick={()=>handleSeeAll("ratingDesc")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <BestSellers bestSellers={listPopular} />
      
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="flex justify-between pt-20 pb-10">
        <h2 className="text-xl">New Arrivals</h2>
        <button onClick={()=>handleSeeAll("newest")} className="text-sm hover:text-secondary">see all</button>
        </div>
        <NewArrivals newArrivals={listNew} />
      </div>
      <div>
        <h2 className="text-xl">Featured Brands</h2>
        <Brands/>
      </div>
    </div>
  );
};
