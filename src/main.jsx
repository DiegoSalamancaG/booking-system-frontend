import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ErrorFallback from "./components/common/errorFallback";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {window.location.reload();}}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);