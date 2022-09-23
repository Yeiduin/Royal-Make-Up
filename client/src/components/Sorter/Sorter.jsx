import React from "react";
import { useDispatch } from "react-redux";
import { getProducts, sortProducts } from "../../redux/actions";

export const Sorter = ({ pagination }) => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    if(e.target.value === "relevance") dispatch(getProducts())
    dispatch(sortProducts(e.target.value));
    pagination(1);
  };
  
  return (
    <div className="mt-14 mb-11">
        <p className="uppercase">SORT</p>
      <select className="uppercase" onChange={handleSort}>
      <option value="relevance">Relevance</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="priceAsc">Price (low to high)</option>
        <option value="priceDesc">Price (high to low)</option>
      </select>
    </div>
  );
};
