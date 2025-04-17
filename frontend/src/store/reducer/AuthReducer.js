const initialState = {
  user: null,
  addresses: [],
  selectedUserCheckoutAddress: null,
  isLoading: null,
  userCart: [],
  userTotalPrice: 0,
  clientSecret: null,
  paymentStatus: null,
  order: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "GET_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        isLoading: false,
      };
    case "PLACE_ORDER":
      return {
        ...state,
        clientSecret: null,
        userCart: [],
        userTotalPrice: 0,
        selectedUserCheckoutAddress: null,
      };

    case "UPDATE_ORDER":
      return {
        ...state,
        order: action.payload,
        isLoading: false,
      };

    case "USER_ADD_CART":
    case "USER_CART":
    case "USER_DELETE_QUANTITY":
    case "USER_REMOVE_ITEM":
      return {
        ...state,
        isLoading: false,
        userCart: action.payload.cartItems,
        userTotalPrice: action.payload.totalPrice,
      };

    case "UPDATE_PAYMENT_STATUS":
      return {
        ...state,
        paymentStatus: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
    case "USER_DOESNT_EXIST":
      return {
        user: null,
        addresses: [],
        selectedUserCheckoutAddress: null,
        isLoading: false,
        userCart: [],
        userTotalPrice: 0,
        clientSecret: null,
        paymentStatus: null,
        order: [],
      };

    case "IN_PROGRESS":
      return {
        ...state,
        isLoading: true,
      };

    case "ADDRESS":
      return {
        ...state,
        addresses: action.payload,
      };

    case "SELECT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress: action.payload,
      };

    case "UPDATE_ADDRESS": {
      const updatedAddresses = state.addresses.map((a) => {
        if (a.addressId === action.payload.addressId) return action.payload;
        return a;
      });
      return {
        ...state,
        addresses: updatedAddresses,
      };
    }

    case "DELETE_ADDRESS": {
      const updatedList = state.addresses.filter(
        (a) => a.addressId !== action.payload
      );
      return {
        ...state,
        addresses: updatedList,
      };
    }
    case "CREATE_ADDRESS":
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };

    case "ERROR":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
