import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Order from '../../models/order';
import { Product } from '../../models/product';

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
            <p className="text-gray-600 mb-2">Date: {order.date.toISOString()}</p>
            {showProducts && (
                <ul className="list-disc list-inside space-y-2">
                    {order.items.map((item, index) => (
                        <Link to="/products/1" key={item.id} className="flex items-center space-x-4">
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
    const orders: Order[] = []

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