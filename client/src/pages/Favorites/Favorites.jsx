import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GaleryFav } from "../../components/Favorites/GaleryFav";
import {getFavorites } from "../../redux/actions";

export const Favorites = () => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem('userLogged'));
  const userId = userLogged && userLogged.id ? userLogged.id : "";
  const localFav = JSON.parse(localStorage.getItem("favorites"));

  const saveFavoritesInUser = async () => {
    const { data } = await axios.get(`/favorites?userId=${userId}`);
    if (!data.length && localFav.length)
      for (let i = 0; i < localFav.length; i++) {
        const config = {
          method: "post",
          url: "/favorites",
          headers: { "Content-Type": "application/json" },
          data: { userId, productId: localFav[i] },
        };

        await axios(config)
          .then(() => {
            console.log("product added successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    dispatch(getFavorites(userId));
  };

  useEffect(() => {
    userId && saveFavoritesInUser();
  }, []);

  return (
    <div className="container m-auto">
      <GaleryFav />
    </div>
  );
};
