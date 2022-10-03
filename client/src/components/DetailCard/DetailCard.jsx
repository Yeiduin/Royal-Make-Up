import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { addToCart, getCartByUserId } from '../../redux/actions';
import "./DetailCard.css";
import { StarIcon } from "@heroicons/react/20/solid";
import { HashLink } from "react-router-hash-link";

export const DetailCard = ({
  image,
  name,
  rank,
  colors,
  price,
  description,
  stock,
  id,
  category,
}) => {
  const [amount, setAmount] = useState(1);
  // const dispatch = useDispatch();

  // useEffect (() => {
  //   dispatch(getCartByUserId(userId))
  //   console.log('soyelcarrito',cartByUserId)
  // },[]); del global cartByUserId, userId

  const { cart, summary, productComments } = useSelector((state) => state);

  const handlePlus = () => {
    const aux = amount + 1;
    if (aux <= stock) {
      setAmount(aux);
    }
  };

  const handleLess = () => {
    const aux = amount - 1;
    if (aux > 0) {
      setAmount(aux);
    }
  };

  const handleAdd = () => {
    const cartNew = {
      amount: amount,
      id: id,
      name: name,
      price: price,
      stock: stock,
      image: image,
      category: category ? category : "",
    };
    localStorage.setItem("cart", JSON.stringify([...cart, cartNew]));
    localStorage.setItem(
      "summary",
      JSON.stringify(parseInt(summary) + amount * price)
    );
    // if( id && cartByUserId) {
    //  dispatch(addToCart(id,cartByUserId));
    // }
  };

  const [checkedColor, setCheckedColor] = useState(undefined);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="text-primary p-4">
      <div className="flex flex-col items-center pt-4 md:flex md:flex-row md:justify-center">
        <div className="w-80 h-auto">
          <img
            src={image}
            alt="product"
            className="object-scale-down rounded-xl"
            onError={(e) => {
              e.target.src =
                "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
            }}
          />
        </div>
        <div className="items-start pt-4">
          <h3 className="uppercase text-2xl font-">{name}</h3>
          <div className="pt-2">
            <p className="divDetail_p">
              {/* Reviews */}
              <div className="">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          rank > rating ? "text-secondary" : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{rank} out of 5 stars</p>
                  <HashLink
                    to="#comments"
                    className="ml-3 text-sm font-medium text-primary hover:text-secondary"
                  >
                    {productComments?.length === 1
                      ? `${productComments?.length} review`
                      : `${productComments?.length} reviews`}
                  </HashLink>
                </div>
              </div>
            </p>
            <p className="text-lg pt-2">
              <b>$ {price}</b>
            </p>
          </div>

          {colors?.length && (
            <div className="pt-2">
              <label>
                {checkedColor?.length
                  ? `You've picked: ${checkedColor}`
                  : "Pick a color"}
                <br />
                {colors?.map((p, index) => {
                  return (
                    <span key={index}>
                      <input
                        type="radio"
                        className="cursor-pointer w-5 h-5"
                        style={{ backgroundColor: `${p.hex_value}` }}
                        name="color"
                        value={p.colour_name}
                        onChange={(e) => setCheckedColor(e.target.value)}
                      />{" "}
                    </span>
                  );
                })}
              </label>
            </div>
          )}

          <div className="flex items-center pt-4 space-x-4">
            <div className="flex border-2 border-solid border-primary rounded-lg px-4">
              <button onClick={handleLess} className="px-2">
                -
              </button>
              <p className="dic_p">{amount}</p>
              <button onClick={handlePlus} className="px-2">
                +
              </button>
            </div>
            <button onClick={handleAdd} className="text-white bg-secondary p-4 rounded-xl">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <p
        className="py-6 text-justify"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
