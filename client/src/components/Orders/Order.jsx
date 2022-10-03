import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListCart } from "./ListCart";
export const Order = ({ id, userID, status, userType }) => {
  const [order, setOrder] = useState({ email: userID, status });
  const [activeCart, setActiveCart] = useState(false);
  const cart = [
    {
      id: 1,
      price: 20,
      name: "EYE SHADOW PALETTE DELUXE",
      amount: 2,
      image:
        "http://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/015/original/open-uri20180630-4-egfs2g?1530390369",
    },
    {
      id: 2,
      price: 30,
      name: "VOLUMISING MASCARA",
      amount: 4,
      image:
        "http://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/697/original/open-uri20171223-4-1tgdgkb?1514062732",
    },
  ];

  const changeOrder = async (typeOrder) => {
    const config = {
      method: "patch",
      url: "/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: { orderID: id, status: typeOrder },
    };

    axios(config)
      .then((response) => {
        console.log("order removed successfully!");
        setOrder({ ...order, status: typeOrder });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sliceString = (string) => {
    if (string.length > 23) return string.slice(0, 23) + "...";
    else return string;
  };
  const getEmail = async () => {
    try {
      const response = await axios.get(`/users?userId=${userID}`);
      setOrder({ ...order, email: response.data.email });
    } catch (e) {
      console.log(e);
    }
  };

  const changeCart = () => {
    activeCart ? setActiveCart(false) : setActiveCart(true);
  };

  // useEffect(() => {
  //   // getEmail();
  // }, [order]);

  return (
    <>
      {order.status !== "cancelled" ? (
        <div
          className="w-[36rem] flex justify-between rounded-lg p-3 my-3"
          style={{ backgroundColor: "#e9e7db" }}
        >
          <div className="flex items-center w-72 text-3x1 text-primary">
            <span className="pl-3 pr-7 text-1xl">{id}.</span>
            <span>{sliceString(order.email)}</span>
          </div>

          <div className="w-36 flex justify-between items-center">
            <div className="flex justify-center w-2 ">
              {userType === "Admin" ? (
                <div className="flex">
                  <span className="text-3x1 text-primary cursor-pointer">
                    {order.status.toUpperCase()}
                  </span>
                  <span className="text-3x1 text-primary cursor-pointer material-icons">
                    keyboard_arrow_down
                  </span>
                </div>
              ) : (
                <span className="text-3x1 text-primary">
                  {order.status.toUpperCase()}
                </span>
              )}
            </div>

            {userType === "Admin" ? (
              <div className="flex items-center">
                {activeCart ? (
                  <span
                    className="text-xl material-icons text-primary cursor-pointer hover:text-secondary px-4"
                    title="Delete Order"
                    onClick={changeCart}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="text-xl material-icons text-primary cursor-pointer hover:text-secondary px-4"
                    title="Delete Order"
                    onClick={changeCart}
                  >
                    visibility
                  </span>
                )}
                <span
                  className="text-xl material-icons text-primary cursor-pointer hover:text-red-600 "
                  title="Delete Order"
                  onClick={() => {
                    changeOrder("cancelled");
                    setActiveCart(false);
                  }}
                >
                  delete
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                {activeCart ? (
                  <span
                    className="text-xl material-icons text-primary cursor-pointer hover:text-secondary px-4"
                    title="Delete Order"
                    onClick={changeCart}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="text-xl material-icons text-primary cursor-pointer hover:text-secondary px-4"
                    title="Delete Order"
                    onClick={changeCart}
                  >
                    visibility
                  </span>
                )}
                <span
                  className="text-xl material-icons text-primary cursor-pointer hover:text-red-600 "
                  title="Delete Order"
                  onClick={changeCart}
                >
                  content_copy
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {activeCart && <ListCart cart={cart} />}
    </>
  );
};
