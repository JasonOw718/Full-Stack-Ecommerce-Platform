import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../store/action";
import Filter from "./Filter";
import useFilterProduct from "../hooks/useFilterProduct.js";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { useNavigate } from "react-router-dom";

function Products() {
  const { categories, products, pagination } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  useFilterProduct();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="lg:px-14 sm:px-8 px-4 pb-14 pt-4 2xl:w-[90%] 2xl:mx-auto max-w-7xl mx-auto">
        <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center mb-12 relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-24 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
            Our Products
          </span>
        </h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Explore our extensive collection of premium products. Use the filters
          below to find exactly what you're looking for.
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <Filter categories={categories} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader text={"Products are loading"} />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-[300px] bg-red-50 rounded-xl shadow-sm p-8">
            <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
            <span className="text-lg font-medium text-red-600">{error}</span>
            <p className="text-gray-600 mt-2">
              Please try again later or contact support.
            </p>
          </div>
        ) : (
          <div className="min-h-[700px]">
            {products.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[300px] bg-indigo-50 rounded-xl shadow-sm p-8">
                <FaExclamationTriangle className="text-indigo-500 text-4xl mb-4" />
                <span className="text-lg font-medium text-indigo-600">
                  No products found
                </span>
                <p className="text-gray-600 mt-2">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <div className="pb-6 pt-8 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 gap-x-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {products.length > 0 && (
          <div className="flex justify-center mt-12">
            <Paginations {...pagination} />
          </div>
        )}

        <div className="bg-indigo-50 rounded-2xl p-8 text-center shadow-sm mt-16">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-indigo-700 mb-6">
            Contact our customer support team for assistance or custom orders
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
