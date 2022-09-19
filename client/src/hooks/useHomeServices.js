import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { loadListProducts } from "../store/homeSlice"


export const useHomeServices = () => {

    let objReturn = {};

    const dispatch = useDispatch();

    const { home } = useSelector((state) => state);

    const getGalleries = async () => {
        let payload = { 
            listNew: [],
            listPopular: [],
            listOffers: []
         };

        const configPetitionNew = (sortBy, direction) => {
            let petition = `http://localhost:3001/products?_limit=12&_sort=${sortBy}&_order=${direction}`;
            return petition;
        }

        const getNew = configPetitionNew("created_at", "desc");
        const getPopular = configPetitionNew("rating", "desc"); 
        const getOffers = configPetitionNew("discount", "asc"); 


        await axios(getNew)
            .then((resp) => {
                payload.listNew = resp.data;
            })
            .catch((e) => console.log(e));
        
       await axios(getPopular)
            .then((resp) => {
                payload.listPopular = resp.data;
            })
            .catch((e) => console.log(e));
    
       await axios(getOffers)
            .then((resp) => {
                payload.listOffers = resp.data?.filter(e => e.discount);
            })
            .catch((e) => console.log(e));

        
        
       dispatch(loadListProducts(payload));
    }  
    
    objReturn.home = home;
    objReturn.getGalleries = getGalleries;

    return objReturn;
}