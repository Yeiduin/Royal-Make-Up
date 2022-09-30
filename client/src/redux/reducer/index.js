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
  GET_USER_BY_EMAIL,
  POST_CREATE_PRODUCT,
  PUT_EDIT_PRODUCT,
  SEARCH_PRODUCT_DASHBOARD,
  GET_CART_BY_USERID,
} from "../actions/actionTypes";

// ------------LocalStorage constants------------

let summaryFromLocalStorage = JSON.parse(localStorage.getItem('summary'));
if (!summaryFromLocalStorage) {
	summaryFromLocalStorage = 0;
};

let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
if (!cartFromLocalStorage) {
	cartFromLocalStorage = [];
}

let userIdFromLocalStorage = JSON.parse(localStorage.getItem('userID'));
if (!cartFromLocalStorage) {
	cartFromLocalStorage = "";
}

// ------------INITIAL STATE------------
const initialState = {
  products: [],
  allProducts: [], // copia con todos los productos
  listNewArrivals: [],
  listPopular: [],
  listOffers: [],
  productDetail: {},
  productType: [],
  errorSearch: "",
  filteredProducts: [],
  defaultSort: false,
  defaultFilter: false,
  cart: cartFromLocalStorage,
  summary: summaryFromLocalStorage,
  userId: userIdFromLocalStorage,
  userLogged: {},
  searchResults: [],
  dashboardProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET PRODUCTS */
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        dashboardProducts: action.payload
      };

    case RESET:
      return {
        ...state,
        products: [],
      };
    case GET_HOME_PRODUCTS:
      let sortOffers;
      let sortPopular;
      let sortNew;
      let products = action.payload;

      /* Get Offers array */
      let discountedProducts = products?.filter((product) => {
        return product.discount >= 1;
      });

      if (discountedProducts.length) {
        sortOffers = discountedProducts?.sort((a, b) => {
          if (a.discount < b.discount) return 1;
          if (a.discount > b.discount) return -1;
          else return 0;
        });
      } else {
        sortOffers = products.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          else return 0;
        });
      }

      /* Get Popular array */
      sortPopular = products.sort((a, b) => {
        if (a.rank < b.rank) return 1;
        if (a.rank > b.rank) return -1;
        else return 0;
      });

      /* Get Newest array */
      sortNew = products.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        else return 0;
      });

      // sortOffers.splice(12);
      // sortPopular.splice(12);
      // sortNew.splice(12);

      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        listOffers: sortOffers,
        listPopular: sortPopular,
        listNewArrivals: sortNew,
      };

    /* GET DETAIL */
    case GET_PRODUCT_ID:
      let filterType = state.products?.filter((product) => {
        return (
          product.category === action.payload.category &&
          product.id !== action.payload.id
        );
      });
      return {
        ...state,
        productDetail: action.payload,
        productType: filterType,
      };

    case RESET_DETAIL:
      return {
        ...state,
        productDetail: {},
        productType: [],
      };

    /* SEARCH */
    case GET_PRODUCT_BY_NAME: {
      if (action.payload.length === 0) {
        return {
          ...state,
          error: "Product Not Found",
          searchTerm: action.searchTerm,
        };
      } else {
        return {
          ...state,
          // products: action.payload,
          error: "",
          searchTerm: action.searchTerm,
          searchResults: action.payload,
        };
      }
    }

    case SEARCH_PRODUCT_DASHBOARD: {
      if (action.payload.length === 0) {
        return {
          ...state,
          error: "Product Not Found",
  };
      } else {
        return {
          ...state,
          dashboardProducts: action.payload,
          error: "",
        };
      }
    }

    /* SORT y FILTER */
    case SET_DEFAULT_SORT:
      return {
        ...state,
        defaultSort: action.payload,
      };

    case SET_DEFAULT_FILTER:
      return {
        ...state,
        defaultFilter: action.payload,
      };

    case SORT_PRODUCTS:
      if (action.payload === "none") {
        return {
          ...state,
          products: state.allProducts,
        };
      }
      let sorter;
      switch (action.payload) {
        case "A-Z":
          sorter = (a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            else return 0;
          };
          break;
        case "Z-A":
          sorter = (a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            else return 0;
          };
          break;
        case "priceDesc":
          sorter = (a, b) => {
            if (
              a.price - (a.price * a.discount) / 100 <
              b.price - (b.price * b.discount) / 100
            )
              return 1;
            if (
              a.price - (a.price * a.discount) / 100 >
              b.price - (b.price * b.discount) / 100
            )
              return -1;
            else return 0;
          };
          break;
        case "priceAsc":
          sorter = (a, b) => {
            if (
              a.price - (a.price * a.discount) / 100 <
              b.price - (b.price * b.discount) / 100
            )
              return -1;
            if (
              a.price - (a.price * a.discount) / 100 >
              b.price - (b.price * b.discount) / 100
            )
              return 1;
            else return 0;
          };
          break;
        case "newest":
          sorter = (a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            else return 0;
          };
          break;
        case "popular":
          sorter = (a, b) => {
            if (a.rank < b.rank) return 1;
            if (a.rank > b.rank) return -1;
            else return 0;
          };
          break;
        case "offers":
          sorter = (a, b) => {
            if (a.discount < b.discount) return 1;
            if (a.discount > b.discount) return -1;
            else return 0;
          };
          break;

        default:
          break;
      }

      if (state.filteredProducts === false) {
        return {
          ...state,
          filteredProducts: state.allProducts.sort(sorter),
          products: state.allProducts.sort(sorter),
        };
      }
      return {
        ...state,
        filteredProducts: state.filteredProducts?.sort(sorter),
        products: state.allProducts.sort(sorter),
      };

    case FILTER:
      let filter = action.payload;
      let listAll = state.allProducts;

      let filteredList = [];
      if (
        filter.brands === "all" &&
        filter.categories === "all" &&
        !filter.priceMin.length &&
        !filter.priceMax.length
      ) {
        return {
          ...state,
          filteredProducts: false,
        };
      } else {
        let empty = false;

        const checker = () => {
          if (filteredList.length === 0) empty = true;
        };

        if (filter.brands !== "all") {
          if (filteredList.length) {
            filteredList = filteredList.filter(
              (e) => e.brand === filter.brands
            );
          } else {
            filteredList = listAll.filter((e) => e.brand === filter.brands);
          }
          checker();
        }
        if (filter.categories !== "all") {
          if (filteredList.length) {
            filteredList = filteredList.filter(
              (e) => e.category === filter.categories
            );
          } else {
            filteredList = listAll.filter(
              (e) => e.category === filter.categories
            );
          }
          checker();
        }

        if (filter.priceMin.length) {
          if (filteredList.length) {
            filteredList = filteredList.filter(
              (e) => e.price - (e.price * e.discount) / 100 >= filter.priceMin
            );
          } else {
            filteredList = listAll.filter(
              (e) => e.price - (e.price * e.discount) / 100 >= filter.priceMin
            );
          }
          checker();
        }

        if (filter.priceMax.length) {
          if (filteredList.length) {
            filteredList = filteredList.filter(
              (e) => e.price - (e.price * e.discount) / 100 <= filter.priceMax
            );
          } else {
            filteredList = listAll.filter(
              (e) => e.price - (e.price * e.discount) / 100 <= filter.priceMax
            );
          }
          checker();
        }

        if (empty === true) {
          return {
            ...state,
            filteredProducts: ["notfound"],
          };
        } else {
          return {
            ...state,
            filteredProducts: filteredList,
          };
        }
      }

    /* USERLOGGED */
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        userLogged: action.payload,
      };
    /*  POST CREATE PRODUCT*/
    case POST_CREATE_PRODUCT:
      return { ...state };

      /*  PUT_EDIT_PRODUCT*/
      case PUT_EDIT_PRODUCT:
        return { ...state };

      /*   CART   */
    case ADD_TO_CART:
      let exist = state.cart.filter((el) => el.id === action.payload);
			if (exist.length === 1) return state;
			let newItem = state.allProducts.find((p) => p.id == action.payload);
			let sum = newItem.price;
      console.log(newItem)
			return {
				...state,
				cart: [...state.cart, { ...newItem }],
				summary: state.summary + sum,
			};

    case GET_CART_BY_USERID:
      return {
        ...state,
        cartByUserId: action.payload
      }

    case REMOVE_ONE_FROM_CART:
      return {
        ...state,
      };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
      };
    
    case CLEAR_CART:
      return {
        ...state,
      };


    /*   DEFAULT   */
    default:
      return {
        ...state,
      };
  }

  // ---
};

export default rootReducer;
