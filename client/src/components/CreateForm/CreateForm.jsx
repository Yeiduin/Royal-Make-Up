import React, { useState } from "react";
// import { useForm2 } from "../../hooks/useForm2";
// import { UseFormCreate } from "../../hooks/useFormCreate";
import {
  categories,
  valid,
  valid2,
  brandInOrder,
} from "./inputvalidation";

const initialForm = {
  name: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  description: "",
  image: "",
  rating: 0
};

const validationsForm = (form, target) => {
  let r = valid(form, target);
  return r;
};

const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [validationform, setValidationform] = useState({
    name: false,
    price: false,
    category: false,
    brand: false,
    stock: false,
    description: false,
    api_featured_image: false,
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
//   const { createProdu } = useForm2();


const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleBlur = (e) => {
    handleChange(e);
    const { name } = e.target;
    // const { errors, validation } = validateForm(form, name);

    setErrors(errors);
    setValidationform(validation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    let readyForm = check(validationform)
    console.log(form)
      console.log("readyForm" + readyForm)
    if(readyForm){
      
      createProdu(form); 
      setForm(initialForm);
      setErrors({...errors, enviado:"has creado un producto"}) 
    } else{
      handleBlur(e)
    }

    
  };

export const CreateForm = () => {
//   const {
//     form,
//     errors,
//     validationForm,
//     loading,
//     response,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//   } = UseFormCreate(initialForm, validationsForm);

  return (
    <div>
      <h2 className="text-center mb-4 mt-4">Create Product</h2>
      onSubmit={handleSubmit}
      <form
        id="45"
        className="flex flex-col justify-center items-center"
      >
        <label>Product name</label>
        <input
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={form.name}
          onBlur={handleBlur}
          required
        ></input>
        <div className="h-4">
          {errors.name && <p className='py-1 text-xs text-red-400'>{errors.name}</p>}
        </div>
        <label>Price</label>
        <input
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="number"
          name="price"
          id="price"
          onChange={handleChange}
          value={form.price}
          onBlur={handleBlur}
          required
        ></input>
        <div className="h-4">
          {errors.price && <p className='py-1 text-xs text-red-400'>{errors.price}</p>}
        </div>
        <label>Category</label>
        <select
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="text"
          name="category"
          id="category"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.category}
          required
        >
          <option></option>
          {categories.map((e, o) => (
            <option key={o}>{e}</option>
          ))}
        </select>
        <div className="h-4">
          {errors.category && <p className='py-1 text-xs text-red-400'>{errors.category}</p>}
        </div>
        <label>Brand</label>
        <select
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
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
          {errors.brand && <p className='py-1 text-xs text-red-400'>{errors.brand}</p>}
        </div>
        <label>Stock</label>
        <input
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="number"
          name="stock"
          id="stock"
          onChange={handleChange}
          value={form.stock}
          onBlur={handleBlur}
          required
        ></input>
        <div className="h-4">
          {errors.stock && <p className='py-1 text-xs text-red-400'>{errors.stock}</p>}
        </div>
        <label>Description</label>
        <textarea
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={form.description}
          onBlur={handleBlur}
          required
        ></textarea>
        <div className="h-4">
          {errors.description && <p className='py-1 text-xs text-red-400'>{errors.description}</p>}
        </div>
        <label>Image</label>
        <input
          className="rounded-xl focus:border-secondary focus:ring-secondary w-1/2"
          type="text"
          name="api_featured_image"
          id="image"
          onChange={handleChange}
          value={form.image}
          onBlur={handleBlur}
          required
        ></input>
        <div className="h-4">
          {errors.image && <p className='py-1 text-xs text-red-400'>{errors.image}</p>}
        </div>
        <button type="submit" value="Enviar" className="py-2 px-8 bg-secondary rounded-xl mt-4">
          Enviar
        </button>
        <div className="h-4">
          {errors.enviado && <p className='py-1 text-xs text-red-400'>{errors.enviado}</p>}
        </div>
      </form>
    </div>
  );
};
