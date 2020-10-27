import * as actionType from "../action/actionType";

const initState = {
  authData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.STORE_AUTH_DATA:
      const { authData } = action;
      return {
        ...state,
        authData,
      };

    case actionType.LOGOUT:
      return {
        ...state,
        authData: null,
      };

    default:
      return state;
  }
};

export default authReducer;
