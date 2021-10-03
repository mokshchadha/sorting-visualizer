import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SortingVisualizer from "./sortingVisualizer";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <SortingVisualizer />
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
