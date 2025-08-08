import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
