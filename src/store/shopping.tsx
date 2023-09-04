import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

type ShoppingSliceStateProps = {
    cart: Product[],
    wishlist: Product[]
}

const initialState: ShoppingSliceStateProps = {
    cart: [],
    wishlist: []
}

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addItemToCart(state, { payload }) {
            state.cart = [...state.cart, payload.item]
        },
        removeItemFromCart(state, { payload }) {
            const itemIdToRemove = payload.item.id;
            state.cart = state.cart.filter(item => item.id !== itemIdToRemove)
        },
        addItemToWishlist(state, { payload }) {
            state.wishlist = [...state.wishlist, payload.item]
        },
        removeItemFromWishlist(state, { payload }) {
            const itemIdToRemove = payload.item.id;
            state.wishlist = state.wishlist.filter(item => item.id !== itemIdToRemove)
        },
    }
})

const { addItemToCart, removeItemFromCart, addItemToWishlist, removeItemFromWishlist } = shoppingSlice.actions

export default shoppingSlice