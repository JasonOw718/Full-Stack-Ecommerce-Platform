import { formatPriceCalculation } from "../utility/formatPrice";

function OrderItem({item}) {
  return (
    <>
      <div
        key={item?.productId}
        className="flex items-center p-4 hover:bg-gray-50"
      >
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item?.productName}
            className="w-16 h-16 object-cover rounded-md border border-gray-200"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-medium text-gray-800">{item?.productName}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {item?.quantity} ×{" "}
            <span className="text-indigo-600 font-medium">
              RM{item?.specialPrice}
            </span>
          </p>
        </div>
        <div className="ml-4 text-right">
          <p className="font-semibold text-gray-800">
            RM
            {formatPriceCalculation(item?.quantity, item?.specialPrice)}
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
