import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

type ProductsSliceStateProps = {
    products: Product[];
    categories: Array<string>;
}

const initialState : ProductsSliceStateProps = {
    products: [],
    categories: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload.products
        },
        setCategories: (state, { payload }) => {
            state.categories = payload.categories
        }
    }
})

export const { setProducts, setCategories } = productsSlice.actions

export default productsSlice