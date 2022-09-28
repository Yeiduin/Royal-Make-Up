import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName } from "../../redux/actions";

export const SearchBar = ({}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { searchTerm } = useSelector((state) => state);
  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch(getProductByName(e.target.value));
    setName(e.target.value);
  };

  useEffect(() => {
    if (!searchTerm?.length) setName("");
  }, [searchTerm]);

  // function handleSubmit (e) {
  //   e.preventDefault();
  //   if(e.key === 'Enter'){
  //     console.log(name)
  //     dispatch(setDefaultSort(false))
  //     dispatch(getProductByName(name))
  //     // pagination(1)
  //     setShowSearch(true)
  //     setName("");
  // } else if (!e.key){
  //   dispatch(getProductByName(name))
  //   // pagination(1)
  //   setName("");
  // }

  // };
  return (
    <div className="flex flex-row ">
      <div className="relative mx-auto w-max">
        <input
          type="text"
          placeholder="Search..."
          value={name}
          onChange={handleSearch}
          // onKeyUp={handleSubmit}
          className=" align-baseline peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-3/4 focus:cursor-text focus:border focus:pl-10 focus:pr-4 focus:ring-secondary focus:border-secondary"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 my-auto h-8 w-12  border-transparent stroke-primary px-3.5"
          fill="none"
          viewBox="0 0 18 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};
