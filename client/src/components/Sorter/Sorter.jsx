import React, { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { sortProducts } from "../../redux/actions";

export const Sorter = ({ pagination }) => {
  const dispatch = useDispatch();

  const { sortSelect } = useSelector(state => state)
  const [sortLabel, setSortLabel] = useState(sortSelect)

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
    setSortLabel(e.target.value)
    pagination(1);
  };
  
  return (
    <div className="text-primary">
      <select className="uppercase text-sm" rounded-lg focus:ring-secondary focus:border-secondary onChange={handleSort} style={{"width": "200px"}} value={sortLabel === "offers" ? "relevance" : sortLabel}>
        <option disabled className='bg-tertiary rounded-md uppercase' value="relevance">Sort - by relevance</option>
        <option value="popular">Sort - Popular</option>
        <option value="newest">Sort - Most Recent</option>
        <option className='bg-tertiary rounded-md uppercase' value="A-Z">Sort - A-Z</option>
        <option className='bg-tertiary rounded-md uppercase' value="Z-A">Sort - Z-A</option>
        <option className='bg-tertiary rounded-md uppercase' value="priceAsc">Sort - Price (low to high)</option>
        <option className='bg-tertiary rounded-md uppercase' value="priceDesc">Sort - Price (high to low)</option>   
      </select>
    </div>
  );
};
