import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryCard } from '../ListProducts/GalleryCard';
//f
export const SpecialOffers = ({ offers }) => {
  return (
    <div>
      {offers?.map((p) => {
        return (
          <div>
            <Link to={`/details/${p.id}`} key={p.id}>
              <GalleryCard
                name={p.name}
                price={p.price}
                image_link={p.image_link}
              />
            </Link>
          </div>
        );
      })}
    </div>
  )
}
