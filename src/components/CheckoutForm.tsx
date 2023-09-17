import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";

const TestPaymentDetails = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-t">
        <h3 className="text-lg font-bold mb-2">Test Payment Details</h3>
        <p>Card Number: 4242 4242 4242 4242</p>
        <p>Expiry Date: Any future date</p>
        <p>CVC: 123</p>
      </div>
    );
  };

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
            <TestPaymentDetails />

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement className="p-4 border rounded mt-2" />
                <button disabled={!stripe} className="btn btn-outline disabled:bg-opacity-50">Submit</button>
            </form>
        </>
    )
}

export default CheckoutForm