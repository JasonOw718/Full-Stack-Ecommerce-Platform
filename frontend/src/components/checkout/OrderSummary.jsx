import { formatPrice } from "../utility/formatPrice";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

function OrderSummary({ address, paymentMethod }) {
  const { user, userCart, userTotalPrice } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
        Order Summary
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Order Details */}
        <div className="w-full lg:w-8/12">
          <div className="space-y-6">
            {/* Billing Address Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Billing Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                <p className="flex items-start">
                  <span className="font-medium w-32">Building Name:</span>
                  <span className="text-gray-800">
                    {address?.buildingName || "N/A"}
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-32">City:</span>
                  <span className="text-gray-800">
                    {address?.city || "N/A"}
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-32">Street:</span>
                  <span className="text-gray-800">
                    {address?.street || "N/A"}
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-32">State:</span>
                  <span className="text-gray-800">
                    {address?.state || "N/A"}
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-32">Pincode:</span>
                  <span className="text-gray-800">
                    {address?.pincode || "N/A"}
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-32">Country:</span>
                  <span className="text-gray-800">
                    {address?.country || "N/A"}
                  </span>
                </p>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Method
              </h2>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <span className="font-medium text-gray-600 mr-3">Method:</span>
                <span className="text-gray-800 font-semibold">
                  {paymentMethod || "N/A"}
                </span>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 overflow-hidden">
              <h2 className="text-2xl font-semibold p-6 text-gray-700 flex items-center border-b">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Order Items
              </h2>

              <div className="divide-y divide-gray-200">
                {user ? (
                  userCart.map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))
                ) : (
                  <p className="p-6 text-gray-500 italic">
                    No items in the cart
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Price Summary */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 sticky top-4 overflow-hidden">
            <div className="bg-indigo-600 text-white p-4">
              <h2 className="text-xl font-bold">Price Details</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 divide-y divide-gray-200">
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Products</span>
                    <span className="font-medium text-gray-800">
                      {formatPrice(userTotalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-medium text-gray-800">RM 0.00</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <span className="text-xl font-bold text-indigo-600">
                      {formatPrice(userTotalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {userTotalPrice >= 500 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mt-0.5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-green-700">
                Your order is eligible for free shipping. Standard delivery: 3-5
                business days.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
