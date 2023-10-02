import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import InfoCard from "./InfoCard";
import CopyToClipboard from "./CopyToClipboard";
import { useAppSelector } from "../hooks/useReduxHooks";
import { Product } from "../models/product";
import Order from "../models/order";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const clientSecret = useAppSelector(state => state.shopping.stripe.clientSecret)
    const cartItems = useAppSelector(state => state.shopping.cart)

    const createOrder = async () => {
        const orderItems = cartItems.map(item => Product.fromJson(item));
      
        const mappedOrderItems = orderItems.map(({ title, id, price, image }) => ({
          title,
          id,
          price,
          image
        }));
      
        const total = orderItems.reduce((total, item) => total + item.price, 0);
      
        const order = Order.fromJson({
          items: mappedOrderItems,
          status: 'pending',
          date: Date.now(),
          total,
          clientSecret
        });
      
        await order.save();
      };
      

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return;
        }

        elements.submit()

        await createOrder()

        const result = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${process.env.REACT_APP_URL}/payment`
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