import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getPaymentStatus,
  stripePaymentConfirmation,
} from "../../store/action";

function Return() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const { userCart, isLoading, paymentStatus } = useSelector(
    (state) => state.auth
  );
  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      userCart &&
      userCart?.length > 0
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      dispatch(getPaymentStatus(sendData));
    }
  }, [paymentIntent, clientSecret, redirectStatus, userCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <div className="max-w-xl mx-auto">
          <Skeleton />
        </div>
      ) : paymentStatus === "succeeded" ? (
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
          <div className="text-green-500 mb-4 flex justify-center">
            <FaCheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your payment was successful, and we’re
            processing your order.
          </p>
        </div>
      ) : (
        paymentStatus === "requires_payment_method" && (
          <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
            <div className="text-red-500 mb-4 flex justify-center">
              <FaCheckCircle size={64} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Payment Failed!
            </h2>
            <p className="text-gray-600 mb-6">
              Unfortunately, your payment could not be processed. Please try
              again with a different payment method.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Return;
