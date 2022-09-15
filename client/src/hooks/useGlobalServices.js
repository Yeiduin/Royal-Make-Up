import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { searchByName } from "../store/globalSlice";

export const useGlobalServices = () => {
  const params = useParams();
  const nameParams = params.name;

  const dispatch = useDispatch();
  //faltará acá?
  const name = useSelector((state) => state.searchName);

  const searchBy = (inputName) => {
    dispatch(searchByName(inputName));
    // expected => {searchName: }
    /* console.log(name)
    return name; */
  };
  return { searchBy };
};
