import { useEffect, useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu.jsx";
import { fetchCurrentUser, fetchUserCart } from "../../store/action/index.js";

function Navbar() {
  const { cart } = useSelector((state) => state.cart);
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user,userCart } = useSelector((state) => state.auth);

  const useCart = user?userCart:cart;
  const cartItemCount = useCart ? useCart.length : 0;

  const handleLinkClick = () => {
    if (navbarOpen) setNavbarOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchUserCart());
  }, [dispatch]);

  return (
    <div className="h-[70px] bg-gradient-to-r from-slate-900 to-slate-800 text-white z-50 flex items-center sticky top-0 shadow-md">
      <div className="container mx-auto px-4 lg:px-8 w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[Poppins]">E-Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {["/", "/products", "/about", "/contact"].map((route, idx) => {
              const labels = ["Home", "Products", "About", "Contact"];
              return (
                <li key={route}>
                  <Link
                    to={route}
                    className={`transition-all duration-200 hover:text-sky-400 ${
                      path === route
                        ? "text-white font-semibold border-b-2 border-sky-400 pb-1"
                        : "text-slate-400 hover:border-b-2 hover:border-slate-500 hover:pb-1"
                    }`}
                  >
                    {labels[idx]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Side Items */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative group" onClick={handleLinkClick}>
            <FaShoppingCart
              className={`text-2xl transition-all duration-200 ${
                path === "/cart"
                  ? "text-white"
                  : "text-slate-400 group-hover:text-sky-400"
              }`}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="z-50">
              <UserMenu />
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-md shadow-lg hover:from-indigo-400 hover:to-pink-400 transition duration-300"
              onClick={handleLinkClick}
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="cursor-pointer md:hidden flex items-center"
            aria-label="Toggle menu"
          >
            {navbarOpen ? (
              <RxCross2 className="text-white text-2xl" />
            ) : (
              <IoIosMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg md:hidden transition-all duration-300 ${
          navbarOpen
            ? "max-h-screen opacity-100 z-50"
            : "max-h-0 opacity-0 -z-10 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col gap-4">
            {["/", "/products", "/about", "/contact"].map((route, idx) => {
              const labels = ["Home", "Products", "About", "Contact"];
              return (
                <li key={route}>
                  <Link
                    to={route}
                    className={`block py-2 px-4 rounded transition-all duration-200 ${
                      path === route
                        ? "bg-sky-700 text-white font-semibold"
                        : "text-slate-400 hover:bg-sky-700 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {labels[idx]}
                  </Link>
                </li>
              );
            })}
            {!user && (
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-indigo-400 hover:to-pink-400 transition duration-300"
                  onClick={handleLinkClick}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
