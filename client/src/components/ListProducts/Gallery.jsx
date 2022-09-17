import React from "react";
import { Link } from "react-router-dom";
import { useListProductsServices } from "../../hooks/useListProductsServices";
import { GalleryCard } from "./GalleryCard";

export const Gallery = () => {
  const {
    listProducts: { listPage },
  } = useListProductsServices();

  return (
    <div className="bg-white">
     
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {listPage?.map((p) => {
        return (
            <Link to={`/details/${p.id}`} key={p.id}>
              <GalleryCard
                name={p.name}
                price={p.price}
                image_link={p.api_featured_image}
                rating={p.rating}
                
              />
            </Link>
        );
      })}
      </div>
      </div>
    </div>
  );
};
