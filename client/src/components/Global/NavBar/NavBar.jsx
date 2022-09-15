import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import "../../../assets/css/nav.css";
import { useForm } from "../../../hooks/useForm";
import { useGlobalServices } from "../../../hooks/useGlobalServices";
import { Categories } from "./Categories";

export const NavBar = () => {
  const [values, handleInputChange] = useForm();
  const { changeOrderBy } = useGlobalServices();

  useEffect(() => {
    changeOrderBy(values.orderBy);
  }, [values]);

  return (
    <nav className="d-flex flex-column align-items-center">
      <div className="col-12 d-flex flex-row align-items-center">
        <div className="col-4 d-flex justify-content-start px-5">
          <Link to="./home" className="btn btn-dark mx-2">
            Home
          </Link>
          <Link to="./listproducts/1" className="btn btn-dark mx-2">
            List
          </Link>
          <Link to="./about" className="btn btn-dark mx-2">
            About
          </Link>
        </div>
        <SearchBar />
        <div className="col-2 text-center mx-5 p-2">
          <div className="input-search">
            <select
              name="orderBy"
              className="form-select bg-dark text-white"
              aria-label="Default select example"
              onChange={handleInputChange}
            >
              <option value="nameAsc">Name Asc</option>
              <option value="nameDesc">Name Desc</option>
              <option value="priceAsc">Price Asc</option>
              <option value="priceDesc">Price Desc</option>
            </select>
          </div>
        </div>

        <Link
          to="./buy"
          className="col-2 text-align d-flex justify-content-end"
        >
          <img
            style={{ height: "40px" }}
            src="https://cdn-icons-png.flaticon.com/512/3394/3394009.png"
            alt="cart"
          />
        </Link>
      </div>
      <Categories />
    </nav>
  );
};
