import { useSelector } from "react-redux";
import ProductCard from "./shared/ProductCard";
import { useNavigate } from "react-router-dom";

function About() {
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center mb-16 relative">
        <span className="relative inline-block after:content-[''] after:absolute after:w-24 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
          About Us
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to our e-commerce store! We are dedicated to providing the
            best products and services to our customers. Our mission is to offer
            a seamless shopping experience while ensuring the highest quality of
            our offerings.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded with a passion for excellence, we strive to exceed your
            expectations with every purchase. Our team is committed to curating
            products that combine quality, style, and value.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
            <button
              onClick={() => navigate("/contact")}
              className="cursor-pointer bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src="https://cdn.ignitingbusiness.com/images/easyblog_images/489/6-must-have-pages-for-your-ecommerce-website.jpeg"
              alt="About Us"
              className="w-full h-auto transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      <div className="py-12 space-y-10 bg-white rounded-2xl shadow-sm px-6 mb-12">
        <h2 className="text-slate-800 text-3xl md:text-4xl font-bold text-center relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-20 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
            Our Products
          </span>
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Discover our carefully selected range of premium products, designed to
          enhance your lifestyle with quality and elegance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <ProductCard
                image={product.image}
                productName={product.productName}
                description={product.description}
                specialPrice={product.specialPrice}
                price={product.price}
                about={true}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/products")}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default About;
