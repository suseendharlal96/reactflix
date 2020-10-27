import { takeEvery } from "redux-saga/effects";

import * as actionType from "../action/actionType";
import { logoutSaga, storeAuthSaga } from "./authSaga";

export function* watchAuthSaga() {
  yield takeEvery(actionType.STORE_AUTH_DATA_SAGA, storeAuthSaga);
  yield takeEvery(actionType.LOGOUT_SAGA, logoutSaga);
}
