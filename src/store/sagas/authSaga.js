import { put } from "redux-saga/effects";

import * as actionType from "../action/actionType";

export function* storeAuthSaga({ authData }) {
  yield put({ type: actionType.STORE_AUTH_DATA, authData });
}

export function* logoutSaga() {
  yield put({ type: actionType.LOGOUT });
}
