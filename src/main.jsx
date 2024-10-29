import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./Context/User.jsx";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "./Context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserContextProvider>
    <ToastContainer />
  </>
);