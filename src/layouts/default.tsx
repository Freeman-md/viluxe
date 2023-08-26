import { Outlet } from "react-router-dom"

import { ReactComponent as Logo } from '../assets/svgs/logo.svg'
import { ReactComponent as ShoppingCart } from '../assets/svgs/shopping-cart.svg'
import { ReactComponent as Heart } from '../assets/svgs/heart.svg'
import { ReactComponent as UserCircle } from '../assets/svgs/user-circle.svg'

const DefaultLayout: React.FC = () => {
    return (
        <>
            <header className='container flex items-center justify-between py-4'>
                <Logo className='w-32 sm:w-44' />

                <div className="flex space-x-4 items-center">
                    <Heart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                    <ShoppingCart className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                    <UserCircle className="w-7 cursor-pointer transition duration-200 hover:text-primary" />
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout