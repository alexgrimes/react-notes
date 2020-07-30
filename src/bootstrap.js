import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import rootReducer from "./reducers/rootReducer.js";
import "./style/main.scss";


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

function main() {
  ReactDOM.render(
    <Provider store={store}>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </Provider>,
    document.querySelector("#root")
  );
}

document.addEventListener("DOMContentLoaded", main);
