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
    <div className="mt-14 mb-11">
        <input 
          type="text"
          placeholder="Search..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={handleSubmit}
        />
        <button type="submit" onClick={handleSubmit}><span className=""></span></button>
        {error && typeof error==="string"? <p>{error}</p>:null}
    </div>

      
  );  
}