import React, { useState } from "react";
import { ProductCart } from "./ProductCart";
import { useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";

export const ShoppingCart = () => {
  
  // const cart = useSelector ( (state) => state.cart);

  // * Todos estos datos son de prueba y necesarios para que funcione la compra. Se tiene que trear de redux.
  const summary = 1;
  const userID = "cac3ad20-f37c-4376-98a3-d4992cd74ecd";
  const cart = [
    {
      id: "cac3ad20-f37c-4376-98a3-d4992cd74ecd",
      name: "L'Oreal Paris Extra Volume Collagen Mascara",
      price: 13.99,
      stock: 25,
      image:
        "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/025/original/data?1514061111",
      category: "mascara",
    },
    {
      id: "ce80f124-33d2-4d3f-96b4-2c0404bc6d92",
      name: "Holographic Halo Finishing Powder",
      price: 12,
      stock: 19,
      image:
        "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/938/original/open-uri20171224-4-52epl7?1514082690",
      category: "foundation",
    }
  ];

  const [butPayOpen, setButPayOpen] = useState(false);

  return (
    <div>
      <p>Cart</p>
      {cart.length > 0 ? (
        cart?.map((p) => {
          return (
            <div key={p.id}>
              <ProductCart
                key={p.id}
                imgage={p.image}
                name={p.name}
                category={p.category}
                price={p.price}
                // handleDelete= { handleDelete }
              />
            </div>
          );
        })
      ) : (
        <p>Your cart is empty</p>
      )}
      <p>SUBTOTAL</p>
      {/* DEBE CALCULARLO */}
      <p>precio: {summary}</p>
      {/* DEBE REDIRIGIR */}

      {butPayOpen ? (
        <CheckoutBut summary={summary} {...{summary,userID,cart}} />
      ) : (
        <button
        // * Cambiar estilos a tailwind.
        style={{ backgroundColor:"#556353e6", padding:"5px 20px", margin: "10px 0", borderRadius: "5px",color: "white" }}
        type="button" onClick={() => setButPayOpen(true)}>
          Buy
        </button>
      )}

    </div>

  );
};
