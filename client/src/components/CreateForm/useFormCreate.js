import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions";
import { check } from "./inputvalidation";


export const UseFormCreate = (initialForm, validateForm) => {
  const dispatch=useDispatch()
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [validationform, setValidationform] = useState({
    name: false,
    price: false,
    category: false,
    brand: false,
    stock: false,
    description: false,
    image: false,
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleBlur = (e) => {
    handleChange(e);
    const { name } = e.target;
    const { errors, validation } = validateForm(form, name);

    setErrors(errors);
    setValidationform(validation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    let readyForm = check(validationform)
    console.log(form)
      console.log("readyForm" + readyForm)
    if(readyForm){
      
      dispatch(createProduct(form)); 
      setForm(initialForm);
      setErrors({...errors, enviado:"has creado un producto"}) 
    } else{
      handleBlur(e)
    }

    
  };

  return {
    form,
    errors,
    validationform,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};
