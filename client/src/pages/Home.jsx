import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useNav } from "../hooks/useNav";
import { useServices } from "../hooks/useServices";
import { loadPagination } from "../store/appSlice";

export const Home = () => {
  const { getProductById, details } = useServices();

console.log(details.details)



  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          getProductById(2);
        }}
      >
        Home
      </button>
    </div>
  );
};
