import React, { useRef, useEffect, useState } from "react";
import { Alert } from "./Alert";
import axios from "axios";

import { clearCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

export const CheckoutBut = ({ total, userID, destiny }) => {
  const paypal = useRef();
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState({
    condition: false,
    msg: "Error in checkout, try again later...",
    ok: true,
  });
  const sendOrder = () => {
    const config = {
      method: "post",
      url: "/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ status: "open", userID, address: destiny }),
    };
    axios(config)
      .then((resp) => dispatch(clearCart(userID)))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Niveados Products",
                amount: {
                  currency_code: "USD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          setOpenAlert({
            ...openAlert,
            condition: true,
            msg: "Your order has been approved!",
          });
          sendOrder();
        },
        onError: (err) => {
          setOpenAlert({ ...openAlert, condition: true, ok: false });
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
      {openAlert.condition ? <Alert {...openAlert} /> : <></>}
    </div>
  );
};
