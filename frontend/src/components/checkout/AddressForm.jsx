import React, { useEffect } from "react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../shared/Spinners";
import { addUpdateUserAddress } from "../../store/action";

function AddressForm({ address, setOpenAddressModal }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = (data) => {
    dispatch(
      addUpdateUserAddress(data, address?.addressId, setOpenAddressModal)
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("pincode", address?.pincode);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          {!address?.addressId ? "Add Address" : "Update Address"}
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter Building Name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />

          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={false}
          className="cursor-pointer text-white bg-customBlue px-4 py-2 rounded-md mt-4 "
          type="submit"
        >
          {false ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
