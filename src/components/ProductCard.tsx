import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../types';
import RatingStars from './RatingStars';
import FavouriteButton from './FavouriteButton';

type ProductCardProps = {
    product: Product;
    isItemInWishlist: boolean;
    onToggleFavorite: () => void;
    children?: ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isItemInWishlist, onToggleFavorite, children }) => {
    const { id, title, image, price, category, rating } = product

    return (
        <div className="w-full overflow-hidden border rounded-3xl block relative h-full">
            <FavouriteButton isFavourited={isItemInWishlist} toggleFavourite={onToggleFavorite} />

            <Link to={`/products/${id}`} className="h-80 w-full overflow-hidden">
                <img className="w-full h-80 object-contain" src={image} alt={title} />
            </Link>
            <div className="px-6 py-4">
                <Link to={`/products/${id}`} className="font-bold text-xl mb-2 hover:underline">{title}</Link>
                <p className="text-gray-700 text-base mb-2">Category: {category}</p>
                <p className="text-gray-700 text-base mb-2">${price}</p>
                <div className="flex text-gray-700 text-sm items-center space-x-1">
                        <span>Rating: </span> 
                        <RatingStars rating={rating.rate}></RatingStars>
                </div>

                {children}
            </div>
        </div>
    );
}

export default ProductCard;
