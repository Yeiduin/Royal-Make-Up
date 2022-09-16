import React, { useEffect } from "react";
import { Pagination } from "../components/ListProducts/Pagination";
import { useListProductsServices } from "../hooks/useListProductsServices";
import	{ Gallery } from "../components/ListProducts/Gallery";

export const ListProducts = () => {
  const {
    idParams,
    goPage,
    listProducts: { listPage },
    global: {
      filters: { orderBy, category },
    },
  } = useListProductsServices();
  console.log('holi', idParams)

  useEffect(() => {
    goPage(idParams);
  }, [category, orderBy,idParams]);

  return (
    <div>
      <Gallery/>
      <Pagination />
    </div>
  );
};

