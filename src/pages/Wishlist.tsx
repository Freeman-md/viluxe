import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { toggleItemInWishlist } from '../store/shopping';
import Empty from '../components/Empty';


const animatedProductList = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
}

const animatedProductItem = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
}

const WishlistPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const wishlistItems = useAppSelector(state => state.shopping.wishlist)

    const isItemInWishlist = (product: Product): boolean => wishlistItems.some(item => item.id === product.id)

    const toggleFavouriteHandler = (product: Product) => {
        setTimeout(() => {
            dispatch(
                toggleItemInWishlist({
                    item: product
                })
            )
        }, 300);
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <Empty text='Your wishlist is empty!' />
            ) : (
                <motion.div initial="hidden"
                    animate="visible" variants={animatedProductList} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {wishlistItems.map((item) => (
                            <motion.div variants={animatedProductItem} exit={{ opacity: 0 }} key={item.id}>
                                <ProductCard key={item.id} product={item} isItemInWishlist={isItemInWishlist(item)} onToggleFavorite={toggleFavouriteHandler.bind(null, item)}></ProductCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default WishlistPage;
