import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allValidate } from "../../helpers/validation";
import { useForms } from "../../hooks/useForms";
import { CheckoutBut } from "../Paypal/CheckoutBut";
import { AlertError } from "./AlertError";

export const AlerBuy = () => {
  const [butPayOpen, setButPayOpen] = useState(false);
  const { id } = JSON.parse(localStorage.getItem("userLogged"));
  const { cartByUserId } = useSelector((state) => state);
  const [total, setTotal] = useState(0);

  const [values, handleInputChange] = useForms({
    adress: "",
    country: "",
    state: "",
    street: "",
  });
  const { address, country, state, street } = values;

  const [listValidate, setListValidate] = useState([]);
  const [destiny, setDestiny] = useState("");

  const allValidatesOK = () => {
    let list = allValidate(values);
    list = list.filter((obj) => obj.condition === false);
    if (!list.length) return true;
    else return false;
  };

  const typeExists = (type) => {
    const list = listValidate.filter(
      (obj) => obj.type === type && obj.condition === false
    );
    if (list.length) return true;
    else return false;
  };

  const upperCaseList = (list) => {
    let result = "";
    list = list.split(" ");
    list = list.map((string) => {
      if (string && string.length >= 2)
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
      else return string.toUpperCase();
    });
    list = list.forEach((string) => {
      result = result + " " + string.toString();
    });
    return result;
  };

  useEffect(() => {
    setListValidate(allValidate(values));
    country && console.log(upperCaseList(country));
    if (country && state && address && street)
      setDestiny(
        upperCaseList(country) +
          ", " +
          upperCaseList(state) +
          ", " +
          upperCaseList(address) +
          " " +
          street
      );
  }, [values]);

  useEffect(() => {
    setTotal(cartByUserId.totalPrice);
  }, [cartByUserId]);

  return (
    <div className="absolute flex justify-center w-full ">
      <form
        className="border-gray-400 text-primary m-2 px-7 pt-6 rounded-lg text-center bg-tertiary"
        // style={{ backgroundColor: "#d6934f8e" }}
      >
        {!butPayOpen && (
          <>
            <div className="grid gap-6 mb-10 md:grid-cols-2">
              <div>
                <label className="block mb-2 ml-1 text-lg font-medium text-primary">
                  COUNTRY
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="country"
                  className={`bg-primary opacity-80 text-center rounded-lg placeholder:text-white text-white border-gray-400 ${
                    typeExists("country") && "input-error"
                  }`}
                  placeholder="Argentina"
                  required
                  autoComplete="off"
                  style={{ outline: "none" }}
                  onChange={handleInputChange}
                />
                {listValidate && listValidate.length && (
                  <AlertError listValidate={listValidate} type={"country"} />
                )}
              </div>
              <div>
                <label className="block mb-2 ml-1 text-lg font-medium text-primary dark:text-primary">
                  STATE
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="state"
                  className={`bg-primary opacity-80 text-center rounded-lg placeholder:text-white text-white border-gray-400 ${
                    typeExists("state") && "input-error"
                  }`}
                  placeholder="Santa Fé"
                  required
                  style={{ outline: "none" }}
                  onChange={handleInputChange}
                />
                {listValidate && listValidate.length && (
                  <AlertError listValidate={listValidate} type={"state"} />
                )}
              </div>
              <div>
                <label className="block mb-2 ml-1 text-lg font-medium text-primary dark:text-primary">
                  ADDRESS
                </label>
                <input
                  name="address"
                  type="text"
                  id="last_name"
                  className={`bg-primary opacity-80 text-center rounded-lg placeholder:text-white text-white border-gray-400 ${
                    typeExists("address") && "input-error"
                  }`}
                  placeholder="Malagama"
                  required
                  style={{ outline: "none" }}
                  onChange={handleInputChange}
                />
                {listValidate && listValidate.length && (
                  <AlertError listValidate={listValidate} type={"address"} />
                )}
              </div>
              <div>
                <label className="block mb-2 ml-1 text-lg font-medium text-primary dark:text-primary">
                  STREET
                </label>
                <input
                  name="street"
                  type="text"
                  id="last_name"
                  className={`bg-primary opacity-80 text-center rounded-lg placeholder:text-white text-white border-gray-400 ${
                    typeExists("street") && "input-error"
                  }`}
                  placeholder="2309"
                  required
                  style={{ outline: "none" }}
                  onChange={handleInputChange}
                />
                {listValidate && listValidate.length && (
                  <AlertError listValidate={listValidate} type={"street"} />
                )}
              </div>
            </div>
          </>
        )}
        <div className=" flex justify-center flex-col items-center">
          {butPayOpen ? (
            <div className=" w-96 px-10 py-4 opacity-90 text-primary text-lg">
              CHOOSE YOUR PAYMENT METHOD
            </div>
          ) : (
            ""
          )}
          <div className=" w-96 px-10 py-2 opacity-90">
            {butPayOpen ? (
              <CheckoutBut total={total} userID={id} destiny={destiny} />
            ) : (
              <button
                className="bg-primary"
                // * Cambiar estilos a tailwind.
                style={{
                  backgroundColor: `${allValidatesOK() ? "" : "#eda551"}`,
                  cursor: !allValidatesOK() ? "default" : "",
                  padding: "6px 25px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  color: "white",
                }}
                type="button"
                onClick={() => allValidatesOK() && setButPayOpen(true)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
