import React from "react";
import { ProductCart } from "./ProductCart";
import { useSelector } from 'react-redux';

export const ShoppingCart = () => {

    const cart = useSelector ( (state) => state.cart);
    
    return (
        <div>
            <p>Cart</p>
            { cart.length > 0 ? (
                cart?.map( p => {
                    return (
                        <div key= { p.id }>
                            <ProductCart
                                key= { p.id }
                                imgage= { p.image }
                                name= { p.name }
                                category= { p.category } 
                                price= { p.price }
                                handleDelete= { handleDelete } />
                        </div>
                    )
                })
            ) : <p>Your cart is empty</p> 
          }
          <p>SUBTOTAL</p>
          {/* DEBE CALCULARLO */}
          <p>precio</p>
          {/* DEBE REDIRIGIR */}
          <button>CheckOut</button>
        </div>
    )
}