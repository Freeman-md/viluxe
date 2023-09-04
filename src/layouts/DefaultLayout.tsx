import { NavLink, Outlet } from "react-router-dom"

import { ReactComponent as Logo } from '../assets/svgs/logo.svg'
import { ReactComponent as ShoppingCart } from '../assets/svgs/shopping-cart.svg'
import { ReactComponent as Heart } from '../assets/svgs/heart.svg'
import { ReactComponent as UserCircle } from '../assets/svgs/user-circle.svg'

const DefaultLayout = () => {
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
                        <NavLink to="/wishlist" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-primary' : ''}`}>
                            <Heart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                            <span>Wishlist</span>
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-primary' : ''}`}>
                            <ShoppingCart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                            <span>Trolley</span>
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