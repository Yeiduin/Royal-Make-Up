import React from "react";
import { CardFav } from "./CardFav";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/actions";


export const GaleryFav = () => {
  const { favorites, userId} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap justify-center xl:justify-start items-end my-7">
       <button onClick={() => dispatch(addFavorite("a93359d0-2cd1-4007-ba25-fe6ea719bb17",userId))}>item1</button>
      <button onClick={() => dispatch(addFavorite("4371f25c-85ea-4ee7-a0b6-863a68234075",userId))}>item2</button>
      <button onClick={() => dispatch(addFavorite("e051ce4c-99ba-4139-ab09-c00491f35420",userId))}>item3</button>
      {favorites ? (
        favorites.map((item) => <CardFav key={item} idItem={item} />)
      ) : (
        <></>
      )}
    </div>
  );
};
