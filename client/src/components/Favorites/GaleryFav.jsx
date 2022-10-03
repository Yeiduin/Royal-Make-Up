import React from "react";
import { CardFav } from "./CardFav";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/actions";


export const GaleryFav = () => {
  const { favorites, userId} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap justify-center xl:justify-start items-end my-7">
      {favorites ? (
        favorites.map((item) => <CardFav key={item} idItem={item} />)
      ) : (
        <></>
      )}
    </div>
  );
};
