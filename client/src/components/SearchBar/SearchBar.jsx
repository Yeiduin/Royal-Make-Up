import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductByName } from "../../redux/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const error = useSelector(state => state.error);

function handleSubmit (e) {
  e.preventDefault();
  if(e.key === 'Enter'){
    console.log(name)
    dispatch(getProductByName(name))
    setName("");
} else if (!e.key){
  dispatch(getProductByName(name))
  setName("");
}
};
  return ( 
    <div className="relative mx-auto w-max">
        <input 
          type="text"
          placeholder="Search..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={handleSubmit}
          className='peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:pl-10 focus:pr-4'
        />
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12  border-transparent stroke-primary px-3.5"
              fill="none"
              viewBox="0 0 18 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        <button type="submit" onClick={handleSubmit}><span className=""></span></button>
        {error && typeof error==="string"? <p>{error}</p>:null}
    </div>

      
  );  
}