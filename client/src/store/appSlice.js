import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    details: {},
    actualPage: 1,
    next: false,
    errorMessage: null,
    status: "none",

}

export const appSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loadPagination: (state, { payload }) => {
            state = { ...state, ...payload }

            state.list = payload.list;

        },
        itemDetalis: (state, { payload }) => {
            state.details = payload;
        },
        actualPage: (state, { payload }) => {
            state.actualPage = payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadPagination, itemDetalis, actualPage } = appSlice.actions


