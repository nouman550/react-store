import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import allReducers from "./reducers/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./app";

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </Provider>,
  document.getElementById("root")
);
