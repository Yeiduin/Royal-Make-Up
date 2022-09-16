import React, { useEffect } from "react";
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
  console.log('holi', idParams)

  useEffect(() => {
    goPage(idParams);
  }, [category, orderBy,idParams]);

  return (
    <div>
      {listPage.length
        ? listPage.map((prod) => (
            <div
              key={prod.id}
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255,255,255,0.5)",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>NAME: {prod.name}</p>
              <img
                src={prod.image_link}
                alt={prod.name}
                style={{
                  height: "60px",
                  width: "60px",
                }}
              />
              <p>PRICE: {prod.price}</p>
              <p>CATEGORY: {prod.category}</p>
            </div>
          ))
        : ""}

      <Pagination />
    </div>
  );
};
