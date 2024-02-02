import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from "./slice/snackbarSlice";
import productReducer from "./slice/productSlice";

const store= configureStore({
  reducer: {
    snackbar:snackbarReducer,
    product: productReducer,
  }
})



export default store;