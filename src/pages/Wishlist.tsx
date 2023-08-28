import React from 'react';
import { motion } from "framer-motion";

import { Product } from '../types';
import ProductCard from '../components/ProductCard';


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
    const wishlistItems: Product[] = Array.from({ length: 7 }).map((_, index) => ({
        id: index + 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120,
        },
    }));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <motion.div initial="hidden"
                    animate="visible" variants={animatedProductList} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((item) => (
                        <motion.div variants={animatedProductItem} key={item.id}>
                            <ProductCard key={item.id} product={item}></ProductCard>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default WishlistPage;
