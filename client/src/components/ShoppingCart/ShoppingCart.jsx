import React, { useState } from "react";
import { ProductCart } from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";
import { useEffect } from "react";
import { addToCart, getCartByUserId } from "../../redux/actions";

export const ShoppingCart = () => {

  const dispatch = useDispatch();

  
  const { summary, cartByUserId } = useSelector ( (state) => state);

  let userLogged = JSON.parse(localStorage.getItem('userLogged'));

  let cartlocal = JSON.parse(localStorage.getItem('cartlocal'));

  useEffect ( () => {
      dispatch(addToCart(cartlocal,userLogged.id));
      dispatch(getCartByUserId(userLogged.id))
      // localStorage.setItem('cartlocal',JSON.stringify([]));
  },[dispatch]); 


  console.log(cartByUserId)
  const [butPayOpen, setButPayOpen] = useState(false);

  return (
    <div>
      <p>Cart</p>
      <div className="flex-row">
         <div>
        {cartByUserId?.length > 0 ? (
        cartByUserId?.map((p) => {
          return (
            <div key={p.id}>
              <ProductCart 
                key={p.id}
                imgage={p.image}
                name={p.name}
                category={p.category}
                price={p.price}
                amount={p.amount}
              />
            </div>
          );
        })
      ) : (
        <p>Your cart is empty</p>
      )}
      </div>
      <div>
        <p>SUBTOTAL</p>
      {/* DEBE CALCULARLO */}
      <p>precio: {summary.toFixed(2)}</p>
      {/* DEBE REDIRIGIR */}
      </div>
      </div>
     
      {/* <div>
        {butPayOpen ? (
        <CheckoutBut summary={summary} {...{userID,cart}} />
      ) : (
        <button
        // * Cambiar estilos a tailwind.
        style={{ backgroundColor:"#556353e6", padding:"5px 20px", margin: "10px 0", borderRadius: "5px",color: "white" }}
        type="button" onClick={() => setButPayOpen(true)}>
          Buy
        </button>
      )}
      </div> */}

      

    </div>

  );
};
