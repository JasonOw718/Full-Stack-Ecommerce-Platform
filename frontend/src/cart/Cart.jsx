import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../components/utility/formatPrice.js";
import { useEffect } from "react";
import { fetchProducts } from "../store/action/index.js";

function Cart() {
  const { user, userCart, userTotalPrice } = useSelector((state) => state.auth);
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const c = user ? userCart : cart;

  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);



  if (!c || c.length == 0) return <CartEmpty />;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 py-6">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center relative mb-6">
            <span className="relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4 flex items-center justify-center gap-3">
              Your Cart
            </span>
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Review all your selected items before checkout
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-4 font-semibold items-center border-b border-gray-200">
            <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
              Product
            </div>
            <div className="justify-self-center text-lg text-slate-800">
              Price
            </div>
            <div className="justify-self-center text-lg text-slate-800">
              Quantity
            </div>
            <div className="justify-self-center text-lg text-slate-800">
              Total
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {user
              ? userCart.map((item, i) => (
                  <div
                    key={i}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ItemContent {...item} />
                  </div>
                ))
              : cart.map((item, i) => {
                return(
                  <div
                    key={i}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ItemContent {...item} />
                  </div>
                )})}
          </div>

          <div className="border-t-2 border-slate-200 mt-6 pt-6 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
            <div className="sm:w-1/2">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-800 mb-2">
                  Order Summary
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  • Free shipping on orders over RM500
                </p>
                <p className="text-sm text-gray-600">
                  • Easy returns within 30 days
                </p>
              </div>
            </div>

            <div className="flex text-sm gap-4 flex-col sm:w-1/2 lg:w-1/3">
              <div className="flex justify-between w-full text-lg font-semibold">
                <span>Subtotal</span>
                <span className="text-indigo-700">
                  {formatPrice(user ? userTotalPrice : totalPrice)}
                </span>
              </div>

              <div className="flex justify-between w-full text-base text-gray-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between w-full text-xl font-bold">
                  <span>Total</span>
                  <span className="text-indigo-700">
                    {formatPrice(user ? userTotalPrice : totalPrice)}
                  </span>
                </div>
              </div>

              <Link className="w-full mt-4" to="/checkout">
                <button className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition duration-300 shadow-md hover:shadow-lg">
                  <MdShoppingCart size={20} />
                  Proceed to Checkout
                </button>
              </Link>

              <Link
                className="flex gap-2 items-center justify-center mt-3 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
                to="/products"
              >
                <MdArrowBack />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
