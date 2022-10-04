import React, { useState } from "react";

export const expresiones = {
  name: /^[a-zA-Záãäéëêíîóöúüñç0-9ñÑ)(%+ _.-]{3,60}$/,  // Letras, numeros, guion y guion_bajo
  numeros: /^[0-9.]{1,20}$/,
  todo: /.{4,1500}$/,
  isLink: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,

  nombre: /^[a-zA-ZÀ-ÿ\s]{0,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

var errors = {};
let validation={name: false,
  price: false,
  brand: false,
  category:false,
  stock: false,
  description: false,
  image: false,
discount:false};
  

  
export function valid(form, target) {
  
  let required = "This field is required";
  let numinvalid =
    "This value cannot be less than 0 and a maximum of 20 digits";
  let nameinvalid =
    "Minimum 3 and maximum 60 characters";
  let descriptioninvalid = "Minimum 4 and maximum 3000 characters";
  let linkInvalid = "Invalid link"

  if (!form.name && target === "name") {
    errors.name = required; 
  } else {
    if (!expresiones.name.test(form.name) && form.name) {
      errors.name = nameinvalid;
    } else {errors.name = "";}
  }
  if (!form.price && target === "price") {
    errors.price = required;
  } else {
    if (!expresiones.numeros.test(form.price) && form.price) {
      errors.price = numinvalid;
    } else errors.price = "";
  }
  if ((!form.discount&&form.discount!==0) && target === "discount") {
    errors.discount = required;
  } else {
    if (!expresiones.numeros.test(form.discount) && (form.discount||form.discount===0)) {
      errors.discount = numinvalid;
    } else errors.discount = "";
  }
   if (!form.category && target === "category") {
     errors.category = required;
   }  else errors.category = "";
   
  if (!form.brand && target === "brand") {
    errors.brand = required;
  } else {
      errors.brand = "";
  }
  if (!form.stock && target === "stock") {
    errors.stock = required;
  } else {
    if (!expresiones.numeros.test(form.stock) && form.stock) {
      errors.stock = numinvalid;
    } else errors.stock = "";
  }
  if (!form.description && target === "description") {
    errors.description = required;
  } else {
    if (
      !expresiones.todo.test(form.description) &&
      form.description
    ) {
      errors.description = descriptioninvalid;
    } else errors.description = "";
  }
  if (form.image!=="Upload Image" && form.image!=="") {
    errors.image = "successful upload";
  }  
   valid2(form)
  return {errors, validation} ;
}
export function valid3(form){if (form.image==="Upload Image" || form.image==="" ) {
  errors.image = "you must upload an image of the product";
}  else errors.image = "successful upload"; return {errors, validation}}

export function valid2(form) { 
  if (!form.name) {
  validation.name = false; 
} else {
  if (!expresiones.name.test(form.name) && form.name) {
    validation.name = false; 
  } else {validation.name = true;}
}
if (!form.price) {
  validation.price = false; 
} else {
  if (!expresiones.numeros.test(form.price) && form.price) {
    validation.price = false; 
  } else {validation.price = true;}
}
if (!form.discount&&form.discount!==0) {
  validation.discount = false; 
} else {
  if (!expresiones.numeros.test(form.discount) && form.discount) {
    validation.discount = false; 
  } else {validation.discount = true;}
}

 if (!form.category) {
  validation.category = false; 
 }  else {validation.category = true;}


if (!form.brand) {
  validation.brand = false; 
}  else {validation.brand = true;}

if (!form.stock) {
  validation.stock = false; 
} else {
  if (!expresiones.numeros.test(form.stock) && form.stock) {
    validation.stock = false; 
  } else {validation.stock = true;}
}
if (!form.description) {
  validation.description = false; 
} else {
  if (!expresiones.todo.test(form.description) && form.description) {
    validation.description = false; 
  } else {validation.description = true;}
}
if (!form.image||form.image==="Upload Image") {
  validation.image = false; 
}  else {validation.image = true;}


return validation}


export const categoriess=(products)=>{
  const resul2=[];
 const resul=products.filter(p=>resul2.push(p.category));
 const resul3 = new Set(resul2);
 let resul4 = [...resul3];
return resul4}

export const brandd=(products)=>{
  const resul2=[];
  const resul=products.filter(p=>resul2.push(p.brand));
  const resul3 = new Set(resul2);
  let resul4 = [...resul3];
 return resul4}


export function alfabetoc(pais) {
  
    const ascen = pais.sort(function (a, b) {
      if (a === b) {
        return 0;
      }
      if (a < b) {
        return -1;
      }
      return 1;
    });

    return ascen;
  }
export function check(params) {
  let aver =Object.values(params).find(e=> e===false)
  if (aver===false){return false}else return true
  
}
  
export const categories=['blush', 'bronzer', 'cream', 'eyebrow', 'eyeliner', 'eyeshadow', 'foundation', 'lipliner', 'lipstick', 'mascara', 'palette']

export const brandInOrder=["c'est moi", 'coastal classic creation', 'covergirl', 'dior', 'fenty', 'green people', "l'oreal", 'lotus cosmetics usa', 'maybelline', 'nudus', 'nyx', 'penny lane organics', 'zorah']