import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    app: AppSlice,
  },
});
