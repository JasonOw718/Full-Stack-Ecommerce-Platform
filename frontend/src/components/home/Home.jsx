import { FaExclamationTriangle } from "react-icons/fa";
import Loader from "../shared/Loader.jsx";
import HeroBanner from "./HeroBanner.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/action/index.js";
import ProductCard from "../shared/ProductCard.jsx";

function Home() {
  const { products } = useSelector((state) => state.products);
  const { isLoading, error } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2 mb-10">
          <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
          <span className="text-slate-700 text-center">
            Discover our handpicked selection of top-rated items just for you!
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-52 bg-red-50 rounded-lg">
            <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">{error}</span>
          </div>
        ) : (
          <div className="pb-12 pt-4 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-6">
            {products &&
              products
                ?.slice(0, 4)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
