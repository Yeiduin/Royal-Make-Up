import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListCart } from "./ListCart";
export const Order = ({ id, userID, status, cart, userType,address }) => {
  const [order, setOrder] = useState({ email: userID, status });
  const [activeCart, setActiveCart] = useState(false);
  const [statusOrderOpen, setStatusOrderOpen] = useState(false);
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

  useEffect(() => {
    userType === "Admin" && getEmail();
    // getEmail();
  }, []);
  return (
    <>
      {order.status !== "cancelled" ? (
        <div
          className="w-[36rem] flex justify-between rounded-lg p-3 my-3"
          style={{ backgroundColor: "#e6e4d6" }}
        >
          <div className="flex items-center w-72 text-3x1 text-primary">
            <span className="pl-3 pr-7 text-1xl">{id}.</span>
            <span>{sliceString(order.email)}</span>
          </div>

          <div className="w-64 flex justify-between items-center">
            <div className="flex justify-center w-40">
              {userType === "Admin" ? (
                <>
                  <span className="text-center  text-3x1 pl-6  text-primary cursor-pointer"
                  onClick={() => {
                    statusOrderOpen ? setStatusOrderOpen(false) : setStatusOrderOpen(true);
                  }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  {statusOrderOpen ? (
                    <span
                      className="text-3x1 text-primary cursor-pointer material-icons"
                      onClick={() => {
                        setStatusOrderOpen(false);
                      }}
                    >
                      keyboard_arrow_up
                    </span>
                  ) : (
                    <span
                      className="text-3x1 text-primary cursor-pointer material-icons"
                      onClick={() => {
                        setStatusOrderOpen(true);
                      }}
                    >
                      keyboard_arrow_down
                    </span>
                  )}
                  {statusOrderOpen ? (
                    <div
                      className="absolute w-44 mt-9 rounded-lg text-center rounded-t-none text-primary"
                      style={{ backgroundColor: "#d8d6c7" }}
                    >
                      <div
                        className="p-2 cursor-pointer"
                        onClick={() => {
                          changeOrder("open");
                          setStatusOrderOpen(false);
                        }}
                      >
                        OPEN
                      </div>
                      <div
                        className="p-2 cursor-pointer"
                        onClick={() => {
                          changeOrder("created");
                          setStatusOrderOpen(false);
                        }}
                      >
                        CREATED
                      </div>
                      <div
                        className="p-2 cursor-pointer"
                        onClick={() => {
                          changeOrder("processing");
                          setStatusOrderOpen(false);
                        }}
                      >
                        PROCESSING
                      </div>
                      <div
                        className="p-2 cursor-pointer"
                        onClick={() => {
                          changeOrder("approved");
                          setStatusOrderOpen(false);
                        }}
                      >
                        APPROVED
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
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
                    className="text-xl material-icons text-primary cursor-pointer hover:text-red-500 px-4"
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
                  className="text-xl material-icons text-primary cursor-pointer hover:text-secondary "
                  title="Copy order to send..."
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `ID ORDER: ${id}, ID USER: ${userID}`
                    )
                  }
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
      {activeCart && <ListCart {...cart[0]} address={address} />}
    </>
  );
};
