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
    <div className="">
      <select className="uppercase text-sm" onChange={handleSort} style={{"width": "200px"}} value={sortLabel === "offers" ? "relevance" : sortLabel}>
        <option disabled value="relevance">Sort</option>
        <option value="popular">Sort - Popular</option>
        <option value="newest">Sort - Most Recent</option>
        <option value="A-Z">Sort - A-Z</option>
        <option value="Z-A">Sort - Z-A</option>
        <option value="priceAsc">Sort - Price (low to high)</option>
        <option value="priceDesc">Sort - Price (high to low)</option>
        
      </select>
    </div>
  );
};
