import React from "react";
import { useNavigate } from "react-router-dom";


export const ProductCard = ({ name, price, image, rank, discount, stock, id }) => {
  const discounted = price - Math.round((price * discount) / 100);

  const navigate = useNavigate()

  // ! add discount  tag
  if (stock > 0)
    return (
      <div className="w-52">
        <div className="h-52">
          <img
            src={image}
            alt="product"
            onError={(e) => {
              e.target.src =
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-index-makeup-essentials-1645556621.jpg?crop=0.444xw:0.888xh;0.260xw,0.0673xh&resize=640:*";
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary cursor-pointer"
            onClick={() => navigate(`/detail/${id}`)}
          />
        </div>
        <h2 className="mt-4 text-sm text-primary uppercase">{name}</h2>
        <div className="flex flex-row justify-between items-center pt-2">
          {discount ? (
            <h5 className="text-sm text-secondary">
              <span className="line-through">${price}</span>
              <span className="font-bold text-base"> ${discounted}</span>
            </h5>
          ) : (
            <h5 className="text-secondary text-sm">${price}</h5>
          )}
          <h5 className="flex space-x-2">
            <span className="text-md material-icons text-secondary">star</span>{" "}
            <span className="text-md">{rank}</span>
          </h5>
        </div>
      </div>
    );
};
