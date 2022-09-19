import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { useGlobalServices } from "../../../hooks/useGlobalServices";

import {
  nav,
  wrap,
  nav__link,
  nav__svgs,
  nav__logo,
  nav__search,
  searchInput,
  searchIcon,
} from "../../../assets/css/list-products/nav.module.css";
import cart from "../../../assets/svgs/cart.svg";
import heart from "../../../assets/svgs/heart.svg";
import mglass from "../../../assets/svgs/m-glass.svg";
import profile from "../../../assets/svgs/profile.svg";

export const NavBar = () => {
  const [values, handleInputChange] = useForm();
  const { changeFilter } = useGlobalServices();

  const changeSearchName = (e) => {
    e.preventDefault();
    changeFilter(values);
  };

  useEffect(() => {
    values.searchName === "" && changeFilter({ searchName: null });
  }, [values]);

  return (
    <nav className={nav}>
      <div className={wrap}>
        <div className={wrap}>
          <div className={nav__logo}>
            <Link to="./">NIVEADOS</Link>
          </div>
        </div>
        <div className={wrap}>
          <div className={nav__link}>
            <Link to="./home">Home</Link>
            <Link to="./listproducts/1">Catalogue</Link>
            <Link to="./createproduct">Create Product</Link>
            <Link to="./about">About</Link>
          </div>
        </div>
      </div>

      <form className={nav__search} onSubmit={changeSearchName}>
        <div className={searchInput}>
          <input name="searchName" type="search" onChange={handleInputChange} />
        </div>
        <div className={searchIcon} onClick={changeSearchName}>
          <img src={mglass} alt="icon" />
        </div>
      </form>

      <div className={wrap}>
        <div className={nav__svgs}>
          <button>
            <img src={heart} alt="icon" />
          </button>
          <button>
            <img src={cart} alt="icon" />
          </button>
          <button>
            <img src={profile} alt="icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};
