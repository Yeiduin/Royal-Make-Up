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
      <img src={product.image} alt="imagen_producto" onError={(e) => {
          e.target.src="https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129"
        }} />
      <h3>{product.name}</h3>
      <p>{product.rating}</p>
      <p>{product.price}</p>
      {/* pinches colores*/}
      <AddCart/>
      <p>{product.description}</p>
    </div>
  )
}
