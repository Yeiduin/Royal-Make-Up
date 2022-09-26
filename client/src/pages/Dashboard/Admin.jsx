import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProductDashboard } from "../../redux/actions";
import { Link } from "react-router-dom";
import { ProductCardDashboard } from "./ProductCardDashboard";


export const Admin = () => {


    return(
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl lg:px-6">
        <div className="text-base pt-44 flex flex-col items-center">
            <Link
              className="hover:text-secondary "
              to="../createproduct"
              onClick={() => handleClick()}
            >
              Create Product
            </Link>
            <Link
              className="hover:text-secondary"
              to="../productslist"
              onClick={() => handleClick()}
            >
              Products List
            </Link>
        </div>
        </div>
    )
}