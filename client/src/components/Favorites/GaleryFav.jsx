import React from "react";
import { CardFav } from "./CardFav";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/actions";

export const GaleryFav = () => {
  const { favorites, userId} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(addFavorite("dc3fbb01-d32c-4e2a-be22-cbb7ff9f069c",userId))}>Favorite</button>
      <button onClick={() => dispatch(addFavorite("e051ce4c-99ba-4139-ab09-c00491f35420",userId))}>Favorite</button>
      {favorites ? (
        favorites.map((item) => <CardFav key={item} idItem={item} />)
      ) : (
        <></>
      )}
    </div>
  );
};
