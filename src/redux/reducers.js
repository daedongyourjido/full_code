const initialState = {
  images: [],
  login: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };

    case "SET_LOGIN" :
      return {
        ...state,
        login: action.payload,
      }

    default:
      return {
        ...state,
      };
  }
};

export default dataReducer;
