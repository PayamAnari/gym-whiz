import React from "react";
import ReactDOM from "react-dom";
import "../public/assets/styles/reset.css";
import AppWrapper from "./AppWrapper";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById("root")
);
