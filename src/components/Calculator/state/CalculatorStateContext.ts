import React from "react";
import { Section } from "~/store/builder/type";
import { CalculatorState } from "./type";

export function createInitialState(sections: Section[] = []): CalculatorState {
  return {
    sections,
  };
}

export type CalculatorStateContextType = {
  state: CalculatorState;
};

export const CalculatorStateContext =
  React.createContext<CalculatorStateContextType>({
    state: {
      sections: [],
    },
  });
