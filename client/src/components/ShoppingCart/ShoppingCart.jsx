import React, { useState, useEffect } from "react";
import { ProductCart } from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutBut } from "../Paypal/CheckoutBut";
import { addToCart, getCartByUserId, clearCart } from "../../redux/actions";
import { Link } from "react-router-dom";


//HOLA VISITANTE, TE HAGO UN RECORRIDO POR MI CÓDIGO
export const ShoppingCart = () => {

  //Esto supongo que se entiende
  const dispatch = useDispatch();
  const { cartByUserId, cartlocal } = useSelector((state) => state);
  console.log(cartByUserId, 'SOY EL CARRITO DEL BACK')


  //Acá me traigo estos valores del localstorage
  let userLogged = JSON.parse(localStorage.getItem('userLogged'));
  let cartlocal2 = JSON.parse(localStorage.getItem('cartlocal'));

  // AGREGAR BOTON QUE VACÍE EL CARRITO 


  // Me traigo mi carrito y tambien le paso lo que tengo en el localstorage
  useEffect(() => {
    dispatch(addToCart(cartlocal2, userLogged?.id));
    dispatch(getCartByUserId(userLogged?.id));
  }, [dispatch])

  const handleEmpty = () => {
    dispatch(clearCart(userLogged?.id));
  }

  //Esto es de otra persona, no me pregunten a mi
  const [butPayOpen, setButPayOpen] = useState(false);

  return (
    <div>
      {userLogged ?
        <div className="text-center items-center">
          <div className="flex-row ">
            <div>
              {cartlocal?.Products?.length > 0 ? (
                cartlocal.Products.map((p) => {
                  console.log(p, 'aaaaaaa')
                  return (
                    <div key={p.id}>
                      <ProductCart
                        key={p.id}
                        image={p.image}
                        name={p.name}
                        price={p.price}
                        amount={p.product_cart.quantity}
                        id={p.id}
                        stock={p.stock}
                        cartID={cartByUserId?.id}
                      />
                    </div>
                  );
                })
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
            <div>
              <p className="rounded-xl focus:border-secondary focus:ring-secondary text-primary uppercase px-4 text-lg ">SUBTOTAL : {cartlocal ? cartlocal.totalPrice : cartByUserId?.totalPrice}</p>
              {/* DEBE REDIRIGIR */}
            </div>
          </div>

          <div>
            {butPayOpen ? (
              <CheckoutBut
                summary={cartlocal ? cartlocal.totalPrice : cartByUserId?.totalPrice}
                userID={cartByUserId?.id}
                cart={cartlocal?.Products} />
            ) : (
              <button
                // * Cambiar estilos a tailwind.
                style={{ backgroundColor: "#556353e6", padding: "5px 20px", margin: "10px 0", borderRadius: "5px", color: "white" }}
                type="button" onClick={() => setButPayOpen(true)}>
                Buy
              </button>
            )}
          </div>

          <button onClick={handleEmpty}>Empty Cart</button>

        </div> :
        <div>
          <p>You have to be logged in to see the cart</p>
          <Link to={'/Login'}>
            <button>
              Sign In
            </button>
          </Link>
        </div>}

    </div>

  );
};
