import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchQuantity, removeProductFromCart } from "../../redux/actions";   


// Buenas buenas!! Acuérdate de tomar agua!

export const ProductCart = ({ image, name, price, amount, stock, id, cartID }) => {

  // const dispatch = useDispatch();
  var [amount2,setAmount2]= useState(amount);

  // Agrego uno más
  const handleAddOne = () => {
    const aux = amount2 + 1;
    if (aux <= stock) {
      setAmount2(aux);
    };
    // dispatch(patchQuantity(aux,id,cartID));
  };

  // Saco uno
  const handleDeleteOne = () => {
    const aux = amount2 - 1;
    if (aux > 0) {
      setAmount2(aux);
    };
    // dispatch(patchQuantity(amount2,id,cartID));
  };

  // Borra el producto del carrito
  // const handleDeleteAll = () => {
  //   dispatch(removeProductFromCart(id,cartID));
  // };

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
          
            {/* <button onClick={() => handleDeleteAll()}>ELIMINAR</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
