import React from 'react';
import { Link } from 'react-router-dom';
import { NewArrivalsCard } from './NewArrivalsCard';

export const NewArrivals = ({ newArrivals }) => {
  return (
    <div className='flex flex-wrap pt-4'>
      <div className="flex justify-center items-center">
      <div className='grid grid-cols-1 gap-y-10 gap-x-24 sm:grid-cols-2 lg:grid-cols-3'>
      {newArrivals?.map((p) => {
        return (
          <div className="flex flex-col items-start">
            <Link to={`/details/${p.id}`} key={p.id}>
              <NewArrivalsCard
                name={p.name}
                price={p.price}
                image_link={p.api_featured_image}
                rating={p.rating}
                description={p.description}
                discount={p.discount}
              />
            </Link>
            </div>
        );
      })}
    </div>
    </div>
    </div>
  );
};
