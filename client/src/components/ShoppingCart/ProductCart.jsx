import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeAllFromCart,
  removeOneFromCart,
} from "../../redux/actions";

export const ProductCart = ({ imgage, name, category, price }) => {
  const dispatch = useDispatch();

  const handleAddOne = () => {
    dispatch(addToCart());
  };

  const handleDeleteOne = () => {
    dispatch(removeOneFromCart());
  };

  const handleDeleteAll = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <div>
      <div img={imgage}></div>
      <p>{name}</p>
      <p>{category}</p>
      <p>{price}</p>
      <button onClick={() => handleDeleteOne()}>-</button>
      <p>1</p>
      <button onClick={() => handleAddOne()}>+</button>
      <button>CORAZON</button>
      <button onClick={() => handleDeleteAll()}>ELIMINAR</button>
    </div>
  );
};
