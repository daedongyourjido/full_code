export const setImages = (item) => {
  return {
    type: "SET_IMAGES",
    payload: item,
  };
};

export const setLogin = (item) => {
  return {
    type: "SET_LOGIN",
    payload: item,
  };
};

export const setDeleteDialogOpen = (item) => {
  return {
    type: "SET_DELETE_DIALOG_OPEN",
    payload: item,
  }
}

export const setLikeCount = (item) => {
  return {
    type: "SET_LIKE_COUNT",
    payload: item,
  }
}

export const setLikeChange = (item) => {
  return {
    type: "SET_LIKE_CHANGE",
    payload: item
  }
}

export const setLikeChangePost = (item) => {
  return {
    type: "SET_LIKE_CHANGE_POST",
    payload: item
  }
}
