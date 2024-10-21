import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Entry point is the main.js
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
