import { createSlice } from "@reduxjs/toolkit";
import {
  chooseBuilderSectionAction,
  removeBuilderSectionAction,
} from "./actions";
import { SECTIONS } from "./sections";
import { ChosenSection, Section } from "./type";

export type SectionCollection<
  T extends Record<"id", string | number | symbol>,
> = Record<T["id"], T>;

export type BuilderState = {
  allSections: SectionCollection<Section>;
  chosenSections: SectionCollection<ChosenSection>;
};

const initialState: BuilderState = {
  allSections: SECTIONS.reduce<SectionCollection<Section>>((all, section) => {
    all[section.id] = section;
    return all;
  }, {}),
  chosenSections: {},
};

const builderSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(chooseBuilderSectionAction, (state, action) => {
        const currentOrderIndex = Object.values(state.chosenSections).length;

        for (const chosenSection of Object.values(state.chosenSections)) {
          if (chosenSection.orderIndex >= currentOrderIndex) {
            chosenSection.orderIndex++;
          }
        }

        state.chosenSections[action.payload.sectionId] = {
          ...state.allSections[action.payload.sectionId],
          orderIndex: Object.values(state.chosenSections).length,
        };
      })
      .addCase(removeBuilderSectionAction, (state, action) => {
        const deletedChosenSectionOrderIndex =
          state.chosenSections[action.payload.sectionId].orderIndex;

        for (const chosenSection of Object.values(state.chosenSections)) {
          if (chosenSection.orderIndex >= deletedChosenSectionOrderIndex) {
            chosenSection.orderIndex--;
          }
        }

        delete state.chosenSections[action.payload.sectionId];
      });
  },
});

export const builderReducer = builderSlice.reducer;
