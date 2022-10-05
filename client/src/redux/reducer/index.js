import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  SORT_PRODUCTS,
  GET_PRODUCT_ID,
  GET_PRODUCT_BY_NAME,
  RESET_DETAIL,
  FILTER,
  RESET,
  GET_USER_BY_EMAIL,
  POST_CREATE_PRODUCT,
  PUT_EDIT_PRODUCT,
  SEARCH_PRODUCT_DASHBOARD,
  GET_PRODUCT_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_FAVORITES,
  ADD_FAVORITES,
  DELETE_FAVORITES,
  GET_USERS,
  GET_USER_ID,
  DELETE_USER,
  CHANGE_USER_TYPE,
  ADD_RATING,
  GET_ORDER_ID,
  // CART
  GET_CART_BY_USERID,
  ADD_TO_CART,
  PATCH_QUANTITY,
  CLEAR_CART,
  ADD_LOCAL_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/actionTypes";

// ------------LocalStorage constants------------

let cartFromLocalStorage = JSON.parse(localStorage.getItem('cartlocal'));
if (!cartFromLocalStorage) {
  cartFromLocalStorage = [];
}

let userLogged = JSON.parse(localStorage.getItem("userLogged"));

let favoritesFromLocalStorage = JSON.parse(localStorage.getItem("favorites"));
if (!favoritesFromLocalStorage) {
  favoritesFromLocalStorage = [];
}

