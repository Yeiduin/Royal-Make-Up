import React from 'react';
import { Link } from 'react-router-dom';
import { NewArrivalsCard } from './NewArrivalsCard';
//d
export const NewArrivals = ({ newArrivals }) => {
  return (
    <div>
      {newArrivals?.map((p) => {
        return (
          <div>
            <Link to={`/details/${p.id}`} key={p.id}>
              <NewArrivalsCard
                name={p.name}
                price={p.price}
                image_link={p.api_featured_image}
                rating={p.rating}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
