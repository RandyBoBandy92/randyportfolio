import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import "./styles/styles.scss";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);
