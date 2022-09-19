import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: {
        image: "",
        name: "",
        rating: 0,
        price: 0,
        colors: [],
        description: "",
        //added here
    },
    productType: []
    
    
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        loadProducts: (state, { payload }) => {
            state.product = payload
        },
        loadType: (state, { payload }) => {
            state.productType = payload.productType
            console.log(state.productType)
        } 

    }
})

// Action creators are generated for each case reducer function holis
export const { loadProducts, loadType} = detailsSlice.actions
