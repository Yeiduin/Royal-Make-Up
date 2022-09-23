import React, { useEffect} from "react";
import { addToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

export const DetailCard = ({
  image,
  name,
  rank,
  colors,
  price,
  description,
  id,
}) => {
console.log(name)
  const dispatch = useDispatch();

  useEffect ( () => {
    localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('summary', JSON.stringify(summary));
  })

  const handleClick = () => {
    dispatch(addToCart(id))
  };

  // ! agregar delay
  return (
    <div>
      <div className="flex flex-row justify-center space-x-20 pt-20">
        <div className="mb-12">
          <img
            src={image}
            alt="product"
            className="w-80 h-80 object-contain"
            onError={(e) => {
              e.target.src =
                "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
            }}
          />
        </div>
        <div className="items-start">
          <h3 className="uppercase text-2xl">{name}</h3>
          <div>
            <p className="divDetail_p">
              <span className="text-xs material-icons text-secondary">
                star
              </span>{" "}
              {rank} (0 reviews)
            </p>
            <p className="text-lg pb-6">
              <b>$ {price}</b>
            </p>
          </div>
          {colors && colors.length && (
            <select
              name="colors"
              id="colors"
              // onChange={handleInputChange}
            >
              <option selected="selected">Color</option>
              {colors?.map((p, index) => {
                if (index > 5) return "";
                return (
                  <option
                    key={index}
                    style={{ backgroundColor: `${p.hex_value}` }}
                    name={p.hex_value}
                  >
                    {p.colour_name}
                  </option>
                );
              })}
            </select>
          )}
          <div className="pt-10 items-start">
            <div>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <button onClick={ () => handleClick(id) }>ADD TO CART</button>
          </div>
        </div>
      </div>
      <p
        className="mx-auto max-w-2xl lg:max-w-screen-lg pt-40 pb-40"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
