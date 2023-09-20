import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import InfoCard from "./InfoCard";
import CopyToClipboard from "./CopyToClipboard";
import { useAppSelector } from "../hooks/useReduxHooks";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const clientSecret = useAppSelector(state => state.shopping.stripe.clientSecret)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return;
        }

        elements.submit()

        const result = await stripe.confirmPayment({
            elements,
            clientSecret,
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
                <PaymentElement />
                <button disabled={!stripe} className="btn btn-outline disabled:bg-opacity-50">Submit</button>
            </form>
        </>
    )
}

export default CheckoutForm