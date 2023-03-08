import { createSlice } from "@reduxjs/toolkit";
import {
  chooseBuilderSectionAction,
  removeBuilderSectionAction,
} from "./actions";
import { SECTIONS } from "./sections";
import { Section } from "./type";

export type SectionMap<TType extends Record<"id", string | number | symbol>> =
  Record<TType["id"], TType>;

export type SectionCollection<TType> = TType[];

export type BuilderState = {
  allSections: SectionMap<Section>;
  chosenSections: SectionCollection<Section>;
};

const initialState: BuilderState = {
  allSections: SECTIONS.reduce<SectionMap<Section>>((all, section) => {
    all[section.id] = section;
    return all;
  }, {}),
  chosenSections: [],
};

const builderSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(chooseBuilderSectionAction, (state, action) => {
        let newOrderIndex = action.payload.toIndex;

        const oldIndex = state.chosenSections.findIndex(
          s => s.id === action.payload.sectionId,
        );

        /// if the item already exists, we need to remove it before inserting
        if (oldIndex !== -1) {
          state.chosenSections.splice(oldIndex, 1);

          newOrderIndex =
            newOrderIndex > oldIndex ? newOrderIndex - 1 : newOrderIndex;
        }

        state.chosenSections.splice(
          newOrderIndex,
          0,
          state.allSections[action.payload.sectionId],
        );
      })
      .addCase(removeBuilderSectionAction, (state, action) => {
        const index = state.chosenSections.findIndex(
          s => s.id === action.payload.sectionId,
        );

        if (index === -1) return;

        state.chosenSections.splice(index, 1);
      });
  },
});

export const builderReducer = builderSlice.reducer;
