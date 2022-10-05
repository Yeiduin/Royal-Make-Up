import axios from "axios";
import React, { useEffect, useState } from "react";

export const CardCart = ({ id ,quantity}) => {
  const [item, setItem] = useState({});
  const getItem = async () => {
    try {
      let resp = await axios(`/products/${id}`);
      return setItem(resp.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const sliceString = (string = "") => {
    if (string.length > 26) return string.slice(0, 26) + "...";
    else return string;
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      {item ? (
        <div
          className="w-[36rem] flex justify-between items-center rounded-lg py-3 px-1 my-1"
          style={{ backgroundColor: "#cee3d0" }}
        >
          <div className="flex items-center text-primary">
            <div className="w-[3rem]">
              <img
                className=" rounded-xl px-2"
                src={item.image}
                alt="product"
              />
            </div>
            <div className="w-[16rem] mx-2">
              <span className="">{(sliceString(item.name))}</span>
            </div>
          </div>
          <div className="w-[8rem] flex justify-between mr-7 text-primary">
            <div>
              <span className=" ">x {quantity}</span>
            </div>
            <div>
              <span className="">${item.price}</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
