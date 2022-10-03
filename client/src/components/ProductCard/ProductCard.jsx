import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNav } from "../../hooks/useNav";
import { addFavorite, deleteFavorite } from "../../redux/actions";

export const ProductCard = ({id ,name, price, image, rank, discount, stock }) => {
  const [activeFavAndCart, setActiveFavAndCart] = useState(false);
  const [activeLink, setActiveLink] = useState(true);
  const { redirectDetails } = useNav();

  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state);

  const discounted = price - Math.round((price * discount) / 100);
  
  const setFavorites = (option) => {
    option === "add" && dispatch(addFavorite(id));
    option === "erase" && dispatch(deleteFavorite(id));
  };


  const goDetails = () => {
    activeLink && redirectDetails(id);
  };


  // ! add discount  tag
  if (stock > 0)
    return (
      <div className="w-full"
      onClick={goDetails}
      >
        <div
          className="h-52 relative"
          onMouseOver={() => setActiveFavAndCart(true)}
          onMouseLeave={() => setActiveFavAndCart(false)}
        >
          <img
            src={image}
            alt="product"
            onError={(e) => {
              e.target.src =
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-index-makeup-essentials-1645556621.jpg?crop=0.444xw:0.888xh;0.260xw,0.0673xh&resize=640:*";
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary cursor-pointer"
            
          />
          <div className="w-full justify-center absolute bottom-2 flex">
            <div
              className={`w-28 py-1 flex justify-around bg-secondary rounded-3xl opacity-0 ${
                activeFavAndCart && "opacity-95"
              }`}
              onMouseOver={() => setActiveLink(false)}
          onMouseLeave={() => setActiveLink(true)}
            >
              {favorites && favorites.includes(id) ? (
                  <button
                    className={`material-icons w-9 text-3xl text-white px-1`}
                    onClick={() => setFavorites("erase")}
                  >
                    heart_broken_outlined
                  </button>
                ) : (
                  <button
                    className={`material-icons w-9 text-3xl text-white px-1`}
                    onClick={() => setFavorites("add")}
                  >
                    favorite_border
                  </button>
                )}
              <button className="material-icons w-9 text-3xl text-white ">
                add_shopping_cart_rounded
              </button>
            </div>
          </div>
        </div>
        <h2 className="mt-4 text-sm text-primary uppercase">{name}</h2>
        <div className="flex flex-row justify-between items-center pt-2">
          {discount ? (
            <h5 className="text-sm text-secondary">
              <span className="line-through">${price}</span>
              <span className="font-bold text-base"> ${discounted}</span>
            </h5>
          ) : (
            <h5 className="text-secondary text-sm">${price}</h5>
          )}
          <h5 className="flex space-x-2">
            <span className="text-md material-icons text-secondary">star</span>{" "}
            <span className="text-md">{rank}</span>
          </h5>
        </div>
      </div>
    );
};
