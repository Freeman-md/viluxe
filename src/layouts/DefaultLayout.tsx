import { NavLink, Outlet } from "react-router-dom"

import { ReactComponent as Logo } from '../assets/svgs/logo.svg'
import { ReactComponent as ShoppingCart } from '../assets/svgs/shopping-cart.svg'
import { ReactComponent as Heart } from '../assets/svgs/heart.svg'
import { ReactComponent as UserCircle } from '../assets/svgs/user-circle.svg'
import { useAppSelector } from "../hooks/useReduxHooks"
import Badge, { BadgeType } from "../components/Badge"

const DefaultLayout = () => {
    const shoppingState = useAppSelector(state => state.shopping)

    const noOfItemsInCart = shoppingState.cart.length
    const noOfItemsInWishlist = shoppingState.wishlist.length

    return (
        <>
            <header className='fixed top-0 z-10 w-full'>
                <div className="bg-white container flex items-center justify-between py-4">

                    <NavLink to="/">
                        <Logo className='w-32 sm:w-44' />
                    </NavLink>

                    <div className="flex space-x-4 items-center">
                        <NavLink to="/user/orders" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-primary' : ''}`}>
                            <UserCircle className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                            <span>Account</span>
                        </NavLink>
                        <NavLink to="/wishlist" className={({ isActive }) => `relative flex flex-col items-center ${isActive ? 'text-primary' : ''}`}>
                            <Heart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                            <span>Wishlist</span>

                            <Badge type={BadgeType.CIRCULAR} classes="absolute -top-2 right-1 !w-5 !h-5 !text-sm">
                                { noOfItemsInWishlist }
                            </Badge>
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) => `relative flex flex-col items-center ${isActive ? 'text-primary' : ''}`}>
                            <ShoppingCart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                            <span>Trolley</span>

                            <Badge type={BadgeType.CIRCULAR} classes="absolute -top-2 right-1 !w-5 !h-5 !text-sm">
                                { noOfItemsInCart }
                            </Badge>
                        </NavLink>
                    </div>
                </div>
            </header>

            <main className="mt-14 sm:mt-20">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout