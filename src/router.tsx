import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import UserProfileLayout from "./layouts/UserProfile";
import HomePage, { loader as homeLoader } from "./pages/Home";
import ProductPage, { loader as productLoader } from "./pages/Product";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import OrdersPage from "./pages/user/Orders";
import BillingAddressPage from "./pages/user/BillingAddress";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                loader: homeLoader
            },
            {
                path: '/products/:id',
                element: <ProductPage />,
                loader: productLoader
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
                        element: <OrdersPage />
                    },
                    {
                        path: 'billing-address',
                        element: <BillingAddressPage />
                    }
                ]
            }
        ]
    }
])

export default router