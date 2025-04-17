import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAddresses } from "../store/action";

function Profile() {
  const { user, addresses } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      {/* Profile Header */}
      <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
          {user.email.charAt(0).toUpperCase()}
        </div>
        <div className="ml-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {user.email.split("@")[0]}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b border-gray-200 ">
        <nav className="flex space-x-8 ">
          <button
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer pb-4 px-1 ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`cursor-pointer pb-4 px-1 ${
              activeTab === "addresses"
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Addresses
          </button>
        </nav>
      </div>

      {/* Profile Content */}
      {activeTab === "profile" && (
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Account Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                User ID
              </label>
              <p className="text-lg font-medium p-3 bg-white border border-gray-200 rounded-lg">
                {user.userId}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email Address
              </label>
              <p className="text-lg font-medium p-3 bg-white border border-gray-200 rounded-lg flex items-center">
                {user.email}
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Verified
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Account Created
              </label>
              <p className="text-lg font-medium p-3 bg-white border border-gray-200 rounded-lg">
                April 10, 2025
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Member Status
              </label>
              <p className="text-lg font-medium p-3 bg-white border border-gray-200 rounded-lg flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Active
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Addresses Content */}
      {activeTab === "addresses" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Saved Addresses
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    {index === 0 ? "Default" : `Address ${index + 1}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    ID: {address.addressId}
                  </span>
                </div>

                <p className="font-semibold text-lg mb-2">
                  {address.buildingName || "Home"}
                </p>

                <div className="space-y-2 text-gray-700 mb-6">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p className="flex items-center">
                    <span className="inline-block mr-2 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                    </span>
                    {address.country}
                  </p>
                  <p className="flex items-center">
                    <span className="inline-block mr-2 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </span>
                    {address.pincode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
