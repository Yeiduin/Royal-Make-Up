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
    <div className="">
      <select className="uppercase text-sm" onChange={handleSort} style={{"width": "200px"}}>
      <option value="relevance">Sort - by relevance</option>
        <option value="A-Z">Sort - A-Z</option>
        <option value="Z-A">Sort - Z-A</option>
        <option value="priceAsc">Sort - Price (low to high)</option>
        <option value="priceDesc">Sort - Price (high to low)</option>
      </select>
    </div>
  );
};
