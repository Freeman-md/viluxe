import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

type ShoppingSliceStateProps = {
  cart: Product[],
  wishlist: Product[],
  stripe: {
    clientSecret: string,
  }
}

const initialState: ShoppingSliceStateProps = {
  cart: [],
  wishlist: [],
  stripe: {
    clientSecret: ''
  }
}

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    toggleItemInCart(state, { payload }) {
      const itemIdToToggle = payload.item.id;
      const itemIndex = state.cart.findIndex(item => item.id === itemIdToToggle);

      if (itemIndex !== -1) {
        // Item is in the cart, so remove it
        state.cart.splice(itemIndex, 1);
      } else {
        // Item is not in the cart, so add it
        state.cart = [...state.cart, payload.item];
      }
    },
    toggleItemInWishlist(state, { payload }) {
      const itemIdToToggle = payload.item.id;
      const itemIndex = state.wishlist.findIndex(item => item.id === itemIdToToggle);

      if (itemIndex !== -1) {
        // Item is in the wishlist, so remove it
        state.wishlist.splice(itemIndex, 1);
      } else {
        // Item is not in the wishlist, so add it
        state.wishlist = [...state.wishlist, payload.item];
      }
    },
    setClientSecret(state, { payload }) {
      state.stripe.clientSecret = payload.clientSecret
    }
  }
})

export const { toggleItemInCart, toggleItemInWishlist, setClientSecret } = shoppingSlice.actions

export default shoppingSlice