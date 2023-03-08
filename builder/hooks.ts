import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import {
  chooseBuilderSectionAction,
  removeBuilderSectionAction,
} from "./actions";
import { Section } from "./type";

export type UseCalcBuilderResult = {
  allSections: Section[];
  chosenSections: Section[];
  getSectionById: (sectionId: Section["id"]) => Section;
  getChosenSectionById: (sectionId: Section["id"]) => Section;
};

export function useCalcBuilder(): UseCalcBuilderResult {
  const allBuilderSections = useAppSelector(state => state.builder.allSections);
  const chosenBuilderSections = useAppSelector(
    state => state.builder.chosenSections,
  );

  function getSectionById(sectionId: Section["id"]): Section {
    return allBuilderSections[sectionId];
  }

  function getChosenSectionById(sectionId: Section["id"]): Section {
    return chosenBuilderSections.find(s => s.id === sectionId)!;
  }

  return {
    allSections: Object.values(allBuilderSections),
    chosenSections: chosenBuilderSections,
    getSectionById,
    getChosenSectionById,
  };
}

export type UseCalcBuilderActionsResult = {
  chooseBuilderSection: (sectionId: Section["id"], toIndex: number) => void;
  removeBuilderSection: (sectionId: Section["id"]) => void;
};

export function useCalcBuilderActions(): UseCalcBuilderActionsResult {
  const dispatch = useAppDispatch();

  function chooseBuilderSection(
    sectionId: Section["id"],
    toIndex: number,
  ): void {
    dispatch(chooseBuilderSectionAction({ sectionId, toIndex }));
  }

  function removeBuilderSection(sectionId: Section["id"]): void {
    dispatch(removeBuilderSectionAction({ sectionId }));
  }

  return {
    chooseBuilderSection,
    removeBuilderSection,
  };
}
