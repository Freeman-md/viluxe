import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/products-slice";
import shoppingSlice from "./shopping";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        shopping: shoppingSlice.reducer
    }
})

export default store