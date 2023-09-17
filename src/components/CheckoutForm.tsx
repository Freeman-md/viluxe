import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import InfoCard from "./InfoCard";
import CopyToClipboard from "./CopyToClipboard";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(elements)

        // console.log(stripe?.retrievePaymentIntent())

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://viluxe.onrender.com/user/orders",
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log(result)
        }
    };

    return (
        <>
        <InfoCard title="Test Payment Details">
        <p>Card Number: <CopyToClipboard>4242 4242 4242 4242</CopyToClipboard></p>
        <p>Expiry Date: Any future date</p>
        <p>CVC: 123</p>
        </InfoCard>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement className="p-4 border rounded mt-2" />
                <button disabled={!stripe} className="btn btn-outline disabled:bg-opacity-50">Submit</button>
            </form>
        </>
    )
}

export default CheckoutForm