import React, { useState } from "react";

export const expresiones = {
  name: /^[a-zA-Záãäéëêíîóöúüñç0-9ñÑ)(%+_.-]{3,60}$/,  // Letras, numeros, guion y guion_bajo
  numeros: /^[0-9]{1,20}$/,
  todo: /^[a-zA-Záãäéëêíîóöúüñç0-9ñÑ)(%+@# !$^=&*_.,:"'/|;`~-]{2,1500}$/,
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
  image: false,};

  
export function valid(form, target) {
  
  let required = "This field is required";
  let numinvalid =
    "You must enter a numerical value that does not exceed 20 digits";
  let nameinvalid =
    "Minimum 3 and maximum 60 characters";
  let descriptioninvalid = "Minimum 6 and maximum 3000 characters";
  let linkInvalid = "Invalid link"

  if (!form.name.trim() && target === "name") {
    errors.name = required; 
  } else {
    if (!expresiones.name.test(form.name) && form.name) {
      errors.name = nameinvalid;
    } else {errors.name = "";}
  }
  if (!form.price.trim() && target === "price") {
    errors.price = required;
  } else {
    if (!expresiones.numeros.test(form.price.trim()) && form.price.trim()) {
      errors.price = numinvalid;
    } else errors.price = "";
  }
   if (!form.category.trim() && target === "category") {
     errors.category = required;
   }  else errors.category = "";
   
  if (!form.brand.trim() && target === "brand") {
    errors.brand = required;
  } else {
      errors.brand = "";
  }
  if (!form.stock.trim() && target === "stock") {
    errors.stock = required;
  } else {
    if (!expresiones.numeros.test(form.stock.trim()) && form.stock.trim()) {
      errors.stock = numinvalid;
    } else errors.stock = "";
  }
  if (!form.description.trim() && target === "description") {
    errors.description = required;
  } else {
    if (
      !expresiones.todo.test(form.description.trim()) &&
      form.description.trim()
    ) {
      errors.description = descriptioninvalid;
    } else errors.description = "";
  }
  if (!form.image && target === "image") {
    errors.image = "you must upload an image of the product";
  }  else errors.image = "";
   valid2(form)
  return {errors, validation} ;
}

export function valid2(form) { 
  if (!form.name.trim()) {
  validation.name = false; 
} else {
  if (!expresiones.name.test(form.name.trim()) && form.name.trim()) {
    validation.name = false; 
  } else {validation.name = true;}
}
if (!form.price.trim()) {
  validation.price = false; 
} else {
  if (!expresiones.numeros.test(form.price.trim()) && form.price.trim()) {
    validation.price = false; 
  } else {validation.price = true;}
}

 if (!form.category.trim()) {
  validation.category = false; 
 }  else {validation.category = true;}


if (!form.brand.trim()) {
  validation.brand = false; 
}  else {validation.brand = true;}

if (!form.stock.trim()) {
  validation.stock = false; 
} else {
  if (!expresiones.numeros.test(form.stock.trim()) && form.stock.trim()) {
    validation.stock = false; 
  } else {validation.stock = true;}
}
if (!form.description.trim()) {
  validation.description = false; 
} else {
  if (!expresiones.todo.test(form.description.trim()) && form.description.trim()) {
    validation.description = false; 
  } else {validation.description = true;}
}
if (!form.image.trim()) {
  validation.image = false; 
}  else {validation.image = true;}


return validation}


export const categoriess=[
  "pencil",
  "lipstick",
  "liquid",
  "powder",
  "lip_gloss",
  "gel",
  "cream",
  "palette",
  "concealer",
  "highlighter",
  "bb_cc",
  "contour",
  "lip_stain",
  "mineral"
];

export const brandd=["colourpop",
"boosh",
"deciem",
"zorah biocosmetiques",
"w3llpeople",
"sally b's skin yummies",
"rejuva minerals",
"penny lane organics",
"nudus",
"marienatie",
"maia's mineral galaxy",
"lotus cosmetics usa",
"green people",
"coastal classic creation",
"c'est moi",
"alva",
"glossier",
"nyx",
"fenty",
"clinique",
"dior",
"iman",
"benefit",
"smashbox",
"marcelle",
"stila",
"mineral fusion",
"annabelle",
"dr. hauschka",
"physicians formula",
"cargo cosmetics",
"covergirl",
"e.l.f.",
"maybelline",
"almay",
"milani",
"pure anada",
"l'oreal",
"sante",
"revlon",
"anna sui",
"wet n wild",
"pacifica",
"mistura",
"zorah",
"suncoat",
"moov",
"misa",
"salon perfect",
"orly",
"china glaze",
"essie",
"butter london",
"sinful colours",
"piggy paint",
"dalish",
"burt's bees"];


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
  
export const categories=alfabetoc(categoriess)
export const brandInOrder=alfabetoc(brandd)