import React from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const Gallery = ({ productsShown }) => {
 
  return (
    <div className="my-10">
      {/* className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl lg:px-6" */}
      <div className="flex justify-center">
        {productsShown[0] === "notfound" ? (
          <p className="text-center">
            Sorry! No matches found, please try another combination       
          </p>
          
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:gap-28 lg:grid-cols-3 xl:grid-cols-4 xl:gap-28">
            {productsShown?.map((p, index) => (
              <span key={index}>
              <ProductCard {...p} />
              </span>
                
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
