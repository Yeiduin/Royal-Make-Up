import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListCart } from "../Favorites/ListCart";
export const Order = ({ userID, status, userType }) => {
  const sliceUser = (user) => {
    if (user.length > 23) return user.slice(0, 23) + "...";
    else return user;
  };
  const [email, setEmail] = useState(userID);

  const getEmail = async (condition) => {
    try {
      if (condition) {
        const response = await axios.get(
          `/users?userId=${"636051f7-7f71-4e34-a050-dd17e25601b4"}`
        );
        setEmail(response.data.email);
      } else setEmail(userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userType === "Admin" ? getEmail(true) : getEmail(false);
  }, [userType]);

  return (
    <>
      <div
        className="w-[34rem] flex justify-between rounded-lg p-3 my-3"
        style={{ backgroundColor: "#F6F5EC" }}
      >
        <div className="flex items-center w-72">
          <p className="text-3x1 text-primary">
            <strong className="px-2 text-2xl">◌</strong>
            {sliceUser(email)}
          </p>
        </div>

        <div className="w-44 flex justify-between items-center">
          <div className="flex justify-center w-28">
            {userType === "Admin" ? (
              <>
                <span className="text-3x1 text-primary ">
                  {status.toUpperCase()}
                </span>
                <span className="text-3x1 material-icons text-primary">
                  keyboard_arrow_down
                </span>
              </>
            ) : (
              <span className="text-3x1 text-primary">
                {status.toUpperCase()}
              </span>
            )}
          </div>
          {userType === "Admin" ? (
            <span
              className="text-2xl material-icons text-primary cursor-pointer hover:text-red-600 px-1"
              title="Delete Order"
            >
              delete
            </span>
          ) : (
            <span
              className="text-2xl material-icons text-primary cursor-pointer hover:text-secondary px-1"
              title="Copy ID"
            >
              content_copy
            </span>
          )}
        </div>
      </div>
    </>
  );
};
