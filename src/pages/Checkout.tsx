import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import CheckoutForm from '../components/CheckoutForm';
import BillingAddressList from '../components/BillingAddressList';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY!)

const Checkout: React.FC = () => {
    const { billingAddresses: addresses } = useLoaderData() as {
        billingAddresses: []
    }

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'billing' | 'payment'>('billing');

    const options: StripeElementsOptions = {
        // passing the client secret obtained from the server
        mode: 'payment',
        amount: 1000,
        currency: 'usd',
    };

    const handleTabClick = (step: 'billing' | 'payment') => {
        setActiveTab(step);
    };

    const handleSelectAddress = (id: string | null) => {
        // Select a billing address
        setSelectedAddressId(id);
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <div className="container mx-auto py-8">
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleTabClick('billing')}
                        className={`${activeTab === 'billing' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                            } px-4 py-2 rounded-lg flex-1 focus:outline-none`}
                    >
                        Billing Address
                    </button>
                    <button
                        onClick={() => handleTabClick('payment')}
                        className={`${activeTab === 'payment' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                            } px-4 py-2 rounded-lg flex-1 focus:outline-none`}
                    >
                        Payment Information
                    </button>
                </div>
                <div className="mt-8">
                    {activeTab === 'billing' ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Billing Addresses</h2>
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
            </div>
        </Elements>
    );
};

export default Checkout;
