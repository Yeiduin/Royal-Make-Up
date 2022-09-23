import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperComponent } from "../../components/SwiperComponent/SwiperComponent";
import { getHomeProducts, setDefaultSort } from "../../redux/actions";
import { BrandsGallery } from "../../components/BrandsGallery/BrandsGallery" 
import { NewArrivalsGallery } from "../../components/NewArrivalsGallery/NewArrivalsGallery"
import { useNavigate } from "react-router-dom";


export const Home = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { listNewArrivals, listPopular, listOffers } = useSelector(
    (state) => state
  );
  listOffers.splice(12);
  listPopular.splice(12);
  listNewArrivals.splice(12);

  useEffect(() => {
    dispatch(getHomeProducts())
    console.log(listOffers)
  }, [dispatch]);

  const handleSeeAll = (e) => {
    e.preventDefault();
    if(e.target.value === "offers") dispatch(setDefaultSort(listOffers))
    if(e.target.value === "popular") dispatch(setDefaultSort(listPopular))
    if(e.target.value === "newest") dispatch(setDefaultSort(listNewArrivals))
    navigate('/catalogue')
  };

  return (
    <div className="font-sans">
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
          <h2 className="text-xl">Special Offers</h2>
          <button
          value="offers"
            onClick={handleSeeAll}
            className="text-sm hover:text-secondary"
          >
            see all
          </button>
        </div>
        <SwiperComponent array={listOffers} />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
          <h2 className="text-xl">Popular</h2>
          <button
          value="popular"
            onClick={handleSeeAll}
            className="text-sm hover:text-secondary"
          >
            see all
          </button>
        </div>
        <SwiperComponent array={listPopular} />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
          <h2 className="text-xl">New Arrivals</h2>
          <button
          value="newest"
            onClick={handleSeeAll}
            className="text-sm hover:text-secondary"
          >
            see all
          </button>
        </div>
        <NewArrivalsGallery newArrivals={listNewArrivals} />
      </div>

      {/* <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
          <h2 className="text-xl">Featured Brands</h2>
        </div>
        <BrandsGallery />
      </div> */}
    </div>
  );
};