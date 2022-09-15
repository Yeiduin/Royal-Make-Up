import React from 'react';

export const NewArrivalsCard = ({name, price, image_link, rating }) => {
  return (
    <div>
      <img src={image_link} alt='product' />
      <div>
        <h2>{name}</h2>
        <h6>{rating}</h6>
        <h5>${price}</h5>
      </div>
    </div> //
  );
};
