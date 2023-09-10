import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY!)

const CheckoutForm = () => {
    const options: StripeElementsOptions = {
        // passing the client secret obtained from the server
        mode: 'payment',
        amount: 1000,
        currency: 'usd',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <form action="">
                <PaymentElement />
                <button>Submit</button>
            </form>
        </Elements>
    )
}

export default CheckoutForm