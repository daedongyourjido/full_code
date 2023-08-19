const initialState = {
  images: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default dataReducer;
