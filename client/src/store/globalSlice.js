import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actualPage: 1,
    positionScroll: 0,

    filters: {
        orderBy: "priceAsc",
        searchName: "",
        category: null,
        brand: null,
    },
    categories: [],
    brands: [],
    allCart: [],
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setPosition: (state, { payload }) => {
            state.positionScroll = payload;
        },
        actualPage: (state, { payload }) => {
            state.actualPage = payload;
        },


        setFilters: (state, { payload }) => {
            state.filters = { ...state.filters, ...payload };
        },
        saveCategories: (state, { payload }) => {
            state.categories = payload;
        },
        saveBrands: (state, { payload }) => {
            state.brands = payload;
        },




        // * necesita un item de producto. {name:"sd"...}
        addToCart: (state, { payload }) => {
            state.filters.allCart = [...state.filters.allCart, payload];
        }


    }
})

// Action creators are generated for each case reducer function
export const { setPosition, actualPage, setFilters, saveCategories, saveBrands, addToCart } = globalSlice.actions