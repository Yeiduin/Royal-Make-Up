import React, { useState } from "react";
import { check } from "../components/Create/validations/inputvalidation";
import { useForm2 } from "./useForm2";

export const UseFormCreate = (initialForm, validateForm) => {
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
  const { createProdu } = useForm2();

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
    
    
    let readyForm=check(validationform)
    if(readyForm){createProdu(form); setForm(initialForm);setErrors({...errors, enviado:"has creado un producto"}) } else{handleBlur(e)}

    
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
