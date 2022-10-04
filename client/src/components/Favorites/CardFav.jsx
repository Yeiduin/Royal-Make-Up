import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNav } from "../../hooks/useNav";
import { deleteFavorite } from "../../redux/actions";
export const CardFav = ({ idItem }) => {
  const { redirectDetails } = useNav();
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem('userLogged'));
  const userId = userLogged && userLogged.id ? userLogged.id : "";

  const [item, setItem] = useState({
    name: "nombre",
    category: "cream",
    image: "./crema.png",
    price: 20,
    discount: 0,
    rank: 0,
  });
  const { name, category, image, price, discount, rank } = item;
  const [activeLink, setActiveLink] = useState(true);

  const getItem = async () => {
    try {
      let resp = await axios(`/products/${idItem}`);
      return setItem(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = () => {
    dispatch(deleteFavorite(idItem, userId));
  };

  const goDetails = () => {
    activeLink && redirectDetails(idItem);
  };

  useEffect(() => {
    getItem(idItem);
  }, []);
  return (
    <div className="xl:w-1/2 w-[44rem] p-4">
      <div
        className="flex justify-start m-5 cursor-pointer"
        onClick={goDetails}
      >
        <div className="w-40 h-40 ">
          <img
            src={image}
            alt="product"
            onError={(e) => {
              e.target.src =
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-index-makeup-essentials-1645556621.jpg?crop=0.444xw:0.888xh;0.260xw,0.0673xh&resize=640:*";
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary"
          />
        </div>
        <div className="w-2/3 flex flex-col justify-between ">
          <div className="w-full flex flex-row justify-between m-2">
            <div>
              <h2 className=" text-primary uppercase px-4 text-lg">{name}</h2>
              <br />
              <h2 className=" text-primary uppercase px-4 text-sm">
                {category}
              </h2>
            </div>
            {discount ? (
              <div className="text-lg text-secondary flex">
                <span className="line-through">${parseFloat(price.toFixed(2))}</span>
                <span className="pl-2 text-lg"> ${parseFloat(price - (price * discount / 100).toFixed(2))}</span>
              </div>
            ) : (
              <h2 className="text-secondary text-lg">${price}</h2>
            )}
          </div>
          <div className="w-full flex flex-row items-center justify-between m-2 ">
            <div className="flex text-primary px-3">
              <span className="text-2x1 material-icons text-secondary">
                star
              </span>
              <span className="text-2x1 px-2">{rank}</span>
            </div>
            <div className="flex">
              <span
                className="text-2xl material-icons text-primary cursor-pointer hover:text-red-600 px-1"
                onMouseOver={() => setActiveLink(false)}
                onMouseLeave={() => setActiveLink(true)}
                onClick={handleClickDelete}
              >
                delete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
