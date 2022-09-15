import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryCard } from './GalleryCard';

export const Gallery = ({ products }) => {
  return (
    <div>
      {products?.map((p) => {
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
  );
};
