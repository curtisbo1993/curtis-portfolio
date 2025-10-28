import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// IMPORTANT: this must match the default export name below
import AppShell from "./PortfolioMock";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
);
