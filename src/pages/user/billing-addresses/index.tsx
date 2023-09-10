import React, { useState } from 'react';

import { ReactComponent as Trash } from '../../../assets/svgs/trash.svg'
import { ReactComponent as Pencil } from '../../../assets/svgs/pencil.svg'
import { Link } from 'react-router-dom';
import BillingAddress from '../../../models/billing-address';

const billingAddresses = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Apt 4B',
        city: 'New York',
        country: 'USA',
        postalCode: '10001',
        number: '123-456-7890',
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Elm Rd, Suite 202',
        city: 'Los Angeles',
        country: 'USA',
        postalCode: '90002',
        number: '987-654-3210',
        email: 'jane.smith@example.com',
    },
    {
        id: 3,
        firstName: 'David',
        lastName: 'Johnson',
        address: '789 Oak Ave, Unit 5',
        city: 'Chicago',
        country: 'USA',
        postalCode: '60603',
        number: '555-123-4567',
        email: 'david.johnson@example.com',
    },
    {
        id: 4,
        firstName: 'Alice',
        lastName: 'Brown',
        address: '234 Cedar St, Apt 12C',
        city: 'San Francisco',
        country: 'USA',
        postalCode: '94101',
        number: '888-555-1234',
        email: 'alice.brown@example.com',
    },
    {
        id: 5,
        firstName: 'Ella',
        lastName: 'Williams',
        address: '567 Pine Rd, Suite 101',
        city: 'Miami',
        country: 'USA',
        postalCode: '33101',
        number: '777-888-9999',
        email: 'ella.williams@example.com',
    },
];


const BillingAddressListPage = () => {
    const [addresses, setAddresses] = useState<BillingAddress[]>(billingAddresses.map(billingAddress => BillingAddress.fromJson(billingAddress)));

    const handleDelete = (id: number) => {
        // Implement logic to delete the selected address from the list
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        setAddresses(updatedAddresses);
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
                {addresses.map((address) => (
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
            </div>
        </div>
    );
};

export default BillingAddressListPage;
