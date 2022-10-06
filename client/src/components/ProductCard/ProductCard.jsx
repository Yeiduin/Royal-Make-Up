import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNav } from "../../hooks/useNav";
import { addFavorite, deleteFavorite, getProductByName, addLocalCart } from "../../redux/actions";
import { Label } from "../Admin/UserListTools/Label"
//Notificacion 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductCard = ({id ,name, price, image, rank, discount, totalPrice, stock }) => {
  const [activeFavAndCart, setActiveFavAndCart] = useState(false);
  const [activeLink, setActiveLink] = useState(true);
  const { redirectDetails } = useNav();

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

  const dispatch = useDispatch();
  var { favorites, cartlocal } = useSelector((state) => state);
 
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
    dispatch(getProductByName(""))
    setTimeout(()=>{activeLink && redirectDetails(id);}, 500)
  };

  // Lo agrego al carrito LOCAL
  const handleAdd = () => {
    notifyCartAdd()
    const cartNew = {
      amount: 1,
      id: id,
      name: name,
      price: price,
      image: image,
      stock: stock,
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


  return (
      <div className="w-52"
      onClick={goDetails}
      >
        <div
          className="h-52 relative"
          onMouseOver={() => setActiveFavAndCart(true)}
          onMouseLeave={() => setActiveFavAndCart(false)}
        >
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
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-index-makeup-essentials-1645556621.jpg?crop=0.444xw:0.888xh;0.260xw,0.0673xh&resize=640:*";
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary cursor-pointer"
            
          />
          <div className="w-full justify-center absolute bottom-2 flex">
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
              onClick={ handleAdd } >
                add_shopping_cart_rounded
              </button>
            </div>
          </div>
        </div>
        <h2 className="mt-4 text-sm text-primary uppercase">{name}</h2>
        <div className="flex flex-row justify-between items-center pt-2">
          {discount ? (
            <h5 className="text-sm text-secondary">
              <span className="line-through">${parseFloat(price.toFixed(2))}</span>
              <span className="font-bold text-base"> ${parseFloat(totalPrice.toFixed(2))}</span>
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
