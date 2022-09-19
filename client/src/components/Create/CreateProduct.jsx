import React, { useState } from "react";
import { useForm2 } from "../../hooks/useForm2";
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
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            value={form.price}
            onBlur={handleBlur}
            required
          ></input>
          {errors.price && <p>{errors.price}</p>}
        </div>
        <div>
          <label>Category</label>
          <select
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.category}
            required
          >{categories.map((e,o)=>(<option key={o}>{e}</option>))}</select>
          {errors.category && <p>{errors.category}</p>}
        </div>
        <div>
          <label>Brand</label>
          <select
            type="text"
            name="brand"
            id="brand"
            onChange={handleChange}
            value={form.brand}
            onBlur={handleBlur}
            required
          >{brandInOrder.map((e,o)=>(<option key={o}>{e}</option>))}</select>
          {errors.brand && <p>{errors.brand}</p>}
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={form.stock}
            onBlur={handleBlur}
            required
          ></input>
          {errors.stock && <p>{errors.stock}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={form.description}
            onBlur={handleBlur}
            required
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>images</label>
          <input
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
      </form>
    </div>
  );
};

export default CreateProduct;
