import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { loadPage } from "../store/listProductsSlice";

export const useListProductsServices = () => {

    let objReturn = {};
    const param = useParams();
    const idParams = parseInt(param.id) || 1;
    
    const dispatch = useDispatch();
    const { home, global, details, listProducts } = useSelector((state) => state);

    const goPage = async (num) => {
        const { filters: { orderBy = "", category = "", searchBrand = "" } } = global;
        // const { filters: { category = "" } } = home;
        let name = "";

        let payload = { listPage: [] };
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
            if (searchBrand) petition += `&brand=${searchBrand}`;
            if (name) petition += `&name=${name}`;
            petition += `&_sort=${propOrder}`;
            petition += `&_order=${typeOrder}`;
            return petition;
        }

        await axios(configPetition(num))
            .then((resp) => {
                payload.listPage = resp.data;
                payload.next = true;
            })
            .catch((e) => console.log(e));


        await axios(configPetition(num + 1))
            .then((resp) => {
                if (!resp.data.length) payload.next = false;
            })
            .catch((e) => console.log(e));
            console.log(payload)
        dispatch(loadPage(payload));
    };

    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;
    objReturn.goPage = goPage;

    return objReturn;
}