import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { toggleItemInWishlist } from '../store/shopping/shopping-slice';
import Empty from '../components/Empty';
import { fadeInList, slideInListItem } from '../utils/framer-motion';

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
                    animate="visible" variants={fadeInList} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {wishlistItems.map((item) => (
                            <motion.div variants={slideInListItem} exit={{ opacity: 0 }} key={item.id}>
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
