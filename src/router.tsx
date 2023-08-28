import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/Default";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import UserProfileLayout from "./layouts/UserProfile";
import Orders from "./pages/user/Orders";
import BillingAddress from "./pages/user/BillingAddress";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/products/:id',
                element: <ProductPage />
            },
            {
                path: '/cart',
                element: <CartPage />
            },
            {
                path: '/wishlist',
                element: <WishlistPage />
            },
            {
                path: '/user/',
                element: <UserProfileLayout />,
                children: [
                    {
                        path: 'orders',
                        element: <Orders />
                    },
                    {
                        path: 'billing-address',
                        element: <BillingAddress />
                    }
                ]
            }
        ]
    }
])

export default router