import axios from "axios";
import { useDispatch } from "react-redux";
import{createProduct} from "../store/createProducSlice"

export const useForm2 = () => {
  const dispatch = useDispatch();
  let object={};
  const createProdu = (data) => {
    
    var config = {
      method: "post",
      url: "http://localhost:3001/products",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(createProduct());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  object.createProdu=createProdu;
  return object
};
