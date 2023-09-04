import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../types';
import RatingStars from './RatingStars';
import FavouriteButton from './FavouriteButton';

type ProductCardProps = {
    product: Product;
    children?: ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, children }) => {
    const [isFavourite, setIsFavourite] = useState(false)

    const { id, title, image, price, category, rating } = product

    const toggleFavouriteHandler = () => {
        setIsFavourite(!isFavourite);
    }

    return (
        <div className="w-full overflow-hidden border rounded-3xl block relative h-full">
            <FavouriteButton isFavourited={isFavourite} toggleFavourite={toggleFavouriteHandler} />

            <Link to={`/products/${id}`} className="h-80 w-full overflow-hidden">
                <img className="w-full h-80 object-contain" src={image} alt={title} />
            </Link>
            <div className="px-6 py-4">
                <Link to={`/products/${id}`} className="font-bold text-xl mb-2 hover:underline">{title}</Link>
                <p className="text-gray-700 text-base mb-2">Category: {category}</p>
                <p className="text-gray-700 text-base mb-2">${price}</p>
                <div className="flex">
                    <span className="text-gray-700 text-sm">
                        Rating: <RatingStars rating={rating.rate}></RatingStars>
                    </span>
                </div>

                {children}
            </div>
        </div>
    );
}

export default ProductCard;
