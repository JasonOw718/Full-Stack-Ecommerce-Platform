const initialState = {
  cart: [],
  totalPrice: 0,
  isLoading: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
    case "DECREASE_QUANTITY":
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: action.payload,
        totalPrice: action.payload.reduce(
          (acc, item) => acc + item.specialPrice * item.quantity,
          0
        ),
      };
    }

    case "REMOVE_CART":
      return {
        cart: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};
