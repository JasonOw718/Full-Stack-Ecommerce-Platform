import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.get("public/categories");
    dispatch({ type: "FETCH_CATEGORIES", payload: response.data.content });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const fetchUserCart = () => async (dispatch) => {
  try {
    dispatch({ type: "IN_PROGRESS" });
    const response = await api.get(`carts/users/cart`);
    dispatch({ type: "USER_CART", payload: response.data });
  } catch (err) {
    dispatch({ type: "ERROR" });
  }
};

export const addToCart =
  (cartItem, loggedIn, currentQuantity = null, setCurrentQuantity = null) =>
  async (dispatch, getState) => {
    if (loggedIn) {
      dispatch(
        userAddToCart(
          cartItem,
          dispatch,
          getState,
          currentQuantity,
          setCurrentQuantity
        )
      );
    } else {
      dispatch(
        guestAddToCart(
          cartItem,
          dispatch,
          getState,
          currentQuantity,
          setCurrentQuantity
        )
      );
    }
  };

const userAddToCart =
  (cartItem, dispatch, getState, currentQuantity, setCurrentQuantity) =>
  async () => {
    dispatch({ type: "IN_PROGRESS" });
    const cart = getState().auth.userCart;
    const atcProduct = getState().products.products.find(
      (product) => product.productId === cartItem.productId
    );

    if (!atcProduct) return;

    const existingCartItem = cart.find(
      (c) => c.productId === cartItem.productId
    );
    if (atcProduct.quantity == 0) {
      toast.error("Out of Stock");
      return;
    }

    const apiEndpoint = existingCartItem
      ? `cart/products/${atcProduct.productId}/quantity/add`
      : `carts/products/${atcProduct.productId}/quantity/1`;

    try {
      const response = await (existingCartItem
        ? api.put(apiEndpoint)
        : api.post(apiEndpoint));

      dispatch({ type: "USER_ADD_CART", payload: response.data });
      if (currentQuantity != null) setCurrentQuantity(currentQuantity + 1);
      toast.success(existingCartItem ? "Quantity Added" : "Item added to cart");
    } catch (error) {
      dispatch({ type: "ERROR" });
      toast.error(
        existingCartItem
          ? "Cannot add more, stock limit reached"
          : "Failed to add to cart"
      );
    }
  };
const guestAddToCart = (cartItem, dispatch, getState) => async () => {
  const cart = getState().cart.cart;
  const atcProduct = getState().products.products.find(
    (product) => product.productId === cartItem.productId
  );

  if (!atcProduct) return;

  const existingCartItem = cart.find((c) => c.productId === cartItem.productId);

  if (existingCartItem) {
    if (atcProduct.quantity > existingCartItem.quantity) {
      const updatedCart = cart.map((item) =>
        item.productId === cartItem.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      dispatch({ type: "ADD_TO_CART", payload: updatedCart });
      toast.success("Quantity Added");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.error("Cannot add more, stock limit reached");
    }
  } else {
    if (atcProduct.quantity > 0) {
      const updatedCart = [...cart, cartItem];
      dispatch({ type: "ADD_TO_CART", payload: updatedCart });
      toast.success("Item added to cart");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.error("Item is out of stock");
    }
  }
};

export const decreaseCartItemQuantity =
  (cartItem, loggedIn) => async (dispatch, getState) => {
    if (loggedIn) {
      dispatch({ type: "IN_PROGRESS" });

      const cart = getState().auth.userCart;
      const item = cart.find((c) => c.productId === cartItem.productId);

      if (!item) {
        dispatch({ type: "ERROR" });
        return;
      }

      if (item.quantity === 1) {
        dispatch(removeCartItem(item, loggedIn));
      } else {
        try {
          const response = await api.put(
            `cart/products/${item.productId}/quantity/delete`
          );
          dispatch({ type: "USER_DELETE_QUANTITY", payload: response.data });
        } catch (err) {
          dispatch({ type: "ERROR" });
          toast.error("Error in reducing quantity");
        }
      }
    } else {
      const cart = getState().cart.cart;
      const item = cart.find((c) => c.productId === cartItem.productId);

      if (!item) return;

      if (item.quantity === 1) {
        dispatch(removeCartItem(item, loggedIn));
      } else {
        const updatedCart = cart.map((item) =>
          item.productId === cartItem.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        dispatch({ type: "DECREASE_QUANTITY", payload: updatedCart });
        localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
      }
    }
  };

export const removeCartItem =
  (cartItem, loggedIn) => async (dispatch, getState) => {
    if (loggedIn) {
      dispatch({ type: "IN_PROGRESS" });
      try {
        const response = await api.delete(
          `carts/product/${cartItem.productId}`
        );
        dispatch({ type: "USER_REMOVE_ITEM", payload: response.data });

        toast.success("product removed successful");
      } catch (err) {
        dispatch({ type: "ERROR" });
        toast.error("Error occured, please try again later");
      }
    } else {
      const cart = getState().cart.cart.filter(
        (c) => c.productId !== cartItem.productId
      );
      dispatch({ type: "REMOVE_FROM_CART", payload: cart });
      localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
      toast.success("Cart Item Removed");
    }
  };

export const authenticateUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.post("auth/signin", data);
    dispatch({ type: "LOGIN", payload: response.data });
    toast.success("Login successfull");
    dispatch(fetchUserCart());
    navigate("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR" });
    toast.error(err.message);
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: "IN_PROGRESS" });
    const response = await api.get("/auth/user");
    dispatch({ type: "USER_LOGGED_IN", payload: response.data });
  } catch (e) {
    dispatch({ type: "AUTH_ERROR" });
  }
};

