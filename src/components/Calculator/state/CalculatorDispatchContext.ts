import React from "react";
import { CalculatorStateAction } from "./type";

export function createInitialState(): CalculatorDispatchContextType {
  return {
    dispatch: () => {},
  };
}

export type CalculatorDispatchContextType = {
  dispatch: (action: CalculatorStateAction) => void;
};

export const CalculatorDispatchContext =
  React.createContext<CalculatorDispatchContextType>({
    dispatch: () => {},
  });
