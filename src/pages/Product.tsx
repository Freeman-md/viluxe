import React, { useState } from 'react';
import { Product } from '../types';
import RatingStars from '../components/RatingStars';
import FavouriteButton from '../components/FavouriteButton';

export const ProductPage: React.FC = () => {
    const [isFavourite, setIsFavourite] = useState(false)

    const { title, category, price, image, description, rating }: Product = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    }

    const toggleFavouriteHandler = () => {
        setIsFavourite(!isFavourite);
    }

    const handleAddToCart = () => {
        // Implement your add to cart logic here
        console.log(`Added "${title}" to the cart`);
      };

    return (
        <div className="container mx-auto py-84">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='h-96 overflow-hidden relative'>
                <FavouriteButton isFavourited={isFavourite} toggleFavourite={toggleFavouriteHandler} />

                    <img src={image} alt={title} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-semibold mb-2">{title}</h1>
                    <p className="text-gray-600">{category}</p>
                        <p className="mt-2 text-xl font-semibold text-primary">${price.toFixed(2)}</p>
                        <div className="mt-2">
                            <RatingStars rating={rating.rate} />
                            <span className="text-gray-500 ml-1">{rating.count} reviews</span>
                        </div>
                    <p className="mt-4">{description}</p>

          <div className='mt-4'>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
