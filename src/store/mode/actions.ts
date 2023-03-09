import { createAction } from "@reduxjs/toolkit";
import { ModeEnum } from "./type";

export const changeModeAction = createAction<{
  mode: ModeEnum;
}>("changeModeAction");
