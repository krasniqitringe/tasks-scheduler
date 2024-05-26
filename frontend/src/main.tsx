import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/sass/main.scss";

import Navigation from "./navigation/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>
);
