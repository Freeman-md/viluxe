import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import UserProfileLayout from "./layouts/UserProfile";
import HomePage, { loader as homeLoader } from "./pages/Home";
import ProductPage, { loader as productLoader } from "./pages/Product";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import OrdersPage, { loader as getOrdersLoader } from "./pages/user/Orders";
import BillingAddressListPage, { loader as getBillingAddressesLoader } from "./pages/user/billing-addresses/index";
import BillingAddressCreatePage, { action as createBillingAddressAction } from "./pages/user/billing-addresses/create";
import BillingAddressEditPage, { loader as getBillingAddressLoader, action as updateBillingAddressAction } from "./pages/user/billing-addresses/edit";
import ErrorPage from "./pages/Error";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

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
                        element: <OrdersPage />,
                        loader: getOrdersLoader
                    },
                    {
                        path: 'billing-addresses/',
                        children: [
                            {
                                index: true,
                                loader: getBillingAddressesLoader,
                                element: <BillingAddressListPage />,
                            },
                            {
                                path: 'create',
                                element: <BillingAddressCreatePage />,
                                action: createBillingAddressAction,
                            },
                            {
                                path: ':id/edit',
                                loader: getBillingAddressLoader,
                                action: updateBillingAddressAction,
                                element: <BillingAddressEditPage />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/checkout',
                element: <Checkout />,
                loader: getBillingAddressesLoader
            },
            {
                path: '/payment',
                element: <Payment />,
            }
        ]
    }
])

export default router