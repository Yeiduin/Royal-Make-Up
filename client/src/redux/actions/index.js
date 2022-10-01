import {
  GET_PRODUCTS,
  SORT_PRODUCTS,
  GET_PRODUCT_ID,
  GET_PRODUCT_BY_NAME,
  RESET_DETAIL,
  FILTER,
  SET_DEFAULT_SORT,
  SET_DEFAULT_FILTER,
  RESET,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  GET_USER_BY_EMAIL,
  POST_CREATE_PRODUCT,
  SEARCH_PRODUCT_DASHBOARD,
  GET_CART_BY_USERID,
  GET_PRODUCT_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_FAVORITES,
  ADD_FAVORITES,
  DELETE_FAVORITES,
} from "./actionTypes";
import axios from "axios";
import { async } from "@firebase/util";

/* GET PRODUCTS */
export const getProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("/products")
      .then((products) =>
        dispatch({ type: GET_PRODUCTS, payload: products.data })
      )
      .catch((error) => dispatch({ tupe: GET_PRODUCTS, payload: error }));
  };
};

export const reset = (payload) => {
  return async dispatch => {
    return dispatch({ type: RESET, payload })
  };
};

/* GET DETAIL */
export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let getProductId = await axios(`/products/${id}`);
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
        "/products?name=" + name
      );
      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: response.data,
        searchTerm: name
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const searchProductDashboard = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "/products?name=" + name
      );
      return dispatch({
        type: SEARCH_PRODUCT_DASHBOARD,
        payload: response.data,
        searchTerm: name
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
  return {
    type: SET_DEFAULT_SORT,
    payload
  };
};

export const setDefaultFilter = (payload) => {
  return {
    type: SET_DEFAULT_FILTER,
    payload
  };
};


/*         CART              */

export function addToCart(allProducts, userID) {
 console.log('USER ID',userID)
  // const arrayId = allProducts?.map((e)=> {return e.id});

  return async function () {
    try {
      const adding = axios.post('/cart/bulk', {
        allProducts,
        userID
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCartByUserId = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/cart/" + userId);
      return dispatch({
        type: GET_CART_BY_USERID,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

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


// export function addToCart(id, cartID) {
//   return async function (dispatch) {
//     try {
//       const adding = axios.post(`/cart`, {
//         cartID: cartID,
//         productID: id,
//       });
//       dispatch({
//         type: ADD_TO_CART,
//         payload: id,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }



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



/*     USER      */

export const getUserByEmail = (email) => {

  return async function (dispatch) {
    try {
      const response = await axios.get(
        "/users/" + email
      );
      return dispatch({
        type: GET_USER_BY_EMAIL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}


export function addUser(user) {
  return async function () {
    try {
      await axios.post("/users", user)

    } catch (error) {
      console.log(error)
    }
  }
}

/* POST CREATE PRODUCT*/

export const createProduct = (data) => {
  var config = {
    method: "post",
    url: "/products",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return async function (dispatch) {
    try {
      const respuesta = await axios(config);

      dispatch({ type: POST_CREATE_PRODUCT, payload: respuesta })
    } catch (error) {
      console.log(error);
    }
  }
}


/* COMMENTS */

export const postComment = (comment) => {
  return async function (dispatch) {
    try {
      const postComment = axios.post(`/comments`,
        comment);
      console.log(comment, 'post comment action')
      dispatch({
        type: ADD_COMMENT,
        payload: postComment,
      });
    } catch (error) {
      console.log(error);
    }
  }
}


/* export const getProductComment = (id) => {
  return async function (dispatch) {
    try {
      console.log (id, "this is id")
      const response = await axios.get("/comments", id);
      console.log(response);
      console.log(response.data)
      return dispatch({
        type: GET_PRODUCT_COMMENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
} */

export const getProductComment = (id) => {
  return async function (dispatch) {
    try {
      let productComments = await axios(`/comments?productId=` + id);
      return dispatch({
        type: GET_PRODUCT_COMMENTS,
        payload: productComments.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteComment = (comment) => {
  return async function (dispatch) {
    try {
      console.log(comment)
      const deleteComment = axios.delete('/comments?commentId=' + comment);
      dispatch({
        type: DELETE_COMMENT,
        payload: deleteComment,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


/* Favorites */

export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/favorites?userId=${userId}`,
      );
      return dispatch({
        type: GET_FAVORITES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}


export const addFavorite = (productId, userId) => {
  return async (dispatch) => {

    const config = {
      method: 'post',
      url: '/favorites',
      headers: { 'Content-Type': 'application/json' },
      data: { userId, productId }
    };
    if (userId)
      await axios(config)
        .then(() => {
          dispatch(getFavorites(userId));
          console.log("product added successfully!");
        })
        .catch((error) => {
          console.log(error);
        });

    return dispatch({
      type: ADD_FAVORITES,
      payload: productId,
    });

  };
};

export const deleteFavorite = (productId, userId) => {
  return async (dispatch) => {

    const config = {
      method: 'delete',
      url: '/favorites',
      headers: { 'Content-Type': 'application/json' },
      data: { userId, productId }
    }
    if (userId)
      await axios(config)
        .then(() => {
          dispatch(getFavorites(userId));
          console.log("product removed successfully!");
        })
        .catch((error) => {
          console.log(error);
        });

    return dispatch({
      type: DELETE_FAVORITES,
      payload: productId,
    });
  };

};
