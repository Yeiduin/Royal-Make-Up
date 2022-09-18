import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listPage: [],
    nextPageExists: true,
}

export const listProductsSlice = createSlice({
    name: 'listProducts',
    initialState,
    reducers: {
        loadPage: (state, { payload }) => {

            state.listPage = payload.listPage;
            state.nextPageExists = payload.nextPageExists;
        }
    }
})



// Action creators are generated for each case reducer function
export const { loadPage } = listProductsSlice.actions
