import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducer/ProductReducer";
import { errorReducer } from "./reducer/ErrorReducer";
import { cartReducer } from "./reducer/CartReducer";
import { authReducer } from "./reducer/AuthReducer";
import { paymentReducer } from "./reducer/PaymentReducer";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];


export const store = configureStore({
  reducer: {
    products: productReducer,
    error: errorReducer,
    cart: cartReducer,
    auth: authReducer,
    payment: paymentReducer
  },
  preloadedState: {
    cart: {
      cart: cart,
      totalPrice: cart.reduce((acc, item) => acc + (item.specialPrice*item.quantity), 0),
    },
  },
});

export default store;
