import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppStoreProvider from "./Store/AppStore.jsx";
import AuthStoreProvider from "./Store/AuthStore.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppStoreProvider>
        <AuthStoreProvider>
          <App />
        </AuthStoreProvider>
      </AppStoreProvider>
    </BrowserRouter>
  </StrictMode>
);
