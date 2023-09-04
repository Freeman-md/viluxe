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
                        <NavLink to="/wishlist">
                            <Heart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                        </NavLink>
                        <NavLink to="/cart">
                            <ShoppingCart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                        </NavLink>
                        <NavLink to="/user/orders">
                            <UserCircle className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
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