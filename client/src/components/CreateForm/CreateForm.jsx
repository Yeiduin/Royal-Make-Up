import React, { useState } from "react";
import { UseFormCreate } from "./useFormCreate";
import { categories, valid, valid2, brandInOrder } from "./inputvalidation";

const initialForm = {
  name: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  description: "",
  image: "",
  rating: 0,
};

const validationsForm = (form, target) => {
  let r = valid(form, target);
  return r;
};


export const CreateForm = () => {
  const {
    form,
    errors,
    validationForm,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
  } = UseFormCreate(initialForm, validationsForm);

  return (
    <div className="text-primary flex justify-center">
      <form id="45" className="w-1/2" onSubmit={handleSubmit}>
      <h2 className="mb-4 mt-4 text-2xl">Create Product</h2>
        <div className="flex flex-col">
          <label>Product name</label>
          <input
            className="rounded-xl focus:border-secondary focus:ring-secondary"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={form.name}
            onBlur={handleBlur}
            placeholder='lipstick...'
            required
          ></input>
          <div className="h-4">
            {errors.name && (
              <p className="py-1 text-xs text-red-400">{errors.name}</p>
              )}
          </div>
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <select
            className="rounded-xl focus:border-secondary focus:ring-secondary"
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.category}
            placeholder='Select product category'
            required
          >
            <option></option>
            {categories.map((e, o) => (
              <option key={o}>{e}</option>
            ))}
          </select>
        </div>
        <div className="h-4">
          {errors.category && (
            <p className="py-1 text-xs text-red-400">{errors.category}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Brand</label>
          <select
            className="rounded-xl focus:border-secondary focus:ring-secondary"
            type="text"
            name="brand"
            id="brand"
            onChange={handleChange}
            value={form.brand}
            onBlur={handleBlur}
            required
          >
            <option></option>
            {brandInOrder.map((e, o) => (
              <option key={o}>{e}</option>
            ))}
          </select>
          <div className="h-4">
            {errors.brand && (
              <p className="py-1 text-xs text-red-400">{errors.brand}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label>Price</label>
            <input
              className="rounded-xl focus:border-secondary focus:ring-secondary"
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={form.price}
              onBlur={handleBlur}
              placeholder='$0.0'
              required
            ></input>
            <div className="h-4">
              {errors.price && (
                <p className="py-1 text-xs text-red-400">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label>Stock</label>
            <input
              className="rounded-xl focus:border-secondary focus:ring-secondary"
              type="number"
              name="stock"
              id="stock"
              onChange={handleChange}
              value={form.stock}
              onBlur={handleBlur}
              placeholder='Stock available..'
              required
            ></input>
            <div className="h-4">
              {errors.stock && (
                <p className="py-1 text-xs text-red-400">{errors.stock}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            className="rounded-xl focus:border-secondary focus:ring-secondary"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={form.description}
            onBlur={handleBlur}
            placeholder='Here is the product description...'
            required
          ></textarea>
          <div className="h-4">
            {errors.description && (
              <p className="py-1 text-xs text-red-400">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label>Image</label>
          <input
            className="rounded-xl focus:border-secondary focus:ring-secondary"
            type="text"
            name="image"
            id="image"
            onChange={handleChange}
            value={form.image}
            onBlur={handleBlur}
            placeholder='Enter your image url..'
            required
          ></input>
          <div className="h-4">
            {errors.image && (
              <p className="py-1 text-xs text-red-400">{errors.image}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          value="Enviar"
          className=" py-2 px-8 bg-secondary rounded-xl mt-4 text-white w-full"
        >
          Enviar
        </button>
        <div className="h-4">
          {errors.enviado && (
            <p className="py-1 text-xs text-red-400">{errors.enviado}</p>
          )}
        </div>
      </form>
    </div>
  );
};
