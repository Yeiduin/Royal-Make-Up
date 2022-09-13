import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { loadProducts } from "../store/detailsSlice";
import { useParams } from "react-router-dom";
export const useServices = () => {

    const param = useParams();
    const id = parseInt(param.id) || 1;

    const dispatch = useDispatch();
    const { someone } = useSelector((state) => state.home);
    const details = useSelector((state) => state.details);



    const getProductById = () => {
// $ dGlobal kevin
// dispatch(sumFavirte(1));

        let config = {
            method: 'get',
            url: `http://localhost:3001/products/${id}`,
        };

        axios(config)
            .then((response) => {
                dispatch(loadProducts(
                    {
                        details: response.data,
                        status: response.status
                    }));
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const getProductById2 = (id) => {

        let config = {
            method: 'get',
            url: `http://localhost:3001/products`,
        };

        axios(config)
            .then((response) => {
                dispatch(loadProducts(
                    {
                        details: response.data,
                        status: response.status
                    }));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return { getProductById ,details};


}