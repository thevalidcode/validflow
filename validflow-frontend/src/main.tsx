import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { startBackend } from "./backend";
import { BrowserRouter } from "react-router-dom";

startBackend();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("❌ Root element not found");

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
