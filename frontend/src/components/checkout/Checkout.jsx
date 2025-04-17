import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchClientSecret, getUserAddresses } from "../../store/action";
import AddressInfo from "./AddressInfo";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";
import Skeleton from "../shared/Skeleton";
import ErrorPage from "../shared/ErrorPage";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.error);
  const { addresses, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  const { paymentMethod } = useSelector((state) => state.payment);

  const steps = [
    { id: 0, name: "Address" },
    { id: 1, name: "Payment Method" },
    { id: 2, name: "Order Summary" },
    { id: 3, name: "Payment" },
  ];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding.");
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
    dispatch(fetchClientSecret());
  }, [dispatch]);

  // Determine if the Next button should be disabled
  const isNextDisabled =
    error ||
    (activeStep === 0 && !selectedUserCheckoutAddress) ||
    (activeStep === 1 && !paymentMethod);

  // Render the current step content
  const renderStepContent = () => {
    if (isLoading) {
      return (
        <div className="w-full lg:w-4/5 mx-auto py-5">
          <Skeleton />
        </div>
      );
    }

    switch (activeStep) {
      case 0:
        return <AddressInfo addresses={addresses} />;
      case 1:
        return <PaymentMethod />;
      case 2:
        return (
          <OrderSummary
            address={selectedUserCheckoutAddress}
            paymentMethod={paymentMethod}
          />
        );
      case 3:
        return paymentMethod === "Stripe" ? (
          <StripePayment />
        ) : (
          <PaypalPayment />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8 md:py-14 px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Checkout
        </h1>

        {/* Custom Stepper */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center">
            <ol className="flex w-full items-center text-sm font-medium text-center text-gray-500 sm:text-base">
              {steps.map((step, index) => {
                const isActive = activeStep >= step.id;
                const isLastStep = index === steps.length - 1;

                return (
                  <React.Fragment key={step.id}>
                    <li
                      className={`flex items-center ${
                        isActive ? "text-indigo-600" : "text-gray-500"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 me-2 sm:me-4 rounded-full shrink-0 border ${
                          isActive
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        {isActive ? (
                          <svg
                            className="w-3.5 h-3.5 text-indigo-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        ) : (
                          <span>{step.id + 1}</span>
                        )}
                      </span>
                      <span
                        className={`hidden sm:inline-block ${
                          isActive ? "font-semibold" : ""
                        }`}
                      >
                        {step.name}
                      </span>
                    </li>

                    {!isLastStep && (
                      <div className="flex-1 h-px bg-gray-200 mx-2 sm:mx-4"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-24">
          {error ? <ErrorPage message={error} /> : renderStepContent()}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`px-4 py-2 border border-gray-300 rounded-md font-medium transition-colors
              ${
                activeStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 cursor-pointer hover:bg-gray-50"
              }`}
          >
            Back
          </button>

          {activeStep !== steps.length - 1 && (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`px-6 py-2 rounded-md font-medium text-white transition-colors
                ${
                  isNextDisabled
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                }`}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
