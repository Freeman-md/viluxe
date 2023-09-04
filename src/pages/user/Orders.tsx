import React, { useState } from 'react';
import { Order } from '../../types';
import { Link } from 'react-router-dom';

type OrderCardProps = {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [showProducts, setShowProducts] = useState(false);

    const toggleProducts = () => {
        setShowProducts((prevState) => !prevState);
    };

    return (
        <div className="border p-4 rounded-md shadow-md">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <button
                    className="text-primary focus:outline-none"
                    onClick={toggleProducts}
                >
                    {showProducts ? '▲' : '▼'}
                </button>
            </div>
            <p className="text-gray-600 mb-2">Date: {order.date}</p>
            {showProducts && (
                <ul className="list-disc list-inside space-y-2">
                    {order.items.map((item, index) => (
                        <Link to="/products/1" key={index} className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-contain"
                            />
                            <span>{item.title} - ${item.price.toFixed(2)}</span>
                        </Link>
                    ))}
                </ul>
            )}
            <div className="mt-2">
                <span className="text-lg font-semibold text-primary">
                    Total: ${order.total.toFixed(2)}
                </span>
            </div>
        </div>
    );
};
const OrdersPage: React.FC = () => {
    const orders = [
        {
            id: 1,
            date: '2023-08-25',
            items: Array.from({ length: 2 }).map((_, index) => ({
                id: index + 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description:
                    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                rating: {
                    rate: 3.9,
                    count: 120,
                },
            })),
            total: 44.98,
        },
        {
            id: 2,
            date: '2023-08-23',
            items: Array.from({ length: 3 }).map((_, index) => ({
                id: index + 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description:
                    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                rating: {
                    rate: 3.9,
                    count: 120,
                },
            })),
            total: 32.97,
        },
    ]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage