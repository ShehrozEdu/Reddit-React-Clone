import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ThemeProvider } from "@material-tailwind/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContextAPIProvider } from "./components/Context/ContextAPIContext ";
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ThemeProvider>
      <ContextAPIProvider>
        <ToastContainer className={"z-index-custom"}/>
        <App />
      </ContextAPIProvider>
    </ThemeProvider>
  </Router>
);
