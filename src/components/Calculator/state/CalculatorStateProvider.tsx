import React, { Reducer } from "react";
import { Section } from "~/store/builder/type";
import {
  CalculatorState,
  CalculatorStateAction,
  CalculatorStateActionEnum,
} from ".";
import { isFunc } from "../../../tools/isFunc";
import {
  CalculatorDispatchContext,
  CalculatorDispatchContextType,
} from "./CalculatorDispatchContext";
import {
  createInitialState,
  CalculatorStateContext,
  CalculatorStateContextType,
} from "./CalculatorStateContext";
import { reducer } from "./reducer";

export interface CalculatorStateProviderProps {
  sections: Section[];
  children?: ((state: CalculatorState) => React.ReactNode) | React.ReactNode;
}

export function CalculatorStateProvider({
  sections,
  children,
}: CalculatorStateProviderProps) {
  const [state, dispatch] = React.useReducer<
    Reducer<CalculatorState, CalculatorStateAction>,
    Section[]
  >(reducer, sections, createInitialState);

  React.useEffect(() => {
    dispatch({
      type: CalculatorStateActionEnum.SET_SECTIONS,
      payload: sections,
    });
  }, [sections]);

  const stateContextValue = React.useMemo<CalculatorStateContextType>(
    () => ({
      state,
    }),
    [state],
  );

  const dispatchContextValue = React.useMemo<CalculatorDispatchContextType>(
    () => ({
      dispatch,
    }),
    [dispatch],
  );

  return (
    <CalculatorStateContext.Provider value={stateContextValue}>
      <CalculatorDispatchContext.Provider value={dispatchContextValue}>
        {isFunc(children) ? children(state) : children}
      </CalculatorDispatchContext.Provider>
    </CalculatorStateContext.Provider>
  );
}
