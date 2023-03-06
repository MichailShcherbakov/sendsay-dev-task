import { createAction } from "@reduxjs/toolkit";

export const chooseBuilderSectionAction = createAction<{ sectionId: string }>(
  "chooseBuilderSectionAction",
);

export const removeBuilderSectionAction = createAction<{ sectionId: string }>(
  "removeBuilderSectionAction",
);
