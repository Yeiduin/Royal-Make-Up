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
    <div className="text-primary">
      <select className="uppercase text-sm rounded-lg focus:ring-secondary focus:border-secondary" onChange={handleSort} style={{"width": "200px"}}>
      <option className='bg-tertiary rounded-md uppercase' value="relevance">Sort - by relevance</option>
        <option className='bg-tertiary rounded-md uppercase' value="A-Z">Sort - A-Z</option>
        <option className='bg-tertiary rounded-md uppercase' value="Z-A">Sort - Z-A</option>
        <option className='bg-tertiary rounded-md uppercase' value="priceAsc">Sort - Price (low to high)</option>
        <option className='bg-tertiary rounded-md uppercase' value="priceDesc">Sort - Price (high to low)</option>
      </select>
    </div>
  );
};
