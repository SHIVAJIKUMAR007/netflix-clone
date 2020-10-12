import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./compo/App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./StateProvider";
import { cartReducer, initialState} from './reducer/cartReducer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <StateProvider initialState = {initialState}  reducer = {cartReducer}>
      <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
