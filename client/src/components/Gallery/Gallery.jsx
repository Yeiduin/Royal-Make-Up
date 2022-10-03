import React from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../redux/actions";


export const Gallery = ({ productsShown }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getProductByName(""));
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl lg:px-6">
        {productsShown[0] === "notfound" ? (
          <p className="text-center">
            Sorry! No matches found, please try another combination       
          </p>
          
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsShown?.map((p, index) => (
              <div
                key={index}
                onClick={() => handleClick()}
                className="cursor-pointer"
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
