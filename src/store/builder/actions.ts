import { createAction } from "@reduxjs/toolkit";

export const chooseBuilderSectionAction = createAction<{
  sectionId: string;
  toIndex: number;
}>("chooseBuilderSectionAction");

export const removeBuilderSectionAction = createAction<{ sectionId: string }>(
  "removeBuilderSectionAction",
);
