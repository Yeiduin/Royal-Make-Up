import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, getCartByUserId } from '../../redux/actions';
import './DetailCard.css';

export const DetailCard = ({ image, name, rank, colors, price, description, stock, id, category }) => {


  const [amount, setAmount] = useState(1);
  // const dispatch = useDispatch();

  // useEffect (() => {
  //   dispatch(getCartByUserId(userId))
  //   console.log('soyelcarrito',cartByUserId)
  // },[]); del global cartByUserId, userId

  const { cart, summary,  } = useSelector( (state) => state);

  const handlePlus = () => {
    const aux = amount+1;
    if (aux<=stock) {
      setAmount(aux);
    };
  };

  const handleLess = () => {
    const aux= amount-1;
    if (aux > 0) {
      setAmount(aux);
    };
  };

  const handleAdd = () => {
    const cartNew = {
      amount: amount,
      id: id,
      name:name,
      price: price,
      stock: stock,
      image: image,
      category: category?category:"",
    };
    localStorage.setItem('cart',JSON.stringify([...cart,cartNew]));
    localStorage.setItem('summary',JSON.stringify(parseInt(summary) + (amount*price)));
    // if( id && cartByUserId) {
    //  dispatch(addToCart(id,cartByUserId));
    // }
  };

  // ! agregar delay y disable add to cart cuando stock cero

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
          <div className="pt-10 items-start flex items-center">
            <div className="divAddCart_div">
            <button onClick={ handleLess } className='div_button1'>-</button>
            <p className='dic_p'>{amount}</p>
            <button onClick={ handlePlus } className='div_button2'>+</button>
          </div>
          <button onClick={ handleAdd } className='div_button'>ADD TO CART</button>
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
