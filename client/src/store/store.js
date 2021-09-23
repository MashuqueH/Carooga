import { configureStore } from "@reduxjs/toolkit";
import vehicles from "./reducers/vehicles";

export const store = configureStore({
    reducer: {
        vehicles,
    },
});
