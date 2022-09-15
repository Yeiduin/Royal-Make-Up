import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryCard } from '../ListProducts/GalleryCard';

export const BestSellers = ({ bestSellers }) => {
  return (
    <div>
      {bestSellers?.map((p) => {
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
