import React, {useState} from "react";
import {useForm2} from "../../hooks/useForm2"
import { Footer } from "../Global/Footer/Footer";


const Form = () => {
const [input, setInput] = useState({name:"",
price:"",
category:"",
product_type:"",
brand:"",
stock:"",
description:"",
image:""
});

const {createProdu} = useForm2();


function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    
}

function handleSubmid(e) {
    e.preventDefault();
  createProdu(input);
    console.log(input)
}
  return (
    <div>
    <h2>Create Product</h2>
      <form onSubmit={handleSubmid}>
      <div>
          <label>Product name</label>
          <input type="text" name="name" id="name" value={input.name} onChange={handleChange} ></input>
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" id="price" onChange={handleChange}></input>
        </div>
        <div>
          <label>Category</label>
          <input type="text" name="category" id="category" onChange={handleChange}></input>
        </div>
        <div>
          <label>Product type</label>
          <input type="text" name="product_type" id="product_type" onChange={handleChange}></input>
        </div>
        <div>
          <label>Brand</label>
          <input type="text" name="brand" id="brand" onChange={handleChange}></input>
        </div>
        <div>
          <label>Stock</label>
          <input type="number" name="stock" id="stock" onChange={handleChange}></input>
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" id="description" onChange={handleChange}></input>
        </div>
        <div>
          <label>images</label>
          <input type="text" name="image" id="image" onChange={handleChange}></input>
        </div>  
        <button type='submit' value="Enviar">Enviar</button> 
      </form>
    </div>
  );
};

export default Form;
