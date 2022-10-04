import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/actions";
import { CreateForm } from '../CreateForm/CreateForm';



const FormEdit = () => {

const dispatch=useDispatch();
const {id}=useParams();
const {productDetail}=useSelector(state=>state);
console.log(productDetail);
const initialstate= {
    id:productDetail.id,
    name:productDetail.name,
    price:productDetail.price,
    discount:productDetail.discount||0,
    category:productDetail.category,
    brand:productDetail.brand,
    stock:productDetail.stock,
    description:productDetail.description,
    image:productDetail.image,
    rating:productDetail.rating}
    
    useEffect(() => {
   dispatch(getProductById(id));
   
}, [dispatch]);


    return (
        <div>
            <CreateForm titulo={"Edit Product"} initialForm={initialstate} type={"edit"} ></CreateForm>
        </div>
    );
}

export default FormEdit;
