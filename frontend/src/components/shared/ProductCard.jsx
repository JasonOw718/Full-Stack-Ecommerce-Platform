import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../utility/truncateText";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/action";
function ProductCard({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;

  const dispatch = useDispatch();
  const { user,isLoading } = useSelector((state) => state.auth);

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  return (
    <div className=" rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView({
            id: productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        ></img>
      </div>
      <div className="p-4 flex flex-col">
        <h2
          onClick={() => {
            handleProductView({
              id: productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            });
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(productName)}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">{truncateText(description)}</p>
        </div>

        {!about && (
          <div className="flex items-center justify-between gap-x-5">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  RM{Number(price).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  RM{Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                {"  "}RM{Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable || isLoading}
              onClick={() => {
                dispatch(
                  addToCart(
                    {
                      image: image,
                      productName: productName,
                      description: description,
                      specialPrice: specialPrice,
                      price: price,
                      productId: productId,
                      quantity: 1,
                    },
                    user ? true : false
                  )
                );
              }}
              className={`text-[13.6px] bg-blue-500 RM${
                isAvailable
                  ? "opacity-100 hover:bg-blue-600 cursor-pointer"
                  : "opacity-70"
              }
                        text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Stock Out"}
            </button>
          </div>
        )}
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
}

export default ProductCard;
