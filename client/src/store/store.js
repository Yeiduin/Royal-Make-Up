import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './appSlice'
import { detailsSlice } from './detailsSlice'
import { globalSlice } from './globalSlice'
import { homeSlice } from './homeSlice'
import { landingPageSlice } from './landingPageSlice'
import { listProductsSlice } from './listProductsSlice'



export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    home: homeSlice.reducer,
    details: detailsSlice.reducer,
    global: globalSlice.reducer,
    landingPage: landingPageSlice.reducer,
    listProducts: listProductsSlice.reducer,
  },
})