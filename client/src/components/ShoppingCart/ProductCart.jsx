import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchQuantity, removeProductFromCart, getCartByUserId } from "../../redux/actions";


// Buenas buenas!! Acuérdate de tomar agua!

export const ProductCart = ({ image, name, price, amount, stock, id, cartID, discount }) => {

  const dispatch = useDispatch();
  var [amount2, setAmount2] = useState(amount);
  let userLogged = JSON.parse(localStorage.getItem('userLogged'));

  // Agrego uno más
  const handleAddOne = () => {
    const aux = amount2 + 1;
    if (aux <= stock) {
      setAmount2(aux);
      dispatch(patchQuantity(aux,id,cartID))
    .then(() => {
      dispatch(getCartByUserId(userLogged?.id));
    });
    };
    
  };

  // Saco uno
  const handleDeleteOne = () => {
    const aux = amount2 - 1;
    if (aux > -1) {
      setAmount2(aux);
      dispatch(patchQuantity(amount2,id,cartID))
    .then(() => {
      dispatch(getCartByUserId(userLogged?.id));
    });
    };
  };

  // Borra el producto del carrito
  const handleDeleteAll = () => {
    dispatch(removeProductFromCart(id,cartID))
    .then(() => {
      dispatch(getCartByUserId(userLogged?.id));
    });
  };

  return (
    <div className="xl:w-1/2 w-[44rem] p-4">
      <div className="flex justify-start m-5">
        <div className="w-40 h-40 ">
          <img src={image} alt="imagen del producto"
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary" />
        </div>
        <div className="w-2/3 flex flex-col justify-between ">
          <div className="w-full flex flex-row justify-between m-2">
            <div>
              <p className=" text-primary uppercase px-4 text-lg">{name}</p>
              <br />
            </div>
            <div className="text-lg text-secondary flex">
            {discount ? (
              <div className="text-lg text-secondary flex">
                <span className="line-through">${parseFloat(price.toFixed(2))}</span>
                <span className="pl-2 text-lg"> ${parseFloat(price - (price * discount / 100).toFixed(2))}</span>
              </div>
            ) : (
              <h2 className="text-secondary text-lg">${price}</h2>
            )}
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between m-2 ">
            <div className="flex text-primary px-3">
              <div className=" flex items-center text-center rounded-2xl border-2 border-[#556353]">
                <button onClick={handleDeleteOne}
                  className='p-2'
                ><b>-</b></button>
                <p className="p-4 text-xl">{amount}</p>
                <button onClick={() => handleAddOne()}
                  className='p-2'
                ><b>+</b></button>
              </div>
            </div>
            <div className="flex">
              <span onClick={() => handleDeleteAll()}
                className="text-2xl material-icons text-primary cursor-pointer hover:text-red-600 px-1">
                delete
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
