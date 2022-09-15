import React from 'react';
import { AddCart } from './AddCart';
import { useDetailService } from '../../hooks/useDetailService';
import { useEffect } from 'react';

export const CardDetails = () => {

const { getProductById, details: {product} } = useDetailService();

useEffect( () => {
  getProductById();
},[]);

  return (
    <div>
      <img src={product.image} alt="imagen_producto" />
      <h3>{product.name}</h3>
      <p>{product.rating}</p>
      <p>{product.price}</p>
      {/* pinches colores del ojete */}
      <AddCart/>
      <p>{product.description}</p>
    </div>
  )
}
