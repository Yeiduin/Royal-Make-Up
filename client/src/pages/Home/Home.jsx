import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperComponent } from "../../components/SwiperComponent/SwiperComponent";
import { filterProducts, getProducts, sortProducts } from "../../redux/actions";
import { NewArrivalsGallery } from "../../components/NewArrivalsGallery/NewArrivalsGallery"
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader"
import { ToastContainer } from 'react-toastify';

export const Home = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { listNewArrivals, listPopular, listOffers } = useSelector(
    (state) => state
  );
  let offersArray = listOffers.slice(0, 12);
  let popularArray =  listPopular.slice(0, 12);
  let newArray = listNewArrivals.slice(0, 12);

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const handleSeeAll = (e) => {
    e.preventDefault();

    if(e.target.value === "offers"){
      dispatch(sortProducts(e.target.value))
      dispatch(filterProducts({
        brands: "all",
        categories: "all",
        priceMin: "",
        priceMax: "",
        offers: true,
      }))
    } else {
    dispatch(filterProducts({
      brands: "all",
      categories: "all",
      priceMin: "",
      priceMax: "",
      offers: false,
    }))
    dispatch(sortProducts(e.target.value))
  }
    navigate('/catalogue')
  };

  if(!offersArray?.length || !popularArray?.length || !newArray?.length){
    return(
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
      <div className="flex justify-between pt-40 pb-10">
      <Loader />
      </div>
      </div>
    )
  } else return (
    <div className="font-sans text-primary p-5">
      <ToastContainer/>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pb-10">
          <h2 className="text-2xl font-bold">Special Offers</h2>
          <button
          value="offers"
            onClick={handleSeeAll}
            className="text-lg hover:text-secondary"
          >
            see all
          </button>
        </div>
        <SwiperComponent array={offersArray} />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-20 pb-10">
          <h2 className="text-2xl font-bold">Popular</h2>
          <button
          value="popular"
            onClick={handleSeeAll}
            className="text-lg hover:text-secondary"
          >
            see all
          </button>
        </div>
        <SwiperComponent array={popularArray} />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-4">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <button
          value="newest"
            onClick={handleSeeAll}
            className="text-lg hover:text-secondary"
          >
            see all
          </button>
        </div>
        <NewArrivalsGallery newArrivals={newArray} />
      </div>
    </div>
  );
};
