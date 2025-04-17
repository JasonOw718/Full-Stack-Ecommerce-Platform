import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import StripePaymentForm from "./StripePaymentForm";
import Skeleton from "../shared/Skeleton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

function StripePayment() {
  const { clientSecret } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.error);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto p-4 rounded-lg shadow-sm">
        <Skeleton />
      </div>
    );
  }
  if (!clientSecret) {
    return (
      <div className="max-w-lg mx-auto p-6 rounded-lg bg-red-50 border border-red-100 text-center">
        <p className="text-red-600 font-medium">
          Payment information could not be loaded. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm />
      </Elements>
    </div>
  );
}

export default StripePayment;
