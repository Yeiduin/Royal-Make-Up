import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadProducts } from "../store/detailsSlice";
import { useSelector } from "react-redux";

export const useDetailService = () => {
// holis
    const param = useParams();
    const idParams = parseInt(param.id);
    const dispatch = useDispatch();

    let objReturn = {};
    const { home, global, details, listProducts } = useSelector((state) => state);
    
    const getProductById = () => {

        let config = {
            method: 'get',
            url: `http://localhost:3001/products/${idParams}`,
        };

        axios(config)
            .then((response) => {
                 dispatch(loadProducts(
                    {
                        image: response.data.image_link,
                        name: response.data.name,
                        rating: response.data.rating,
                        price: response.data.price,
                        colors: [...response.data.product_colors],
                        description: response.data.description
                    }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;
    objReturn.getProductById = getProductById;

    return objReturn;
}