import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { UserContextProvider } from "./store/user/user-provider.tsx";
import { AppStateContextProvider } from "./store/app-state/app-state-provdier..tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AppStateContextProvider>
  </React.StrictMode>
);
