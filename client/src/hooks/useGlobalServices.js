import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { setFilters, saveCategories, setPosition } from "../store/globalSlice";
export const useGlobalServices = () => {

    let objReturn = {};
    const param = useParams();
    const idParams = parseInt(param.id) || 1;


    const dispatch = useDispatch();
    const { home, global, details, listProducts } = useSelector((state) => state);

    const getCategories = async () => {
        axios("http://localhost:3001/categories").then((response) => {
            dispatch(saveCategories(response.data[0].categories));
        });
    };

    const changeFilter = (obj) => {
        dispatch(setFilters(obj));
    };

    const savePosition = async (num = window.scrollY) => {
        dispatch(setPosition(num));
    };


    objReturn.changeFilter = changeFilter;
    objReturn.getCategories = getCategories;


    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;
    objReturn.savePosition = savePosition;

    return objReturn;

}