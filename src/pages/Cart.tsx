import React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { toggleItemInCart } from '../store/shopping';
import Empty from '../components/Empty';

type CartItemProps = {
  product: Product;
  onRemove: () => void; // No need to pass the product as an argument here
};

const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 justify-between p-4 border-b border-gray-300">
      <Link to={`/products/${product.id}`} className="flex items-center space-x-4">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.category}</p>
        </div>
      </Link>
      <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
      <button
        className="text-red-600 hover:text-red-800"
        onClick={onRemove} // Use the provided onRemove function directly
      >
        Remove
      </button>
    </div>
  );
};

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.shopping.cart);

  const removeItemFromCartHandler = (product: Product) => {
    // Dispatch an action to remove the item from the cart
    dispatch(toggleItemInCart({ item: product }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <Empty text='Your cart is empty!' />
      ) : (
        <div className="space-y-4">
          <div className="sticky top-[4.2rem] sm:top-20 flex items-center justify-between bg-white py-2">
            <h2 className="text-xl font-medium">{cartItems.length} items</h2>
            <Link to="/checkout" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Checkout
            </Link>
          </div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              onRemove={() => removeItemFromCartHandler(item)} // Bind the product to the handler here
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
