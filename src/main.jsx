import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";

// Import Manrope weights into the bundle
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";

import { store } from "./app/store";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
