import React from "react";
import { useGlobalServices } from "../../../hooks/useGlobalServices";

export const Categories = () => {
  const { changeCategory } = useGlobalServices();

  const handleSelector = (cate) => {
    changeCategory(cate);
  };

  return (
    <div
      className="col-5 d-flex justify-content-between p-2"
      style={{ backgroundColor: "#82917F" }}
    >
      <button className="btn btn-dark" onClick={(e) => handleSelector("cream")}>
        Cream
      </button>
      <button
        className="btn btn-dark"
        onClick={(e) => handleSelector("lipstick")}
      >
        Lipstick
      </button>
      <button className="btn btn-dark" onClick={(e) => handleSelector("eyes")}>
        Eyes
      </button>
      <button
        className="btn btn-dark"
        onClick={(e) => handleSelector("brushes")}
      >
        Brushes
      </button>
      <button
        className="btn btn-dark"
        onClick={(e) => handleSelector("liquid")}
      >
        Liquid
      </button>
    </div>
  );
};
