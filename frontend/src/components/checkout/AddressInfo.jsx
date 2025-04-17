import React, { useEffect, useState } from "react";
import Skeleton from "../shared/Skeleton";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import DeleteModal from "./DeleteModal";
import { deleteUserAddress, getUserAddresses } from "../../store/action";

function AddressInfo({ addresses }) {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const [selectedAddress, setSelectedAddress] = useState("");
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };
  
  const dispatch = useDispatch();

  const deleteAddressHandler = () => {
    dispatch(deleteUserAddress(selectedAddress?.addressId));
    setOpenDeleteModal(false);
  };


  const noAddressExist = !addresses || addresses.length === 0;
  const { isLoading } = useSelector((state) => state.error);

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
            No Address Added Yet
          </h1>
          <p className="mb-6 text-slate-800 text-center">
            Please add your address to complete purchase
          </p>

          <button
            onClick={addNewAddressHandler}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all cursor-pointer"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>

          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={addresses}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>

              {addresses.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AddressInfo;
