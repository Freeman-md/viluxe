import React, { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

import BillingAddressModel from '../models/billing-address';
import BillingAddress from '../components/BillingAddress';
import LoadingSpinner from '../components/LoadingSpinner';
import Empty from '../components/Empty';
import { fadeInList, fadeInListItem } from '../utils/framer-motion';

const BillingAddressList: React.FC<{
    addresses: BillingAddressModel[];
    selectedAddressId: string | null;
    onSelectAddress: (id: string | null) => void;
}> = ({ addresses, selectedAddressId, onSelectAddress }) => (
        <motion.div initial="hidden"
            animate="visible" variants={fadeInList} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={<LoadingSpinner text='Loading billing addresses...' />}>
                <Await resolve={addresses}>
                    {addresses.length === 0 && <div className='md:col-span-3'>
                        <Empty text='You have no billing addresses' action={false} /></div>}
                    <AnimatePresence>
                        {addresses?.map((address: BillingAddressModel) => (
                            <motion.div key={address.id} variants={fadeInListItem} exit={{ opacity: 0 }}>
                                <BillingAddress
                                    key={address.id}
                                    address={address}
                                    actionButtonsSection={
                                        address.id !== selectedAddressId
                                            ? <button className='text-primary' onClick={() => onSelectAddress(address.id!)}>Select</button>
                                            : <button className='text-red-500' onClick={() => onSelectAddress(null)}>Deselect</button>
                                    }
                                    selected={address.id === selectedAddressId}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Await>
            </Suspense>
        </motion.div>
);

export default BillingAddressList