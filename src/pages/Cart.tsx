import React from 'react';
import { Product } from '../types';


type CartItemProps = {
  product: Product;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <div className="flex items-center space-x-4 justify-between p-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.category}</p>
        </div>
      </div>
      <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
      <button
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  );
};

const CartPage: React.FC = () => {
    const cartItems: Product[] = Array.from({ length: 7 }).map((_, index) => ({
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
      }));
      
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
            <div className="sticky top-[4.2rem] sm:top-20 flex items-center justify-between bg-white py-2">
                <h2 className='text-xl font-medium'>{cartItems.length} items</h2>
            <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Checkout
            </button>
          </div>
          {cartItems.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          
        </div>
      )}
    </div>
  );
};

export default CartPage;
