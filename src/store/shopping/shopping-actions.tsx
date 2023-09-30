import { AppDispatch } from "../../types";
import { setClientSecret } from "./shopping-slice";

export const createStripePaymentIntent = ({ amount, metadata }: { amount: number, metadata: object }) => {
  return async (dispatch: AppDispatch) => {
      const response = await fetch(`${process.env.NODE_API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, metadata }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      // Handle the response data as needed
      const { clientSecret } = await response.json();

      dispatch(setClientSecret({
          clientSecret
      }))
  };
};