// ------------INITIAL STATE------------
const initialState = {
  products: [],
  allProducts: [], // copia con todos los productos
  listNewArrivals: [],
  listPopular: [],
  listOffers: [],
  brands: [],
  categories: [],
  productDetail: {},
  productType: [],
  errorSearch: "",
  filteredProducts: [],
  filterSelect: {
    brands: "all",
    categories: "all",
    priceMin: "",
    priceMax: "",
  },
  sortSelect: "",
  favorites: favoritesFromLocalStorage,
  userId: {},
  userLogged: {},
  searchResults: [],
  dashboardProducts: [],
  orders: [],
  productComments: [],
  users: [],
  userOrder: [],
  // Variables de Cart
  cartlocal: cartFromLocalStorage,
  cart: {},
  cartByUserId: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET PRODUCTS */
    case GET_PRODUCTS:

    // --- ADDS FINAL PRICE
    let products = action.payload
    let completeProductList = products?.map(p => {
      p.totalPrice = p.price - (p.price * p.discount / 100)
      return p
    })

      // --- Filter Stock 0 y Disabled
    let stockedProducts = action.payload?.filter(p => p.stock > 0 && p.disable === false)

      let sortAZ = (a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        else return 0;
      };
      // get brands

      let brands = stockedProducts?.map((e) => e.brand);

      let uniqueBrands = brands.filter((v, i, a) => a.indexOf(v) === i);
      uniqueBrands = uniqueBrands.sort(sortAZ);

      // get categories
      let categories = stockedProducts.map((e) => e.category);
      let uniqueCategories = categories.filter((v, i, a) => a.indexOf(v) === i);
      uniqueCategories = uniqueCategories.sort(sortAZ);

      // get arrays for Home
      let sortOffers;
      let sortPopular;
      let sortNew;

      /* Get Offers array */
      let discountedProducts = stockedProducts?.filter((product) => {
        return product.discount >= 1;
      });

      if (discountedProducts.length) {
        sortOffers = discountedProducts?.sort((a, b) => {
          if (a.discount < b.discount) return 1;
          if (a.discount > b.discount) return -1;
          else return 0;
        });
      } else {
        sortOffers = stockedProducts?.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          else return 0;
        });
      }

      /* Get Popular array */
      sortPopular = stockedProducts?.filter(p => p.rank >= 4)
      sortPopular = sortPopular?.sort((a, b) => {
          if (a.rank < b.rank) return 1;
          if (a.rank > b.rank) return -1;
          else return 0;
        });

      /* Get Newest array */
      sortNew = stockedProducts?.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        else return 0;
      });

      return {
        ...state,
        products: stockedProducts,
        allProducts: stockedProducts,
        dashboardProducts: completeProductList, // Recibe todos los products con/sin stock
        brands: uniqueBrands,
        categories: uniqueCategories,
        listOffers: sortOffers,
        listPopular: sortPopular,
        listNewArrivals: sortNew,
      };

    case RESET:
      return {
        ...state,
        products: [],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
      }

    /* GET DETAIL */
    case GET_PRODUCT_ID:
      let filterType = state.products?.filter((product) => {
        return (
          product.category === action.payload.category &&
          product.id !== action.payload.id
        );
      });

    let productDetail = action.payload
    productDetail.totalPrice = productDetail.price - (productDetail.price * productDetail.discount / 100)
  
      return {
        ...state,
        productDetail: productDetail,
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
     let addedPrice = action.payload?.map(p => {
        p.totalPrice = p.price - (p.price * p.discount / 100)
        return p
      })
      let stockedProducts = addedPrice?.filter(p => p.stock > 0 && p.disable === false)
      if (stockedProducts.length === 0) {
        return {
          ...state,
          error: "Product Not Found",
          searchTerm: action.searchTerm,
        };
      } else {
        return {
          ...state,
          error: "",
          searchTerm: action.searchTerm,
          searchResults: stockedProducts,
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
    case SORT_PRODUCTS:
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
          sortSelect: action.payload,
        };
      }
      return {
        ...state,
        filteredProducts: state.filteredProducts?.sort(sorter),
        products: state.allProducts.sort(sorter),
        sortSelect: action.payload,
      };

    case FILTER:
      let filter = action.payload;
      let listAll = state.allProducts;

      let filteredList = [];
      if (
        filter.brands === "all" &&
        filter.categories === "all" &&
        !filter.priceMin.length &&
        !filter.priceMax.length &&
        filter.offers === false
      ) {
        return {
          ...state,
          filteredProducts: false,
          filterSelect: {
            brands: "all",
            categories: "all",
            priceMin: "",
            priceMax: "",
            offers: false,
          },
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

        if (filter.offers) {
          if (filteredList.length) {
            filteredList = filteredList.filter(
              (e) => e.discount >= 1
            );
          } else {
            filteredList = listAll.filter(
              (e) => e.discount >= 1
            );
          }
          checker();
        }

        if (empty === true) {
          return {
            ...state,
            filteredProducts: ["notfound"],
            filterSelect: {
              brands: "all",
              categories: "all",
              priceMin: "",
              priceMax: "",
              offers: false,
            },
          };
        } else {
          return {
            ...state,
            filteredProducts: filteredList,
            filterSelect: filter,
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

      // Lo agrego al carrito local
    case ADD_LOCAL_CART:
        return {
        ...state,
        cartlocal: [...state.cartlocal, action.payload],
      };

    // Lo agrego al carrito del back
    case ADD_TO_CART:
      return {
        ...state,
      };

    // Me traigo el carrito del back
    case GET_CART_BY_USERID:
      return {
        ...state,
        cartByUserId: action.payload,
      };

    // Modifico la cantidad de un producto
    case PATCH_QUANTITY:
      let copy = state.cartlocal;
      let foundProductIndex = copy.findIndex(item => item.id === action.payload.productID);
      copy[foundProductIndex].amount=action.payload.newQuantity;
      localStorage.setItem('cartlocal', JSON.stringify(copy))
      return {
        ...state,
        cartlocal: copy,
      };

    // Borro un producto del Cart
    case REMOVE_PRODUCT_FROM_CART:
      let eliminado = state.cartlocal.filter( (e) => e.id !== action.payload.productID)
      localStorage.setItem('cartlocal', JSON.stringify(eliminado));
      return {
        ...state,
        cartlocal: eliminado,
      };

    // Limpio el Carrito
    case CLEAR_CART:
      localStorage.setItem('cartlocal', JSON.stringify([]));
      return {
        ...state,
        cartlocal:[],
      };


    // COMMENTS   //
    case ADD_COMMENT:
      return {
        ...state,
      };

    case GET_PRODUCT_COMMENTS:
      //console.log(action.payload, 'action')
      return {
        ...state,
        productComments: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case ADD_FAVORITES:
      const exists = state.favorites
        ? state.favorites.filter((id) => id === action.payload).length
        : [];
      if (exists)
        return {
          ...state,
        };
      else
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };

    case DELETE_FAVORITES:
      const result = state.favorites.length
        ? state.favorites.filter((id) => id !== action.payload)
        : state.favorites;
      return {
        ...state,
        favorites: result,
      };

    /*  USERS   */
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER_ID:
      return {
        ...state,
        //check, maybe use userLogged??
        userId: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
      };

    case CHANGE_USER_TYPE:
      return {
        ...state,
      };

    case ADD_RATING:
      return {
        ...state,
      };

      case GET_ORDER_ID:
      return  {...state,
        userOrder: action.payload
      }


    /*   DEFAULT   */
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
