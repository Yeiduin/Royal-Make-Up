import React, { useState, useEffect } from "react";
import { ProductCart } from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";
import { addToCart, getCartByUserId, clearCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import { AlerBuy } from "./AlerBuy";

//HOLA VISITANTE, TE HAGO UN RECORRIDO POR MI CÓDIGO
export const ShoppingCart = () => {
  
  //Esto supongo que se entiende
  const dispatch = useDispatch();
  const { cartByUserId, cartlocal } = useSelector((state) => state);


  //Acá me traigo estos valores del localstorage
  let userLogged = JSON.parse(localStorage.getItem("userLogged"));
  let cart = JSON.parse(localStorage.getItem("cartlocal"));


  // Me traigo mi carrito y tambien le paso lo que tengo en el localstorage
  useEffect(() => {
    dispatch(addToCart(cart, userLogged?.id))
    .then(() => {
      dispatch(getCartByUserId(userLogged?.id));
    });
  }, [dispatch]);

  const handleEmpty = () => {
    dispatch(clearCart(userLogged?.id))
    .then(() => {
      localStorage.setItem("cartlocal", JSON.stringify([]));
    });
  };

  //Esto es de otra persona, no me pregunten a mi
  const [payOpen, setPayOpen] = useState(false);
  
const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  cartByUserId && setTotalPrice(cartByUserId.totalPrice);
}, [cartByUserId])


  return (
    <div className="relative">
      {payOpen ? <AlerBuy /> : <></>}
      {userLogged ? (
        <div className="text-center items-center">
          <div className="flex-row ">
            <div>
              {cartlocal?.length > 0 ? (
                <div>
                  <div>
                    {cartlocal.map((p) => {
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
                            cartID={cartByUserId?.id}
                            discount={p.discount}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-left pl-8">
                    <button
                  // className="py-10 text-left text-[#556353]"
                  style={{
                    backgroundColor: "#97a096",
                    padding: "5px 20px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  onClick={handleEmpty}>Empty Cart</button>
                  </div>
                  <div>
                    <p className="rounded-xl focus:border-secondary focus:ring-secondary text-primary uppercase px-4 text-lg ">
                      SUBTOTAL : {totalPrice}
                    </p>
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: "#556353e6",
                        padding: "5px 20px",
                        margin: "10px 0",
                        borderRadius: "5px",
                        color: "white",
                      }}
                      type="button"
                      onClick={() => setPayOpen(true)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ) : (
                <p className="py-12 text-center text-[#556353]" >Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p
          className="py-16 text-center text-[#556353]" >
            You have to be logged in to see the cart</p>
          <Link to={"/Login"}>
            <button
            style={{
              backgroundColor: "#556353e6",
              padding: "5px 20px",
              margin: "10px 0",
              borderRadius: "5px",
              color: "white",
            }}
            >Sign In</button>
          </Link>
        </div>
      )}
    </div>
  );
};
