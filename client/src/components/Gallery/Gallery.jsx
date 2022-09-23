import React from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

export const Gallery = ({ productsShown }) => {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {productsShown[0] === "notfound" ? (
          <p>There are no matches for your search</p>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsShown?.map((p, index) => (
              <Link to={`/detail/${p.id}`} key={index}>
                <ProductCard {... p}/>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};
