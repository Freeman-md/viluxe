import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/default";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";

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
        ]
    }
])

export default router