import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite, addLocalCart } from "../../redux/actions";
import { useNav } from "../../hooks/useNav";
import { Label } from "../Admin/UserListTools/Label"
import { toast } from 'react-toastify';

export const NewArrivalsCard = ({
  id,
  name,
  price,
  image,
  stock,
  rank,
  description,
  discount,
  totalPrice
}) => {

  const dispatch = useDispatch();
  const { favorites, cartlocal } = useSelector((state) => state);

  const [activeFavAndCart, setActiveFavAndCart] = useState(false);
  const [activeLink, setActiveLink] = useState(true);
  const { redirectDetails } = useNav();

  const setFavorites = (option) => {
    if(option === "add"){
      dispatch(addFavorite(id))
      notifyFavAdd()
    }
    if(option === "erase"){
      dispatch(deleteFavorite(id));
      notifyFavErase();
    }
  };

  const goDetails = () => {
    activeLink && redirectDetails(id);
  };

  if (typeof rank === "object") rank = 0;

  useEffect(() => {
    if (favorites.includes(id)) console.log("sdsd");
  });

  // Lo agrego al carrito LOCAL
  const handleAdd = () => {
    notifyCartAdd()
    const cartNew = {
      amount: 1,
      id: id,
      name: name,
      stock: stock,
      price: price,
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

  //Toasty
  const notifyFavAdd = () => {
    toast('🧡 Added to Favorites',{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const notifyFavErase = () => {
    toast('💔 Remove from Favorites',{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const notifyCartAdd = () => {
    toast('👜 Added to Cart',{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

    return (
      <div
        onMouseOver={() => setActiveFavAndCart(true)}
        onMouseLeave={() => setActiveFavAndCart(false)}
        onClick={goDetails}
      >
        <div className="bg-tertiary shadow-md w-80 h-52 rounded-2xl flex justify-center items-center space-x-1 hover:shadow-md lg:w-96">
          <div className="w-52 h-40 px-4 rounded-2xl flex justify-center items-center object-center relative">
          {discount ? (
          <Label
            variant="filled"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
              bgcolor: '#FBA744'
            }}
          >
            {discount} % off
          </Label>
        ) : ""} 
            <img
              src={image}
              alt="product"
              onError={(e) => {
                e.target.src =
                  "https://cdn.shopify.com/s/files/1/0346/1319/8893/collections/elate1.jpg?v=1590520129";
              }}
              className="h-full w-full rounded-2xl object-scale-down object-center"
            />
            <div className="w-full justify-center absolute flex bottom-4">
              <div
                className={`w-28 py-1 flex justify-around bg-secondary rounded-3xl opacity-0 ${
                  activeFavAndCart && "opacity-95"
                }`}
                onMouseOver={() => setActiveLink(false)}
                onMouseLeave={() => setActiveLink(true)}

              >
                {favorites && favorites.includes(id) ? (
                  <button
                    className={`material-icons w-9 text-3xl text-white px-1`}
                    onClick={() => setFavorites("erase")}
                  >
                    heart_broken_outlined
                  </button>
                ) : (
                  <button
                    className={`material-icons w-9 text-3xl text-white px-1`}
                    onClick={() => setFavorites("add")}
                  >
                    favorite_border
                  </button>
                )}
                <button className="material-icons w-9 text-3xl text-white "
                onClick={ handleAdd }>
                  add_shopping_cart_rounded
                </button>
              </div>
            </div>
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
                      <span className="font-bold text-base">
                        {" "}
                        ${parseFloat(totalPrice.toFixed(2))}
                      </span>
                    </h5>
                  ) : (
                    <h5 className="text-secondary">${parseFloat(price.toFixed(2))}</h5>
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
