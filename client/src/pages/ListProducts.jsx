import React, { useEffect } from "react";
import { Gallery } from "../components/ListProducts/Gallery";
import { Pagination } from "../components/ListProducts/Pagination";
import { useListProductsServices } from "../hooks/useListProductsServices";
import { NavFilters } from "../components/ListProducts/Filters/NavFilters";
import { BrandsFilters } from "../components/ListProducts/Filters/BrandsFilters";

import { containerListProducts } from "../assets/css/list-products/listProducts.module.css";

export const ListProducts = () => {
  const {
    idParams,
    goPage,
    global: {
      positionScroll,
      filters: { orderBy, category, searchName, brand },
    },
  } = useListProductsServices();

  useEffect(() => {
    goPage(idParams);
  }, [orderBy]);
  
  useEffect(() => {
    if (category !== null || brand !== null) goPage(1);
  }, [category, brand]);


  useEffect(() => {
    if (searchName || searchName === null) goPage(1);
  }, [searchName]);

  useEffect(() => {
    window.scroll(0, positionScroll);
  }, []);

  return (
    <div className={containerListProducts}>
      <BrandsFilters />
      <NavFilters />
      <Gallery />
      <Pagination />
    </div>
  );
};
