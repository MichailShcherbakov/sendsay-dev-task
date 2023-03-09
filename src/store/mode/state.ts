import { createSlice } from "@reduxjs/toolkit";
import { changeModeAction } from "./actions";
import { ModeEnum } from "./type";

export type ModeState = {
  value: ModeEnum;
};

const initialState: ModeState = {
  value: ModeEnum.BUILDER,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeModeAction, (state, action) => {
      state.value = action.payload.mode;
    });
  },
});

export const modeReducer = modeSlice.reducer;
