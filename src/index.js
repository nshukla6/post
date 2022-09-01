import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
// import { register } from "./swDev";

import { Provider } from "react-redux";
import { store } from "./store";
import { fetchUsers } from "./features/users/userSlice";
import { fetchPosts } from "./features/posts/postSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));


store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// register();
