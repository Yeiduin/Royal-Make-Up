import React from "react";

export const ListCart = ({ cart }) => {
  // const listCars=

  const sliceString = (string) => {
    if (string.length > 26) return string.slice(0, 26) + "...";
    else return string;
  };

  return (
    <>
      {cart &&
        cart.map((item) => (
          <div
            key={item.id}
            className="w-[36rem] flex justify-between rounded-lg py-3 px-1 my-1"
            style={{ backgroundColor: "#c9d8cf" }}
          >
            <div className="flex text-primary">
              <div className="w-[3rem]">
                <img
                  className=" rounded-xl px-2"
                  src={item.image}
                  alt="product"
                />
              </div>
              <div className="w-[16rem] mx-2">
                <span className="">{sliceString(item.name)}</span>
              </div>
            </div>
            <div className="w-[7.6rem] flex justify-between mr-6 text-primary">
              <div>
                <span className=" ">x{item.amount}</span>
              </div>
              <div>
                <span className="">${item.price}</span>
              </div>
            </div>
          </div>
        ))}

      <div
        className="w-[36rem] flex justify-end text-primary rounded-lg py-3 my-1"
        style={{ backgroundColor: "#bdcac2" }}
      >
        <span className="px-6">TOTAL</span> <span>=</span>
        <span className="pl-6 mr-7">${50}</span>
      </div>
    </>
  );
};
