import { motion } from "framer-motion";

import BillingAddressModel from "../models/billing-address";
import { ReactNode } from "react";

type BillingAddressProps = {
    address: BillingAddressModel,
    actionButtonsSection: ReactNode,
    selected?: boolean;
}

const BillingAddress: React.FC<BillingAddressProps> = ({ address, actionButtonsSection = (<></>), selected }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 transition duration-200 ${selected ? 'border-primary border-2' : ''}`}>
            <h2 className="text-xl font-semibold mb-2">{`${address.firstName} ${address.lastName}`}</h2>
            <p className="text-gray-600 mb-2">{address.address}</p>
            <p className="text-gray-600 mb-2">{`${address.city}, ${address.country}, ${address.postalCode}`}</p>
            <p className="text-gray-600 mb-2">{`Phone: ${address.phone}`}</p>
            <p className="text-gray-600 mb-2">{`Email: ${address.email}`}</p>
            {actionButtonsSection}
        </div>
    )
}

export default BillingAddress