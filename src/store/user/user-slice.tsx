import { createSlice } from "@reduxjs/toolkit";
import BillingAddress from "../../models/billing-address";

type InitialStateProps = {
    billingAddresses: BillingAddress[]
}

const initialState: InitialStateProps = {
    billingAddresses: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBillingAddresses(state, { payload }) {
            state.billingAddresses = payload.billingAddresses
        }
    }
})

export const { setBillingAddresses } = userSlice.actions

export default userSlice