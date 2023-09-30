import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptionsClientSecret, loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../components/CheckoutForm';
import BillingAddressList from '../components/BillingAddressList';
import InfoCard from '../components/InfoCard';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { createStripePaymentIntent } from '../store/shopping/shopping-actions';
import LoadingSpinner from '../components/LoadingSpinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY!)

const Checkout: React.FC = () => {
    const dispatch = useAppDispatch()

    const [options, setOptions] = useState<StripeElementsOptionsClientSecret>({})

    const { billingAddresses: addresses } = useLoaderData() as {
        billingAddresses: []
    }
    const clientSecret = useAppSelector(state => state.shopping.stripe.clientSecret)
    const cart = useAppSelector(state => state.shopping.cart)
    const cartTotal = cart.reduce((total, item) => total + item.price, 0) * 100

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'billing' | 'payment'>('billing');

    if (clientSecret && Object.keys(options).length === 0) {
        setOptions(() => ({ clientSecret }))
    }

    // create payment intent to initialize payment
    useEffect(() => {
        try {
            dispatch(createStripePaymentIntent({
                amount: cartTotal,
                metadata: cart,
            }))
        } catch (error: any) {
            console.log('Error creating payment intent: ', error)
        }
    }, [dispatch, cartTotal, cart])

    const handleTabClick = (step: 'billing' | 'payment') => {
        setActiveTab(step);
    };

    const handleSelectAddress = (id: string | null) => {
        // Select a billing address
        setSelectedAddressId(id);
    };

    return (
        clientSecret ? <Elements stripe={stripePromise} options={options}>
            <div className="container mx-auto py-8 relative">
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleTabClick('billing')}
                        className={`${activeTab === 'billing' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                            } px-4 py-2 rounded-lg flex-1 focus:outline-none`}
                    >
                        Billing Address
                    </button>
                    <button
                        disabled={!selectedAddressId}
                        onClick={() => handleTabClick('payment')}
                        className={`${activeTab === 'payment' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                            } px-4 py-2 rounded-lg flex-1 focus:outline-none`}
                    >
                        Payment Information
                    </button>
                </div>
                <div className="mt-8">
                    {activeTab === 'billing' ? (
                        <div className='space-y-2'>
                            <h2 className="text-2xl font-semibold mb-4">Billing Addresses</h2>
                            <InfoCard title='Click on a card to select billing address' />
                            <BillingAddressList
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={handleSelectAddress}
                            />
                        </div>
                    ) : (
                        <CheckoutForm />
                    )}
                </div>

                <AnimatePresence>
                    {
                        selectedAddressId && activeTab !== 'payment' &&
                        <motion.button initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => handleTabClick('payment')} className='btn btn-primary fixed bottom-2 inset-x-0 w-3/4 sm:!max-w-sm mx-auto'>
                            Use this address
                        </motion.button>
                    }
                </AnimatePresence>
            </div>
        </Elements>
            : <LoadingSpinner text='Loading...' />
    );
};

export default Checkout;
