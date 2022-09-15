import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
export const useHomeServices = () => {

    let objReturn = {};
    const param = useParams();
    const idParams = parseInt(param.id) || 1;

    const dispatch = useDispatch();
    const { home, global, details, listProducts } = useSelector((state) => state);

  
    
    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;

    return objReturn;
}