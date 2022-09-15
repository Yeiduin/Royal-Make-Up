import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: {
        image: "",
        name: "",
        rating: 0,
        price: 0,
        colors: [],
        description: "",
    }
    
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        loadProducts: (state, { payload }) => {
            state.product = payload
        }
    }
})

// Action creators are generated for each case reducer function holis
export const { loadProducts } = detailsSlice.actions
