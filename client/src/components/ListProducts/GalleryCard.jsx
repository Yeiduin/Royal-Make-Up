import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  cardGallery,
  cardGalleryOff,
  cardGalleryImage,
  cardGalleryName,
  cardGalleryPrice,
} from "../../assets/css/list-products/listProducts.module.css";
import { useGlobalServices } from "../../hooks/useGlobalServices";

export const GalleryCard = ({ id, name, price, image_link, rating }) => {

  const imageRef = useRef(null);
  const [imageDelay, setImageDefault] = useState(false);
  const { savePosition } = useGlobalServices();
  
  name = name.length > 17 ? name.slice(0, 17) + "..." : name;
  
  useEffect(() => {
    // * Carga las img. si tienen padding > 0, sino retorna otra img por default.
    if (imageRef.current.clientHeight > 0) setImageDefault(true);
    else setImageDefault(false);
  });

  return (
    <Link to={`/details/${id}`} onClick={()=>{savePosition()}} className={cardGallery}>
      <div className={cardGalleryImage}>
        <button className={cardGalleryOff}>15% off</button>
        <img
          src={
            imageDelay
              ? image_link
              : "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129"
          }
          alt="product"
          style={{
            width: "200px",
            heigth: "auto",
          }}
          onError={(e) => {
            e.target.src =
              "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
          }}
          ref={imageRef}
        />
      </div>
      <p className={cardGalleryName}>{name}</p>
      <p className={cardGalleryPrice}>${price}</p>
    </Link>
  );
};
