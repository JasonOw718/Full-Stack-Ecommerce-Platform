import { useDispatch, useSelector } from "react-redux";
import Loader from "./shared/Loader";
import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchUserOrder } from "../store/action";

function Order() {
  const { order, isLoading } = useSelector((state) => state.auth);
  const [expandedOrders, setExpandedOrders] = useState({});
  const navigate = useNavigate();

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes("accept"))
      return "bg-green-100 text-green-800";
    if (status.toLowerCase().includes("progress"))
      return "bg-blue-100 text-blue-800";
    if (status.toLowerCase().includes("ship"))
      return "bg-purple-100 text-purple-800";
    if (status.toLowerCase().includes("deliver"))
      return "bg-indigo-100 text-indigo-800";
    if (status.toLowerCase().includes("cancel"))
      return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  if (isLoading) return <Loader />;
  if (!order || order.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <h1 className="text-slate-800 text-3xl font-bold mb-6">My Orders</h1>
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-lg mx-auto">
            <div className="text-gray-600 mb-6">
              You don't have any orders yet.
            </div>
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center mb-16 relative">
        <span className="relative inline-block after:content-[''] after:absolute after:w-24 after:h-1 after:bg-indigo-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full pb-4">
          My Orders
        </span>
      </h1>

      <div className="space-y-8">
        {order.map((orderItem) => (
          <div
            key={orderItem.orderId}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer"
              onClick={() => toggleOrderExpansion(orderItem.orderId)}
            >
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-sm">Order ID:</span>
                  <span className="font-semibold"># {orderItem.orderId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">Order Date:</span>
                  <span className="font-semibold">
                    {formatDate(orderItem.orderDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-gray-500 text-sm">Total Amount:</span>
                  <span className="font-bold text-lg text-slate-800">
                    RM {orderItem.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium RM{getStatusColor(
                      orderItem.orderStatus
                    )}`}
                  >
                    {orderItem.orderStatus}
                  </span>
                </div>

                <div>
                  {expandedOrders[orderItem.orderId] ? (
                    <MdExpandLess className="text-2xl text-indigo-500" />
                  ) : (
                    <MdExpandMore className="text-2xl text-indigo-500" />
                  )}
                </div>
              </div>
            </div>

            {expandedOrders[orderItem.orderId] && (
              <div className="border-t border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-6">
                    {orderItem.orderItems.map((item) => (
                      <div
                        key={item.orderItemId}
                        className="flex flex-col md:flex-row gap-6"
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">
                            {item.product.productName}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {item.product.description}
                          </p>
                          <div className="flex items-center gap-6">
                            <div className="text-gray-500 text-sm">
                              Quantity:{" "}
                              <span className="font-semibold text-slate-800">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="text-gray-500 text-sm">
                              Unit Price:{" "}
                              <span className="font-semibold text-slate-800">
                                RM{item.orderedProductPrice.toFixed(2)}
                              </span>
                            </div>
                            {item.discount > 0 && (
                              <div className="text-gray-500 text-sm">
                                Discount:{" "}
                                <span className="font-semibold text-green-600">
                                  {item.discount}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800">
                            RM
                            {(item.orderedProductPrice * item.quantity).toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Payment Information
                    </h3>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        {orderItem.payment.pgStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">
                        {orderItem.payment.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Processor</p>
                      <p className="font-medium">{orderItem.payment.pgName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium text-xs md:text-sm">
                        {orderItem.payment.pgPaymentId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status Message</p>
                      <p className="font-medium">
                        {orderItem.payment.pgResponseMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