export const LogOutAccount = (navigate) => async (dispatch) => {
  try {
    await api.post("/auth/logout");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Successful");
    navigate("/");
  } catch (e) {
    dispatch({ type: "AUTH_ERROR" });
    toast.error("Error Occured. Unable to Logout");
  }
};

export const SignUpAccount = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("auth/signup", data);
    dispatch({ type: "IS_SUCCESS" });

    toast.success("sign up successfull");
    navigate("/login");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "IS_ERROR",
    });
    toast.error(err.response.data.reason);
  }
};

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.get("users/addresses");
    dispatch({ type: "ADDRESS", payload: response.data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.data });
  }
};

export const selectUserCheckoutAddress = (address) => async (dispatch) => {
  dispatch({ type: "SELECT_ADDRESS", payload: address });
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
};

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`addresses/${id}`);
    dispatch({ type: "DELETE_ADDRESS", payload: id });
    toast.success("Address deleted successfully");
  } catch (err) {
    toast.error(err.message);
    dispatch({ type: "IS_ERROR", payload: err.data });
  }
};

export const addUpdateUserAddress =
  (data, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "IS_FETCHING" });
    try {
      if (addressId) {
        const response = await api.put(`addresses/${addressId}`, data);
        dispatch({ type: "UPDATE_ADDRESS", payload: response.data });
        toast.success("Address updated successfully");
      } else {
        const response = await api.post("addresses", data);
        dispatch({ type: "CREATE_ADDRESS", payload: response.data });
        toast.success("Address created successfully");
      }
      dispatch({ type: "IS_SUCCESS" });
      setOpenAddressModal(false);
    } catch (err) {
      dispatch({ type: "IS_ERROR" });
      toast.error(err.message);
    }
  };

export const updatePaymentMethod = (paymentChoice) => (dispatch) => {
  dispatch({ type: "UPDATE_PAYMENT_METHOD", payload: paymentChoice });
};

export const fetchClientSecret = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.post("stripe/checkout/payment-intent", {
      totalPrice: getState().auth.userTotalPrice,
      cartItems: getState().auth.userCart,
    });
    dispatch({ type: "GET_CLIENT_SECRET", payload: response.data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.message });
  }
};

export const getPaymentStatus = (data) => async (dispatch) => {
  try {
    const response = await api.get(`stripe/payment-intent/${data.pgPaymentId}`);
    dispatch({ type: "UPDATE_PAYMENT_STATUS", payload: response.data });
    if (response.data === "succeeded")
      dispatch(stripePaymentConfirmation(data));
  } catch (err) {}
};

export const stripePaymentConfirmation = (sendData) => async (dispatch) => {
  try {
    const response = await api.post("/order/users/payments/online", sendData);
    if (response.data) {
      dispatch({ type: "PLACE_ORDER" });
      localStorage.removeItem("CHECKOUT_ADDRESS");
    }
  } catch (error) {
    toast.error("Payment Failed. Please try again.");
  }
};

export const fetchUserOrder = () => async (dispatch) => {
  try {
    const response = await api.get("order/user");
    dispatch({ type: "UPDATE_ORDER", payload: response.data });
  } catch (err) {
    toast.error(err.message);
  }
};
