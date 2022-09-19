import { configureStore } from '@reduxjs/toolkit'
import { detailsSlice } from './detailsSlice'
import { globalSlice } from './globalSlice'
import { homeSlice } from './homeSlice'
import { listProductsSlice } from './listProductsSlice'
import { createProductSlice } from './createProducSlice'



export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    home: homeSlice.reducer,
    listProducts: listProductsSlice.reducer,
    details: detailsSlice.reducer,
    createProduct: createProductSlice.reducer
  },
})