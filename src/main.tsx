import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppShell from "./PortfolioMock";

// ❌ Remove this if present:
// import { inject } from "@vercel/analytics";
// inject();

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppShell />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
