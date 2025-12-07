import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainApp } from "@/apps/MainApp/MainApp";
import { RootStoreProvider } from "@/stores/rootStore";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootStoreProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </RootStoreProvider>
  </React.StrictMode>
);

import reportWebVitals from "@/reportWebVitals";
reportWebVitals(console.log);
