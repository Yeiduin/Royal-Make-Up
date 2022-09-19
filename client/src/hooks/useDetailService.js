import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadProducts, loadType } from "../store/detailsSlice";
import { useSelector } from "react-redux";

export const useDetailService = () => {
// holis
    const param = useParams();
    const idParams = parseInt(param.id);
    const dispatch = useDispatch();

    let objReturn = {};
    const { home, global, details, listProducts, productType } = useSelector((state) => state);
    
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
                        description: response.data.description,
                        //added here
                        product_type: response.data.product_type
                    }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //created function here
const getProductType = async () => {
    const {product: {product_type}} = details 
    console.log(product_type)

    let payload = {productType: []}
    const configPetition = () => {
        let petition = `http://localhost:3001/products?_limit=6&product_type=${product_type}`;
        return petition;
    }
        //changed here
        await axios(configPetition())
        .then((resp) => {
            payload.productType = resp.data;
            console.log(resp.data);
            dispatch(loadType(payload))
        })
        .catch((e) => console.log(e))
        console.log(payload)
}



    objReturn.idParams = idParams;
    objReturn.home = home;
    objReturn.global = global;
    objReturn.details = details;
    objReturn.listProducts = listProducts;
    objReturn.getProductById = getProductById;
    objReturn.productType = productType;
    //changed here
    objReturn.getProductType = getProductType;
    return objReturn;
}