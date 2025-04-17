import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./components/products/Products.jsx";
import Home from "./components/home/Home.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Cart from "./cart/Cart.jsx";
import Login from "./components/auth/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCurrentUser,
  fetchUserCart,
  fetchUserOrder
} from "./store/action/index.js";
import Checkout from "./components/checkout/Checkout.jsx";
import Return from "./components/checkout/Return.jsx";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile.jsx";
import Order from "./components/Order.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/return" element={<Return />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/order" element={<Order />}></Route>
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
