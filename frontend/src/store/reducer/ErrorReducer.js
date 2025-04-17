const initialState = {
  isLoading: null,
  error: "",
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
   
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
