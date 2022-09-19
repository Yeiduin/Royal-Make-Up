import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { loadPage } from "../store/listProductsSlice";
import { useNav } from "./useNav";
import { actualPage, saveBrands } from "../store/globalSlice";
import { useGlobalServices } from "./useGlobalServices";

export const useListProductsServices = () => {

    let objReturn = {};
    const param = useParams();
    const idParams = parseInt(param.id) || 1;
    const { redirectPage } = useNav();
    const { savePosition } = useGlobalServices();

    const dispatch = useDispatch();
    const { home, global, details, listProducts } = useSelector((state) => state);

    const goPage = async (num) => {
        const { filters: { orderBy = "", category = "", searchName = "", brand = "" } } = global;

        let payload = { listPage: [], nextPageExists: true };
        let propOrder, typeOrder = "";


        switch (orderBy) {
            case "nameDesc":
                propOrder = "name";
                typeOrder = "desc";
                break;

            case "priceDesc":
                propOrder = "price";
                typeOrder = "desc";
                break;

            case "priceAsc":
                propOrder = "price";
                typeOrder = "asc";
                break;
            case "ratingDesc":
                propOrder = "rating";
                typeOrder = "desc";
                break;
            case "newest":
                propOrder = "created_at";
                typeOrder = "desc";
                break;
            default:
                propOrder = "name";
                typeOrder = "asc";
                break;
        }
        const configPetition = (number) => {
            let petition = `http://localhost:3001/products?_page=${number}&_limit=18`;

            if (category) petition += `&category=${category}`;
            if (brand) petition += `&brand=${brand}`;
            if (searchName) petition += `&name=${searchName}`;
            petition += `&_sort=${propOrder}`;
            petition += `&_order=${typeOrder}`;
            return petition;
        }

        await axios(configPetition(num))
            .then((resp) => {
                payload.listPage = resp.data;
                // payload.nextPageExists = true;
            })
            .catch((e) => console.log(e));


        await axios(configPetition(num + 1))
            .then((resp) => {
                if (!resp.data.length) payload.nextPageExists = false;
            })
            .catch((e) => console.log(e));
            
        dispatch(actualPage(num));
        dispatch(loadPage(payload));
        redirectPage(num);
        savePosition();
    };

    // $ dGlobal facu
    const getBrands = async () => {
        axios("http://localhost:3001/brands").then((response) => {
            dispatch(saveBrands(response.data));
        });
    };



    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;
    objReturn.goPage = goPage;

    objReturn.getBrands = getBrands;

    return objReturn;
}