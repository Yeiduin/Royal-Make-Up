import React from "react";
import { useListProductsServices } from "../../hooks/useListProductsServices";

import {
  sectionPaguination,
  sectionPaguination__page,
  buttonDisabled,
} from "../../assets/css/list-products/pagination.module.css";

export const Pagination = () => {
  const {
    goPage,
    idParams,
    listProducts: { nextPageExists },
  } = useListProductsServices();

  const goFullDownPosition = () => {
   setTimeout(() => {
     window.scroll(0, 8000);
   }, 100);
  };

  return (
    <section className={sectionPaguination}>
      <button
        className={idParams <= 1 ? buttonDisabled : ""}
        onClick={() => {
          idParams > 1 && goPage(idParams - 1);
          goFullDownPosition();
        }}
      >
        Back
      </button>
      <button className={sectionPaguination__page}>{idParams}</button>
      <button
        className={!nextPageExists ? buttonDisabled : ""}
        onClick={() => {
          nextPageExists && goPage(idParams + 1);
          goFullDownPosition();
        }}
      >
        Next
      </button>
    </section>
  );
};
