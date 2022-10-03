import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchQuantity, removeProductFromCart } from "../../redux/actions";   
import { useSelector } from "react-redux";


// Buenas buenas!! Acuérdate de tomar agua!

export const ProductCart = ({ image, name, price, amount, stock, id, cartID }) => {

  const dispatch = useDispatch();
  var [amount2,setAmount2]= useState(amount);

  // Agrego uno más
  const handleAddOne = () => {
    const aux = amount2 + 1;
    if (aux <= stock) {
      setAmount2(aux);
    };
    dispatch(patchQuantity(aux,id,cartID));
  };

  const handleDeleteOne = () => {
    const aux = amount2 - 1;
    if (aux > 0) {
      setAmount2(aux);
    };
    dispatch(patchQuantity(amount2,id,cartID));
  };

  const handleDeleteAll = () => {
    dispatch(removeProductFromCart(id,cartID));
  };

  return (
    <div className="flex">
      <div className="w-40 h-40 ">
        <img src={image} alt="imagen del producto" />
      </div>
      <div className="flex-row justify-around">
        <div>
          <div className="flex pb-8">
            <p>{name}</p>
            <p className="pl-4">$ {price}</p>
          </div>
          {/* <p>{category}</p> */}
        </div>
        <div className="flex">
          <div className="flex">
            <button onClick={handleDeleteOne}>-</button>
            <p>{amount2}</p>
            <button onClick={() => handleAddOne()}>+</button>
          </div>
          <div className="flex">
            {/* <button className="">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button> */}
            <button onClick={() => handleDeleteAll()}>ELIMINAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};
