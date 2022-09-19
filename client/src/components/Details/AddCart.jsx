import React from 'react';
import './estilosDetail/AddCart.css';

export const AddCart = () => {

  return (
    <div className='divAddCart'>
      <div className='divAddCart_div'>
        <button className='div_button1'>-</button>
        <p className='dic_p'>1</p>
        <button className='div_button2'>+</button>
      </div>
      
      <button className='divAddCart_button'>ADD TO CART</button>
    </div>
  )
}
