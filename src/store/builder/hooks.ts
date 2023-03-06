import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  chooseBuilderSectionAction,
  removeBuilderSectionAction,
} from "./actions";
import { ChosenSection, Section } from "./type";

export type UseCalcBuilderResult = {
  allSections: Section[];
  chosenSections: Section[];
  getSectionById: (sectionId: Section["id"]) => Section;
  getChosenSectionById: (sectionId: Section["id"]) => ChosenSection;
};

export function useCalcBuilder(): UseCalcBuilderResult {
  const allBuilderSections = useAppSelector(state => state.builder.allSections);
  const chosenBuilderSections = useAppSelector(
    state => state.builder.chosenSections,
  );

  function getSectionById(sectionId: Section["id"]): Section {
    return allBuilderSections[sectionId];
  }

  function getChosenSectionById(sectionId: Section["id"]): ChosenSection {
    return chosenBuilderSections[sectionId];
  }

  return {
    allSections: Object.values(allBuilderSections),
    chosenSections: Object.values(chosenBuilderSections).sort(
      (a, b) => a.orderIndex - b.orderIndex,
    ),
    getSectionById,
    getChosenSectionById,
  };
}

export type UseCalcBuilderActionsResult = {
  chooseBuilderSection: (sectionId: Section["id"]) => void;
  removeBuilderSection: (sectionId: Section["id"]) => void;
};

export function useCalcBuilderActions(): UseCalcBuilderActionsResult {
  const dispatch = useAppDispatch();

  function chooseBuilderSection(sectionId: Section["id"]): void {
    dispatch(chooseBuilderSectionAction({ sectionId }));
  }

  function removeBuilderSection(sectionId: Section["id"]): void {
    dispatch(removeBuilderSectionAction({ sectionId }));
  }

  return {
    chooseBuilderSection,
    removeBuilderSection,
  };
}
