import React, { useState } from "react";
import { AddCart } from "./AddCart";
import { useDetailService } from "../../hooks/useDetailService";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export const CardDetails = () => {
  const {
    getProductById,
    details: { product },
  } = useDetailService();

  useEffect(() => {
    getProductById();
  }, []);

  const [values, handleInputChange, reset] = useForm({ colors: "#FFFFFF" });
  console.log("color" + values.colors);

  return (
    <div>
      <img src={product.image} alt="imagen_producto" />
      <h3>{product.name}</h3>
      <p>{product.rating}</p>
      <p>{product.price}</p>

      <select name="colors" id="colors" onChange={handleInputChange}>
        <option selected="selected">Color</option>
        {product.colors.length
          ? product.colors.map((p, index) => {
              if (index > 5) return "";

              return (
                <option
                  key={index}
                  style={{ backgroundColor: `${p.hex_value}` }}
                >
                  {p.colour_name}
                </option>
              );
            })
          : ""}
      </select>

      <AddCart />
      <p>{product.description}</p>
    </div>
  );
};
