import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import Routes from "./routes";
import reducers from "./reducers/index";
import { AUTH_USER } from "./actions/types";
import "./index.css";
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector("#root")
);
