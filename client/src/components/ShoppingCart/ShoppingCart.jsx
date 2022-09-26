import React, { useState } from "react";
import { ProductCart } from "./ProductCart";
import { useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";

export const ShoppingCart = () => {
  
  const { summary, cart } = useSelector ( (state) => state);

  // * Todos estos datos son de prueba y necesarios para que funcione la compra. Se tiene que trear de redux.
  const userID = "cac3ad20-f37c-4376-98a3-d4992cd74ecd";

  const [butPayOpen, setButPayOpen] = useState(false);

  return (
    <div>
      <p>Cart</p>
      <div className="flex">
         <div>
        {cart ? (
        cart?.map((p) => {
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
     
      <div>
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
      </div>

      

    </div>

  );
};
