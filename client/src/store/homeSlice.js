import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listNew: [],
    listPopular: [],
    listOffers: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        loadListProducts: (state, { payload }) => {
            state.listNew = payload.listNew;
            state.listPopular = payload.listPopular;
            state.listOffers = payload.listOffers;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadListProducts } = homeSlice.actions
