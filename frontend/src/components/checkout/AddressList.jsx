import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/action";

function AddressList({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  return (
    <div className="space-y-6">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
          className={`relative p-6 rounded-lg shadow-md border transition duration-300 cursor-pointer hover:shadow-lg ${
            selectedUserCheckoutAddress?.addressId === address.addressId
              ? "bg-green-50 border-green-400"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center">
              <FaBuilding size={16} className="text-gray-500 mr-2" />
              <span className="font-semibold">{address.buildingName}</span>
              {selectedUserCheckoutAddress?.addressId === address.addressId && (
                <FaCheckCircle className="ml-2 text-green-500" />
              )}
            </div>

            <div className="flex items-center">
              <FaStreetView size={16} className="text-gray-500 mr-2" />
              <span>{address.street}</span>
            </div>

            <div className="flex items-center">
              <MdLocationCity size={18} className="text-gray-500 mr-2" />
              <span>
                {address.city}, {address.state}
              </span>
            </div>

            <div className="flex items-center">
              <MdPinDrop size={18} className="text-gray-500 mr-2" />
              <span>{address.pincode}</span>
            </div>

            <div className="flex items-center">
              <MdPublic size={18} className="text-gray-500 mr-2" />
              <span>{address.country}</span>
            </div>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditButtonHandler(address);
              }}
            >
              <FaEdit className="text-teal-600 hover:text-teal-800" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteButtonHandler(address);
              }}
            >
              <FaTrash className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddressList;
