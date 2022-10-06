import axios from "axios";
import React from "react";
import { CardCart } from "./CardCart";

export const ListCart = ({ totalPrice, Products, address }) => {
  // const listCars=
  const sliceString = (string) => {
    if (string.length > 26) return string.slice(0, 26) + "...";
    else return string;
  };

  return (
    <>
      {Products &&
        Products.map((item) => (
          <CardCart
            key={item.id}
            id={item.id}
            quantity={item.product_cart.quantity}
          />
        ))}

      <div
        className="w-[36rem] flex justify-between text-primary rounded-lg py-3 my-1"
        style={{ backgroundColor: "#c1d0bd" }}
      >
        <div className="flex items-center">
          <span className="px-4 material-icons ">pin_drop</span>
          <span className="pl-1" title={address}>
            {sliceString(address)}
          </span>
          <span
            className="px-5 material-icons text-lg cursor-pointer"
            title={address}
            onClick={() => navigator.clipboard.writeText((address))}
          >
            content_copy
          </span>
        </div>
        <div className="flex items-center">
          <span className="px-4">TOTAL</span> <span>=</span>
          <span className="pl-6 mr-7">${totalPrice}</span>
        </div>
      </div>
    </>
  );
};
