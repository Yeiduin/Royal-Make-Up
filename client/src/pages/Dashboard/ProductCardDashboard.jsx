import React from "react";
import { Link } from "react-router-dom";
import {pencil} from "../../assets/svgs"
export const ProductCardDashboard = ({ name, price, image, rank, discount, stock, id }) => {
  const discounted = price - Math.round((price * discount) / 100);
  
return (
    <>
      <td>{name}</td>
      <td>$ {price}</td>
      <td>{discount} %</td>
      <td>$ {discounted}</td>
      <td>{stock}</td>
      <td><Link>{pencil}</Link></td>
    </>
  );
};