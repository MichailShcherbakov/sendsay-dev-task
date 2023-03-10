import React from "react";
import { CalculatorDispatchContext } from "./CalculatorDispatchContext";
import {
  CalculatorStateContext,
  CalculatorStateContextType,
} from "./CalculatorStateContext";
import { CalculatorStateActionEnum } from "./type";

export * from "./CalculatorStateProvider";

export * from "./type";

export function useCalculatorState() {
  const { state } = React.useContext<CalculatorStateContextType>(
    CalculatorStateContext,
  );

  return state;
}

export function useCalculatorStateAction() {
  const { dispatch } = React.useContext(CalculatorDispatchContext);

  const setDisplayValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: CalculatorStateActionEnum.SET_DISPLAY_VALUE,
        payload: value,
      });
    },
    [dispatch],
  );

  return {
    setDisplayValue,
  };
}
