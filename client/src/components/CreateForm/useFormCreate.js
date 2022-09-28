import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions";
import { check } from "./inputvalidation";
import axios from "axios";


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const file= e.target.image.files[0];
    console.log(file);
    
    const data= new FormData();
    data.append('file', file);
    data.append('upload_preset', 'hcudvij0');
   
        
    var config = {
      method: "post",
      url: 'https://api.cloudinary.com/v1_1/dpkrrtsdg/Niveados/upload',
      data:data
    }; 
   
      const res = await axios(config)
    
    const imagen= await res.data.secure_url;
    console.log(imagen)

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
