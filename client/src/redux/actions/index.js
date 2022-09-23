import {
  GET_PRODUCTS,
  SORT_PRODUCTS,
  GET_PRODUCT_ID,
  GET_PRODUCT_BY_NAME,
  GET_HOME_PRODUCTS,
  RESET_DETAIL,
  FILTER,
  SET_DEFAULT_SORT,
  SET_DEFAULT_FILTER,
  RESET,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
} from "./actionTypes";
import axios from "axios";

/* GET PRODUCTS */
export const getProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/products")
      .then((products) =>
        dispatch({ type: GET_PRODUCTS, payload: products.data })
      )
      .catch((error) => dispatch({ tupe: GET_PRODUCTS, payload: error }));
  };
};

export const reset = (payload) => {
  return async dispatch => {
      return dispatch({type: RESET, payload})
  };
};

export const getHomeProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/products")
      .then((products) =>
        dispatch({ type: GET_HOME_PRODUCTS, payload: products.data })
      )
      .catch((error) => dispatch({ tupe: GET_HOME_PRODUCTS, payload: error }));
  };
};

/* GET DETAIL */
export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let getProductId = await axios(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_ID,
        payload: getProductId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetDetail = (payload) => {
  return async (dispatch) => {
    return dispatch({ type: RESET_DETAIL, payload });
  };
};

/* SEARCH */
export const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "http://localhost:3001/products?name=" + name
      );
      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* SORT y FILTER */

export const filterProducts = (payload) => {
  return {
    type: FILTER,
    payload,
  };
};

export const sortProducts = (payload) => {
  return {
    type: SORT_PRODUCTS,
    payload,
  };
};

export const setDefaultSort = (payload) => {
  return{
    type: SET_DEFAULT_SORT,
    payload
  };
};

export const setDefaultFilter = (payload) => {
  return{
    type: SET_DEFAULT_FILTER,
    payload
  };
};


/*         CART              */

export function addToCart(id, cartID) {
	return async function (dispatch) {
		try {
			const adding = axios.post(`/cart`, {
				cartID: cartID, 
				productID: id, 
			});
			dispatch({
				type: ADD_TO_CART,
				payload: id,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export const removeOneFromCart = (id, cartID) => {
  return async function (dispatch) {
		try {
			const deleting = axios.delete(`/cart`, {
				cartID: cartID, 
				productID: id, 
			});
			dispatch({
				type: REMOVE_ONE_FROM_CART,
				payload: id,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const removeAllFromCart = () => {
  return async function (dispatch) {
		try {
			return dispatch({
				type: REMOVE_ALL_FROM_CART,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const clearCart = (userID) => {
  return async function (dispatch) {
		let clearAll = await axios.delete(`/cart/${userID}`);
		return dispatch({
			type: CLEAR_CART,
		});
	};
};
