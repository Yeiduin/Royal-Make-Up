import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions";
import { check } from "./inputvalidation";
import axios from "axios";

export const UseFormCreate = (initialForm, validateForm) => {
  const dispatch = useDispatch();
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
  
  
  
}
  const handleBlur = (e) => {
    handleChange(e);
    const { name } = e.target;
    const { errors, validation } = validateForm(form, name);

    setErrors(errors);
    setValidationform(validation);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
 if(form.image===""||form.image==="Upload Image" ){const {errors}=validateForm(form,"image");setErrors(errors);} 
    let readyForm = check(validationform);
    console.log(form);
    console.log("vuelve a dar en enviar" + readyForm);
    if (readyForm) {
      dispatch(createProduct(form));
      setForm(initialForm);
      setErrors({ ...errors, enviado: "has creado un producto" });
    } else 
      handleBlur(e);
    }
    const uploadImage = () => {
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dpkrrtsdg",
          uploadPreset: "hcudvij0",
          maxFiles: 1,
          clientAllowedFormats: ["PNG","JPEG", "JPG", "JFIF","TIFF"],
          showCompletedButton:true
          

        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log(result.info.secure_url);
            setForm({ ...form, image: result.info.secure_url });
          }
        }
      ); console.log(myWidget);
      myWidget.open();
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
    uploadImage,
  };
}
