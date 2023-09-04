import React, { Suspense, useState } from 'react';
import { Product } from '../types';
import RatingStars from '../components/RatingStars';
import FavouriteButton from '../components/FavouriteButton';
import { Await, LoaderFunctionArgs, defer, json, useLoaderData } from 'react-router-dom';
import ProductService from '../api/product-service';
import LoadingSpinner from '../components/LoadingSpinner';

type ProductLoaderDataProps = {
    product: Product
}

export const ProductPage: React.FC = () => {
    const { product } = useLoaderData() as ProductLoaderDataProps
    const { title, category, price, image, description, rating } = product

    const [isFavourite, setIsFavourite] = useState(false)

    const toggleFavouriteHandler = () => {
        setIsFavourite(!isFavourite);
    }

    const handleAddToCart = () => {
        // Implement add to cart logic here
        console.log(`Added "${title}" to the cart`);
    };

    return (
        <>
            <Suspense fallback={<LoadingSpinner text="Loading product..." />}>
                <Await resolve={product}>
                    <div className="container mx-auto py-8">
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
                </Await>
            </Suspense>
        </>
    );
};

export default ProductPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params

    const productId = parseInt(id!)

    try {
        const product = await ProductService.fetchProduct(productId)

        return defer({
            product
        })
    } catch (e) {
        throw json(
            { message: `Could not fetch product with id: ${id}.` },
            {
                status: 500,
            }
        );
    }

}
