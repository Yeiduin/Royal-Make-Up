import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { setFilterOrederBy, setFilterCategory,searchByName } from "../store/globalSlice";
export const useGlobalServices = () => {

    let objReturn = {};
    const param = useParams();
    const idParams = parseInt(param.id) || 1;


    const dispatch = useDispatch();
    const { home, global, details, listProducts } = useSelector((state) => state);



    const changeOrderBy = (string) => {
        dispatch(setFilterOrederBy(string));
    };
    const changeCategory = (string) => {
        dispatch(setFilterCategory(string));
    };

    const searchBy = (inputName) => {
        dispatch(searchByName(inputName));
      };

    objReturn.changeOrderBy = changeOrderBy;
    objReturn.changeCategory = changeCategory;
    objReturn.searchBy = searchBy;

    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;

    return objReturn;

}