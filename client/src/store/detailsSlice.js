import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    details: {},
    actualPage: 1,
    next: false,
    errorMessage: null,
    status: 0,

}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        loadProducts: (state, { payload }) => {
            state.details = payload.details;
            state.status = payload.status;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadProducts } = detailsSlice.actions
