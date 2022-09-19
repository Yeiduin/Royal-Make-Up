import React, { useState } from "react";
import { useForm2 } from "../../hooks/useForm2";
<<<<<<< HEAD
import { UseFormCreate } from "../../hooks/useFormCreate";
import { categories, valid, valid2, brandInOrder } from "./validations/inputvalidation";


const initialForm = {
  name: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  description: "",
  image: "",
};



const validationsForm = (form, target,) => {
  let r=valid(form, target)
  return r
};


const CreateProduct = () => {
  const {
    form,
    errors,
    validationForm,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
  } = UseFormCreate(initialForm, validationsForm,);

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} id="45">
        <div>
          <label>Product name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={form.name}
            onBlur={handleBlur}
            required
          ></input>
          {errors.name && <p>{errors.name}</p>}
=======

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
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
        </div>
        <div>
          <label>Price</label>
          <input
<<<<<<< HEAD
=======
            // $ Quitar estilos...
            style={{ margin: "10px" }}
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
<<<<<<< HEAD
            value={form.price}
            onBlur={handleBlur}
            required
          ></input>
          {errors.price && <p>{errors.price}</p>}
        </div>
        <div>
          <label>Category</label>
          <select
=======
          ></input>
        </div>
        <div>
          <label>Category</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
<<<<<<< HEAD
            onBlur={handleBlur}
            value={form.category}
            required
          >{categories.map((e,o)=>(<option key={o}>{e}</option>))}</select>
          {errors.category && <p>{errors.category}</p>}
        </div>
        <div>
          <label>Brand</label>
          <select
=======
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
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
            type="text"
            name="brand"
            id="brand"
            onChange={handleChange}
<<<<<<< HEAD
            value={form.brand}
            onBlur={handleBlur}
            required
          >{brandInOrder.map((e,o)=>(<option key={o}>{e}</option>))}</select>
          {errors.brand && <p>{errors.brand}</p>}
=======
          ></input>
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
        </div>
        <div>
          <label>Stock</label>
          <input
<<<<<<< HEAD
=======
            // $ Quitar estilos...
            style={{ margin: "10px" }}
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
            type="number"
            name="stock"
            id="stock"
            onChange={handleChange}
<<<<<<< HEAD
            value={form.stock}
            onBlur={handleBlur}
            required
          ></input>
          {errors.stock && <p>{errors.stock}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea
=======
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            // $ Quitar estilos...
            style={{ margin: "10px" }}
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
<<<<<<< HEAD
            value={form.description}
            onBlur={handleBlur}
            required
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
=======
          ></input>
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
        </div>
        <div>
          <label>images</label>
          <input
<<<<<<< HEAD
            type="text"
            name="image"
            id="image"
            onChange={handleChange}
            value={form.image}
            onBlur={handleBlur}
            required
          ></input>
          {errors.image && <p>{errors.image}</p>}
        </div>

        <button type="submit" value="Enviar">
          Enviar
        </button>
        {errors.enviado&&<p>{errors.enviado}</p>}
=======
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
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
      </form>
    </div>
  );
};

export default CreateProduct;
