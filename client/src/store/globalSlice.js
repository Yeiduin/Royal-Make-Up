import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actualPage: 1,
    next: false,
    errorMessage: null,
    status: "ddd",
    filters: {
        orderBy: "",
        searchName: "",
        category: "",
        searchBrand: ""
    }
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        loadPagination: (state, { payload }) => {

            state.list = payload.list;
            state.next = payload.next;
        },
        actualPage: (state, { payload }) => {
            state.actualPage = payload;
        },
        setFilterOrederBy: (state, { payload }) => {
            state.filters.orderBy = payload;
        },
        setFilterCategory: (state, { payload }) => {
            state.filters.category = payload;
        },
        searchByName: (state, { payload }) => {
            state.filters.searchName = payload;
            console.log(state.searchName)
        },
        searchByBrand: (state, { payload }) => {
            state.filters.searchBrand= payload;
            console.log(state.searchBrand)
        },

    }
})

// Action creators are generated for each case reducer function
export const { loadPagination, actualPage, setFilterOrederBy, setFilterCategory, searchByName, searchByBrand } = globalSlice.actions