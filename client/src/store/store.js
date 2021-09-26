import { configureStore } from "@reduxjs/toolkit";
import vehicles from "./reducers/vehicles";
import alerts from "./reducers/alerts";

export const store = configureStore({
    reducer: {
        vehicles,
        alerts,
    },
});
