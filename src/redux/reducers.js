const initialState = {
  images: [],
  login: false,
  deleteDialogOpen: false,
  likeChange: -1,
  likeChangePost: -1,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };

    case "SET_LOGIN":
      return {
        ...state,
        login: action.payload,
      };

    case "SET_DELETE_DIALOG_OPEN":
      return {
        ...state,
        deleteDialogOpen: action.payload,
      };

    case "SET_LIKE_CHANGE":
      return {
        ...state,
        likeChange: action.payload,
      };
    
    case "SET_LIKE_CHANGE_POST":
      return {
        ...state,
        likeChangePost: action.payload
      };

    default:
      return {
        ...state,
      };
  }
};

export default dataReducer;
