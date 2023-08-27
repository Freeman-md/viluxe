import React from 'react';
import { Product } from '../types';

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { title, image, price, category, rating } = product

    const renderRatingStars = () => {
        const stars = [];
        const fullStars = Math.floor(5);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
        }

        if (rating.rate - fullStars >= 0.5) {
            stars.push(<span key="half" className="text-yellow-500">½</span>);
        }

        return stars;
    };

    return (
        <div className="w-full overflow-hidden border rounded-md">
            <div className="h-80 overflow-hidden">
                <img className="w-full h-full object-contain" src={image} alt={title} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base mb-2">Category: {category}</p>
                <p className="text-gray-700 text-base mb-2">${price}</p>
                <div className="flex">
                    <span className="text-gray-700 text-sm">
                        Rating: {renderRatingStars()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
