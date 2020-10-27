import * as actionType from "./actionType";

export const storeAuthData = (authData) => ({
  type: actionType.STORE_AUTH_DATA_SAGA,
  authData,
});

export const logout = () => ({
  type: actionType.LOGOUT_SAGA,
});
