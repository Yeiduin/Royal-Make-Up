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
          <div>
            <Link to={`/details/${p.id}`} key={p.id}>
              <GalleryCard
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
