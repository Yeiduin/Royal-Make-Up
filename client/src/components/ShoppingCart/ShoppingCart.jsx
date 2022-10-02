import React, { useState } from "react";
import { ProductCart } from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";
import { useEffect } from "react";
//                     


//HOLA VISITANTE, TE HAGO UN RECORRIDO POR MI CÓDIGO
export const ShoppingCart = () => {

  //Esto supongo que se entiende
  const dispatch = useDispatch();
  // const { summary, cartByUserId } = useSelector ( (state) => state);

  //Acá me traigo estos valores del localstorage
  let userLogged = JSON.parse(localStorage.getItem('userLogged'));
  let cartlocal = JSON.parse(localStorage.getItem('cartlocal'));
  let summary = JSON.parse(localStorage.getItem('summary'));

  // //Como los del back son malos, tengo que arreglarme con la cantidad y agregarle al carrito
  // var amount = cartlocal?.map((e)=> e.amount)
  // if(cartByUserId){
  //   for (let i=0; i<cartByUserId.Products.length;i++) {
  //   var aux = amount[i]
  //   cartByUserId.Products[i]={...cartByUserId.Products[i],amount:aux}
  //   };
  // };

  // var stock = cartlocal?.map((e)=> e.stock)
  // if(cartByUserId){
  //   for (let i=0; i<cartByUserId.Products.length;i++) {
  //   var aux = stock[i]
  //   cartByUserId.Products[i]={...cartByUserId.Products[i],stock:aux}
  //   };
  // };

  
  // Me traigo mi carrito y tambien le paso lo que tengo en el localstorage
  // useEffect ( () => {
  //     dispatch(addToCart(cartlocal,userLogged.id));
  // },[]); 

  // useEffect( () => {
  //   dispatch(getCartByUserId(userLogged.id));
  // },[dispatch])

  //Esto es de otra persona, no me pregunten a mi
  const [butPayOpen, setButPayOpen] = useState(false);

  return (
    <div>
      <p>Cart</p>
      <div className="flex-row">
         <div>
        {cartlocal?.length > 0 ? (
        cartlocal.map((p) => {
          return (
            <div key={p.id}>
              <ProductCart 
                key={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                amount={p.amount}
                id={p.id}
                stock={p.stock}
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
