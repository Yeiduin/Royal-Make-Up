import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useGlobalServices } from "../../hooks/useGlobalServices";

export default function SearchBar() {
  const { searchBy } = useGlobalServices();
  //const dispatch = useDispatch();

  const name = useSelector((state) => state.name);

  const [values, handleInputChange, reset] = useForm();

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
      searchBy(values.search); 
  
  }
  console.log(values);
  return (
    <div>
      <input
        type="text"
        placeholder="Search all Products"
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        //borré values
        name="search"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        /* value={""} */
        //por ahora vacio
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
}
