import React, { useEffect } from "react";
import { Gallery } from "../components/ListProducts/Gallery";
import { Pagination } from "../components/ListProducts/Pagination";
import { useListProductsServices } from "../hooks/useListProductsServices";

export const ListProducts = () => {
  const {
    idParams,
    goPage,
    listProducts: { listPage },
    global: {
      filters: { orderBy, category },
    },
  } = useListProductsServices();

  useEffect(() => {
    goPage(idParams);
  }, [category, orderBy, idParams]);

  return (
    <div>
      <Gallery />
      <Pagination />
    </div>
  );
};
