import React from "react";

export const NewArrivalsCard = ({
  name,
  price,
  image,
  rank,
  description,
  discount,
  stock,
}) => {
  const discounted = price - Math.round((price * discount) / 100);
  if (typeof rank === "object") rank = 0;

  if(stock > 0) return (
    <div>
      <div className="bg-tertiary shadow-md w-80 h-52 rounded-2xl flex justify-center items-center space-x-1 hover:shadow-md lg:w-96">
        <div className="w-52 h-40 px-4 rounded-2xl flex justify-center items-center object-center">
          <img
            src={image}
            alt="product"
            onError={(e) => {
              e.target.src =
                "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
            }}
            className="h-full w-full rounded-2xl object-scale-down object-center"
          />
        </div>
        <div className="h-52 w-60 px-4 flex flex-col justify-center">
          <div className="flex flex-col items-start">
            <p className="self-start font-semibold text-s text-primary uppercase overflow-hidden overflow-ellipsis">
              {name}
            </p>
            <div className="overflow-hidden ">
              <p
                className="self-start pt-3 text-xs text-primary h-24 leading-5 w-41 text-ellipsis break-words"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className="flex w-full pt-1 pb-1 justify-between">
              <div>
                {discount ? (
                  <h5 className="text-secondary space-x-2">
                    <span className="line-through">${price}</span>
                    <span className="font-bold text-base"> ${discounted}</span>
                  </h5>
                ) : (
                  <h5 className="text-secondary">${price}</h5>
                )}
              </div>
              <div className="flex space-x-2">
                <span className="text-md material-icons text-secondary">
                  star
                </span>{" "}
                <span>{rank}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
