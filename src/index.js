import React from "react";
import ReactDOM from "react-dom";

//step 1: add redux and react-redux dependencies
//then import them as such
import { createStore } from "redux";

//step 3: add provider from react redux to connect our store
//to our components "provide"
import { Provider } from "react-redux";
import App from "./App";

//step 7: import reducer and pass it as an argument in createStore()
//go to Todolist.js after
import reducer from "./reducer/reducer";

//step 2 create a store, leave argument empty for now
const store = createStore(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

//step 4: create a reducer folder and file
