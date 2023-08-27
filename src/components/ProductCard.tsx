import React from 'react';
import { Product } from '../types';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { title, image, price, category, rating } = product

    return (
        <Link className="w-full overflow-hidden border rounded-3xl block" to='/products/1'>
            <div className="h-80 overflow-hidden">
                <img className="w-full h-full object-contain" src={image} alt={title} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base mb-2">Category: {category}</p>
                <p className="text-gray-700 text-base mb-2">${price}</p>
                <div className="flex">
                    <span className="text-gray-700 text-sm">
                        Rating: <RatingStars rating={rating.rate}></RatingStars>
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
