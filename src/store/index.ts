import { configureStore } from "@reduxjs/toolkit";
import { builderReducer } from "./builder/state";
import { modeReducer } from "./mode/state";

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
