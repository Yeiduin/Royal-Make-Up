import React from "react";
import { AddCart } from "./AddCart";
import { useDetailService } from "../../hooks/useDetailService";
import { useEffect } from "react";
import { YouMayAlsoLike } from "./YouMayAlsoLike";
export const CardDetails = () => {



  const {
    getProductById,
    details: { product },
    getProductType, idParams
  } = useDetailService();

  useEffect(() => {
    getProductById();
  }, [idParams]);

  useEffect(() => {
    product.product_type && getProductType();
  }, [product]);
  return (
    <div>
      <img src={product.image} alt="imagen_producto" />
      <h3>{product.name}</h3>
      <p>{product.rating}</p>
      <p>{product.price}</p>
      {/* pinches colores*/}
      <AddCart />
      <p>{product.description}</p>

      <h1> You May Also Like</h1>
      <YouMayAlsoLike type={product.product_type} />
    </div>
  );
};
