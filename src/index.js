import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import ApolloProvider from "./ApolloProvider";
import { watchAuthSaga } from "./store/sagas/index";
import authReducer from "./store/reducer/auth";

const rootReducer = combineReducers({
  authReducer,
});
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
