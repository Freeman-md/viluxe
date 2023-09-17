import React, { Suspense, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Await, Link, defer, json, useLoaderData } from 'react-router-dom';

import BillingAddressModel from '../../../models/billing-address';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { formatFirebaseData } from '../../../utils';
import Empty from '../../../components/Empty';
import { fadeInList, fadeInListItem } from '../../../utils/framer-motion';
import BillingAddress from '../../../components/BillingAddress';
import { ReactComponent as Trash } from '../../../assets/svgs/trash.svg'
import { ReactComponent as Pencil } from '../../../assets/svgs/pencil.svg'


const BillingAddressListPage = () => {
    const { billingAddresses: addresses } = useLoaderData() as {
        billingAddresses: []
    }

    const [billingAddresses, setBillingAddresses] = useState<BillingAddressModel[]>(addresses.map(address => BillingAddressModel.fromJson(address)))

    const handleDelete = (address: BillingAddressModel) => {
        address.delete()

        setBillingAddresses(prevState => prevState.filter(billingAddress => billingAddress.id !== address.id))
    };

    return (
        <div className="container mx-auto py-8">
            <div className='flex items-center justify-between space-x-4 mb-4'>
                <h1 className="text-xl sm:text-2xl font-bold">Billing Addresses</h1>

                <Link
                    to="create"
                    className="btn btn-primary"
                >
                    Create Billing Address
                </Link>
            </div>
            <motion.div initial="hidden"
                animate="visible" variants={fadeInList} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<LoadingSpinner text='Loading billing addresses...' />}>
                    <Await resolve={billingAddresses}>
                        {billingAddresses.length === 0 && <div className='md:col-span-3'>
                            <Empty text='You have no billing addresses' action={false} /></div>}
                        <AnimatePresence>
                            {billingAddresses?.map((address: BillingAddressModel) => (
                                <motion.div key={address.id} variants={fadeInListItem} exit={{ opacity: 0 }}>
                                    <BillingAddress key={address.id} address={address} actionButtonsSection={
                                    <div className="flex space-x-2 justify-end text-primary">
                                        <Link to={`${address.id}/edit`}>
                                            <Pencil />
                                        </Link>
                                        <button onClick={() => handleDelete(address)}>
                                            <Trash />
                                        </button>
                                    </div>
                                } />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Await>
                </Suspense>
            </motion.div>
        </div>
    );
};

export default BillingAddressListPage;


export const loader = async () => {
    try {
        const billingAddresses = await BillingAddressModel.fetch()

        return defer({
            billingAddresses: formatFirebaseData(billingAddresses)
        })
    } catch (error: any) {
        throw json({ message: error.message })
    }
}