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

    }
})

// Action creators are generated for each case reducer function
export const { loadPagination, actualPage, setFilterOrederBy, setFilterCategory, searchByName } = globalSlice.actions