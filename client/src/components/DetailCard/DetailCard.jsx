import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLocalCart } from "../../redux/actions";
import { StarIcon } from '@heroicons/react/20/solid';
import { HashLink } from 'react-router-hash-link';
import { addFavorite, deleteFavorite } from "../../redux/actions";
import { Label } from "../Admin/UserListTools/Label"


// Bienvenidos al Detalle!
export const DetailCard = ({ image, name, rank, colors, price, description, stock, id, discount, totalPrice }) => {

  // Por acá nada raro todavia
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  var { cartlocal, productComments, favorites } = useSelector((state) => state);

  // Para agregar uno más
  const handlePlus = () => {
    const aux = amount + 1;
    if (aux <= stock) {
      setAmount(aux);
    }
  };

  //Acá sacamos uno
  const handleLess = () => {
    const aux = amount - 1;
    if (aux > 0) {
      setAmount(aux);
    }
  };

  // Lo agrego al carrito LOCAL (el carrito y el total)
  const handleAdd = () => {
    const cartNew = {
      amount: amount,
      id: id,
      name: name,
      price: price,
      stock: stock,
      image: image,
      discount: discount,
    };

    // Me aseguro que no pueda repetir el producto
    let existe = JSON.parse(localStorage.getItem('cartlocal'))?.filter((p) => p.id === cartNew.id);
    if (existe?.length > 0) {
      return (
        <p>YA LO AGREGASTE MI HIJO</p>
      )
    } else if (cartlocal) {
      localStorage.setItem('cartlocal', JSON.stringify([...cartlocal, cartNew]));
      dispatch(addLocalCart(cartNew));
    };
  };

  //Algo del color que no hice yo
  const [checkedColor, setCheckedColor] = useState(undefined);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  const setFavorites = (option) => {
    option === "add" && dispatch(addFavorite(id));
    option === "erase" && dispatch(deleteFavorite(id));
  };

  return (
    <div className="text-primary p-4 md:flex md:flex-col md:items-center">
      <div className="flex flex-col items-center pt-4 md:flex md:flex-row md:justify-center">
        <div className="w-60 h-72 p-4">
          <img
            src={image}
            alt="product"
            className="object-scale-down object-center w-60 h-60"
            onError={(e) => {
              e.target.src =
                "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
            }}
          />
        </div>
        <div className="items-start">
          <h3 className="uppercase text-2xl text-[#556353]">{name}</h3>
          <div>
            <div className="divDetail_p">

              {/* Reviews */}
              <div className="mt-4 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          rank > rating ? 'text-secondary' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{rank} out of 5 stars</p>
                  <HashLink to="#comments" className="ml-3 text-sm font-medium text-primary hover:text-secondary">{productComments?.length === 1 ? `${productComments?.length} review` : `${productComments?.length} reviews`}</HashLink>
                </div>
              </div>
            </div>
            <p className="text-lg pb-6">
            {discount ? (
            <span>
              <span className="line-through">${parseFloat(price.toFixed(2))}</span>
              <span className="font-bold text-xl"> ${parseFloat(totalPrice.toFixed(2))}
                <Label
                  variant="filled"
                  sx={{
                    verticalAlign: "middle",
                    textTransform: 'uppercase',
                    bgcolor: '#FBA744'
                     }}
                  >
                  {discount} % off
                </Label>
              </span>
            </span>
          ) : (
            <span className="">${price} </span>
          )}
          
            </p>
          </div>

          {colors?.length && <div>
            <label>{checkedColor?.length ? `You've picked: ${checkedColor}` : "Pick a color"}<br />
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
          }

          <div className="pt-10 flex items-center">
            <div className="flex text-primary px-3">
              <div className=" flex items-center text-center rounded-2xl border-2 border-[#556353]">
                <button onClick={handleLess} className='p-2'><b>-</b></button>
                <p className="p-5">{amount}</p>
                <button onClick={handlePlus} className='p-2'><b>+</b></button>
              </div>
            </div>

            <div className="flex items-center rounded-lg text-white text-3xl bg-secondary">
              <button onClick={ handleAdd } className='p-3 border-r-2 border-white'>ADD TO CART</button>
              {favorites && favorites.includes(id) ? (
                <button
                  className={`material-icons w-16 text-3xl px-4 text-white`}
                  onClick={() => setFavorites("erase")}
                >
                  heart_broken_outlined
                </button>
              ) : (

                <button
                  className={`material-icons w-16 text-3xl px-4 text-white`}
                  onClick={() => setFavorites("add")}
                >
                  favorite_border
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <p
        className="py-6 text-justify md:w-4/5"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
