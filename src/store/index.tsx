import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/products-slice";
import shoppingSlice from "./shopping/shopping-slice";
import userSlice from "./user/user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productsSlice.reducer,
        shopping: shoppingSlice.reducer
    }
})

export default store