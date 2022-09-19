import "./estilosDetail/CardDetails.css" ;
import React from "react";
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
  // console.log("color" + values.colors);

  return (
    <div className="divDetail" >
      <img src={product.image} alt="imagen_producto" className="imgDetail" />
      <h3 className="divDetail_h3">{product.name}</h3>
      <p className="divDetail_p">Rating: {product.rating}</p>
      <select name="colors" id="colors" onChange={handleInputChange} className="divDetail_select" >
        <option selected="selected" className="select_option">Color</option>
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
      <p className="divDetail_p"><b>$ {product.price}</b></p>

      <AddCart />
      <p className="divDetail_description" >{product.description}</p>
    </div>
  );
};
