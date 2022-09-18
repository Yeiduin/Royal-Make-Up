import React from "react";
import { Link } from "react-router-dom";
import { useListProductsServices } from "../../hooks/useListProductsServices";
import { GalleryCard } from "./GalleryCard";

export const Gallery = () => {
  const {
    listProducts: { listPage },
  } = useListProductsServices();

  return (
    <div>
      {listPage?.map((p) => {
        return (
          <div key={p.id}>
            <Link to={`/details/${p.id}`} key={p.id}>
              <GalleryCard
              id= {p.id}
                name={p.name}
                price={p.price}
                image_link={p.image_link}
                rating={p.rating}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
