import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, editProduct } from "../../redux/actions";
import { check } from "./inputvalidation";
import axios from "axios";

export const UseFormCreate = (initialForm, validateForm, type) => {
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
  const [response, setResponse] = useState(type);

  const handleReset= (e)=>{document.getElementById("45").reset();

}

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

    if (form.image === "" || form.image === "Upload Image") {
      const { errors } = validateForm(form, "image");
      setErrors(errors);
    }
    let readyForm = check(validationform);
    console.log(form);
    console.log("vuelve a dar en enviar" + readyForm);
    if (readyForm) {
      if (response === "edit") {let edition={id:form.id, newProduct:form}
        dispatch(editProduct(edition));
        
        setErrors({
          ...errors,
          enviado: "product edition has been successful",
        });
      } else {dispatch(createProduct(form));
      setForm(initialForm);
      setErrors({ ...errors, enviado: "product creation has been successful" });}
    } else handleBlur(e);
  };

  const uploadImage = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpkrrtsdg",
        uploadPreset: "hcudvij0",
        maxFiles: 1,
        clientAllowedFormats: ["PNG", "JPEG", "JPG", "JFIF", "TIFF"],
        showCompletedButton: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info.secure_url);
          setForm({ ...form, image: result.info.secure_url });
        }
      }
    );
    console.log(myWidget);
    myWidget.open();
  };

  return {
    handleReset,
    setForm,
    setLoading,
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
};
