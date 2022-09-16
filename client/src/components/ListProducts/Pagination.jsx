import React from "react";
import { useListProductsServices } from "../../hooks/useListProductsServices";
import { useNav } from "../../hooks/useNav";

export const Pagination = () => {
  const { goPage } = useListProductsServices();
  const { redirectPage } = useNav();

  const setPaguination = (num) => {
    goPage(num);
    redirectPage(num);
  };

  return (
    <div>
      <button
        className="btn btn-dark"
        onClick={() => {
          setPaguination(1);
        }}
      >
        1
      </button>
      <button
        className="btn btn-dark"
        onClick={() => {
          setPaguination(2);
        }}
      >
        2
      </button>
      <button
        className="btn btn-dark"
        onClick={() => {
          setPaguination(3);
        }}
      >
        3
      </button>
      <button
        className="btn btn-dark"
        onClick={() => {
          setPaguination(4);
        }}
      >
        4
      </button>
    </div>
  );
};
