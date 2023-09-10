import React, { Suspense, useState } from 'react';

import { ReactComponent as Trash } from '../../../assets/svgs/trash.svg'
import { ReactComponent as Pencil } from '../../../assets/svgs/pencil.svg'
import { Await, Link, defer, json, useLoaderData } from 'react-router-dom';
import BillingAddress from '../../../models/billing-address';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { formatFirebaseData } from '../../../utils';

type BillingAddressListPageLoaderData = {
    billingAddresses: []
}


const BillingAddressListPage = () => {
    const { billingAddresses } = useLoaderData() as BillingAddressListPageLoaderData

    const handleDelete = (id: number) => {
        // Implement logic to delete the selected address from the list
    };

    return (
        <div className="container mx-auto py-8">
            <div className='flex items-center justify-between space-x-4'>
                <h1 className="text-2xl font-bold mb-4">Billing Addresses</h1>

                <Link
                    to="create"
                    className="btn btn-primary"
                >
                    Create New Billing Address
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<LoadingSpinner text='Loading billing addresses...' />}>
                    <Await resolve={billingAddresses}>
                        {billingAddresses.map((address: BillingAddress) => (
                            <div key={address.id} className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-semibold mb-2">{`${address.firstName} ${address.lastName}`}</h2>
                                <p className="text-gray-600 mb-2">{address.address}</p>
                                <p className="text-gray-600 mb-2">{`${address.city}, ${address.country}, ${address.postalCode}`}</p>
                                <p className="text-gray-600 mb-2">{`Phone: ${address.phone}`}</p>
                                <p className="text-gray-600 mb-2">{`Email: ${address.email}`}</p>
                                <div className="flex space-x-2 justify-end text-primary">
                                    <button onClick={() => console.log('handle events')}>
                                        <Pencil />
                                    </button>
                                    <button onClick={() => console.log('handle events')}>
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
};

export default BillingAddressListPage;


export const loader = async () => {
    try {
        const billingAddresses = await BillingAddress.all()

        return defer({
            billingAddresses: formatFirebaseData(billingAddresses)
        })
    } catch (error: any) {
        throw json({ message: error.message })
    }
}