import React, { useState } from "react";
import { useForm2 } from "../../hooks/useForm2";

const CreateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    product_type: "",
    brand: "",
    stock: "",
    description: "",
    image_link: "",
  });

  const { createProdu } = useForm2();

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmid(e) {
    e.preventDefault();
    createProdu(input);
    console.log(input);
  }
  return (
    // * No se veían los inputs ni el botón, así que te puse unos estilos temporales hasta q lo arregles...
    <div
      // $ Quitar estilos...
      style={{ backgroundColor: "#efe9e6" }}
    >
      {/* <h2>Create Product</h2> */}
      <form onSubmit={handleSubmid}>
        <div>
          <label>Product name</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Price</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Category</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Product type</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="product_type"
            id="product_type"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Brand</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="brand"
            id="brand"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Stock</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="number"
            name="stock"
            id="stock"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>images</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
            type="text"
            name="image_link"
            id="image_link"
            onChange={handleChange}
          ></input>
        </div>
        <button
          // $ Quitar estilos...
          style={{
            padding: "6px",
            margin: "10px",
            backgroundColor: "#FBA744",
            border: "1px solid black",
            borderRadius: "8px",
          }}
          type="submit"
          value="Enviar"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
