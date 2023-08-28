import { NavLink, Outlet } from "react-router-dom"

const links = [
    {
        text: 'Orders',
        path: 'orders'
    },
    {
        text: 'Billing Address',
        path: 'billing-address'
    }
]

const UserProfileLayout = () => {
    return (
        <div className="container py-8 space-y-4">
            <section id="profile-information" className="flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:items-start sm:space-x-10">
                <div className="w-40 h-40 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80" alt="Franklin Daemon" className="object-contain w-full h-full" />
                </div>

                <div className="inline-flex flex-col items-center sm:items-start space-y-4">
                    <h1 className="text-3xl font-semibold">Franklin Daemon</h1>
                    <div>
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Verified</span>
                    </div>
                    <div>
                        <button className="btn btn-outline">Edit Profile</button>
                    </div>

                </div>
            </section>

            <section id="tabs-section">
                <div className="flex space-x-8 justify-center w-full overflow-y-hidden overflow-x-scroll">
                    {
                        links.map((link, index) => <NavLink key={index} to={link.path}
                        >

                            {({ isActive, isPending }) => (
                                <div className="flex flex-col items-center space-y-2 w-full">
                                    <span className={`${isActive ? 'font-semibold' : 'hover:font-medium transition duration-200'} text-xl`}>{link.text}</span>
                                    { isActive && <div className="w-6 h-0.5 bg-black"></div> }
                                </div>
                            )}
                        </NavLink>)
                    }
                </div>
            </section>

            <section id="page-information">
                <Outlet />
            </section>
        </div>
    )
}

export default UserProfileLayout