import { configureStore } from '@reduxjs/toolkit'
import { detailsSlice } from './detailsSlice'
import { globalSlice } from './globalSlice'
import { homeSlice } from './homeSlice'
import { listProductsSlice } from './listProductsSlice'



export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    home: homeSlice.reducer,
    listProducts: listProductsSlice.reducer,
    details: detailsSlice.reducer,
  },
})