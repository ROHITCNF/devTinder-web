import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Entry point is the main.js

/*
  <StrictMode> in Dev mode cause page rendering twice in production mode 
  this renders onlyonce 
*/
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <App />
);
