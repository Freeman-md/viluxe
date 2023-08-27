import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import ProductPage from "./pages/Product";
import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";

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
            }
        ]
    }
])

export default router