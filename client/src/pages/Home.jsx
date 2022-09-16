import React, { useEffect } from "react";
import { BestSellers } from "../components/Home/BestSellers";
import { Brands } from "../components/Home/Brands";
import { NewArrivals } from "../components/Home/NewArrivals";
import { SpecialOffers } from "../components/Home/SpecialOffers";
import { useHomeServices } from "../hooks/useHomeServices";
import { useGlobalServices } from "../hooks/useGlobalServices"
import { useNavigate } from "react-router-dom";



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
    <div>
      <div>
        <h2>Special Offers</h2>
        <button onClick={()=>handleSeeAll("priceAsc")}>see all</button>
        <SpecialOffers offers={listOffers} />
      </div>
      <div>
        <h2>Popular</h2>
        <button onClick={()=>handleSeeAll("ratingDesc")}>see all</button>
        <BestSellers bestSellers={listPopular} />
      </div>
      <div>
        <h2>New Arrivals</h2>
        <button onClick={()=>handleSeeAll("newest")}>see all</button>
        <NewArrivals newArrivals={listNew} />
      </div>
      <div>
        <h2>Our Brands</h2>
        <Brands/>
      </div>
    </div>
  );
};
