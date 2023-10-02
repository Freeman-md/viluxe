import React, { Suspense } from 'react';
import { Await, LoaderFunctionArgs, defer, json, useLoaderData } from 'react-router-dom';

import RatingStars from '../components/RatingStars';
import FavouriteButton from '../components/FavouriteButton';
import ProductService from '../api/product-service';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { toggleItemInCart, toggleItemInWishlist } from '../store/shopping/shopping-slice';
import { Product } from '../models/product';

type ProductLoaderDataProps = {
    product: Product
}

export const ProductPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const cartItems = useAppSelector(state => state.shopping.cart)

    const { product } = useLoaderData() as ProductLoaderDataProps
    const { title, category, price, image, description, rating } = product

    const isInWishlist = useAppSelector(state => state.shopping.wishlist.some(item => item.id === product.id))

    const isItemInCart = (product: Product): boolean => cartItems.some(item => item.id === product.id)

    const toggleFavouriteHandler = () => {
        dispatch(
            toggleItemInWishlist({
                item: product
            })
        )
    }

    const toggleItemInCartHandler = (product: Product) => {
        dispatch(
            toggleItemInCart({
                item: product
            })
        )
    }

    return (
        <>
            <Suspense fallback={<LoadingSpinner text="Loading product..." />}>
                <Await resolve={product}>
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className='h-96 overflow-hidden relative'>
                                <FavouriteButton isFavourited={isInWishlist} toggleFavourite={toggleFavouriteHandler} />

                                <img src={image} alt={title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-2xl font-semibold mb-2">{title}</h1>
                                <p className="text-gray-600">{category}</p>
                                <p className="mt-2 text-xl font-semibold text-primary">${price.toFixed(2)}</p>
                                <div className="mt-2 flex items-center">
                                    <RatingStars rating={rating} />
                                </div>
                                <p className="mt-4">{description}</p>

                                <div className='mt-4'>
                                    {(() => {
                                        const isProductInCart = isItemInCart(product);
                                        return (
                                            <button
                                                className={`btn ${isProductInCart ? 'btn-outline' : 'btn-primary'}`}
                                                onClick={() => toggleItemInCartHandler(product)}
                                            >
                                                {isProductInCart ? 'Remove from cart' : 'Add to cart'}
                                            </button>
                                        );
                                    })()}
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
