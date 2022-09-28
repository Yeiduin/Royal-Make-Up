import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, getFavorites } from "../../redux/actions";
import "./favorites.css";
import heart from "./heart.svg";
export const CardFav = ({ idItem }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state);


  const [item, setItem] = useState({
    name: "nombre",
    category: "cream",
    image: "./crema.png",
    price: 20,
  });
  const { name, category, image, price } = item;

  const getItem = async () => {
    try {
      let resp = await axios(`/products/${idItem}`);
      return setItem(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = () => {
    dispatch(deleteFavorite(idItem, userId));
  };

  useEffect(() => {
    getItem(idItem);
  }, []);

  return (
    <div className="cardFav">
      {category}
      {name}
      <img src={image} alt="product" />
      price: {price}
      <img
        onClick={handleClickDelete}
        src={heart}
        alt="favorites"
        style={{ height: "40px", cursor: "pointer" }}
      />
    </div>
  );
};
