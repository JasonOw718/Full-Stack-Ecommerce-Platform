const initialState = {
  products: [],
  categories: [],
  pagination: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      if (action.payload == undefined) action.payload = [];

      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "FETCH_CATEGORIES":
      if (action.payload == undefined) action.payload = [];

      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};
