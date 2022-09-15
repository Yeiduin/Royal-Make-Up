import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listProducts: [],
    listPopular: [],
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        loadListProducts: (state, { payload }) => {

            state.listProducts = payload.list;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadListProducts } = homeSlice.actions
