import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch, useSelector } from "react-redux";
import truncateText from "../components/utility/truncateText";
import {
  addToCart,
  decreaseCartItemQuantity,
  removeCartItem,
} from "../store/action";
import { formatPrice } from "../components/utility/formatPrice.js";

function ItemContent({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border-[1px] border-slate-200  rounded-md  lg:px-4  py-4 p-2">
      <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {truncateText(productName)}
          </h3>
        </div>

        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={image}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              disabled={isLoading}
              onClick={() => {
                dispatch(
                  removeCartItem(
                    {
                      productId: productId,
                      productName: productName,
                      image: image,
                      description: description,
                      quantity: 1,
                      price: price,
                      discount: discount,
                      specialPrice: specialPrice,
                      cartId: cartId,
                    },
                    user ? true : false
                  )
                );
              }}
              className="cursor-pointer flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(specialPrice)}
      </div>

      <div className="justify-self-center">
        <SetQuantity
          isLoading={isLoading}
          quantity={quantity}
          cardCounter={true}
          handeQtyIncrease={() => {
            dispatch(
              addToCart(
                {
                  productId: productId,
                  productName: productName,
                  image: image,
                  description: description,
                  quantity: 1,
                  price: price,
                  discount: discount,
                  specialPrice: specialPrice,
                  cartId: cartId,
                },
                user ? true : false
              )
            );
          }}
          handleQtyDecrease={() => {
            dispatch(
              decreaseCartItemQuantity(
                {
                  productId: productId,
                  productName: productName,
                  image: image,
                  description: description,
                  quantity: 1,
                  price: price,
                  discount: discount,
                  specialPrice: specialPrice,
                  cartId: cartId,
                },
                user ? true : false
              )
            );
          }}
        />
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(quantity) * Number(specialPrice))}
      </div>
    </div>
  );
}

export default ItemContent;
