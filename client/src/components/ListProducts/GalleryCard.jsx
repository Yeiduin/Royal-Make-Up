import React from 'react';

export const GalleryCard = ({ name, price, image_link }) => {
  return (
    <div>
      <img src={image_link} alt='product' />
      <div>
        <h2>{name}</h2>
        <h5>${price}</h5>
      </div>
    </div>
  )
}
