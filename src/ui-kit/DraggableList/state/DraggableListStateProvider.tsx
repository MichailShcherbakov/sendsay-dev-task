import React, { Reducer } from "react";
import {
  DraggableListState,
  DraggableListStateAction,
  DraggableListStateActionEnum,
} from ".";
import { isFunc } from "../../../tools/isFunc";
import {
  DraggableListDispatchContext,
  DraggableListDispatchContextType,
} from "./DraggableListDispatchContext";
import {
  createInitialState,
  DraggableListStateContext,
  DraggableListStateContextType,
} from "./DraggableListStateContext";
import { reducer } from "./reducer";

export interface DraggableListStateProviderProps<TItem> {
  items: TItem[];
  children?:
    | ((state: DraggableListState<TItem>) => React.ReactNode)
    | React.ReactNode;
}

export function DraggableListStateProvider<TItem>({
  items,
  children,
}: DraggableListStateProviderProps<TItem>) {
  const [state, dispatch] = React.useReducer<
    Reducer<DraggableListState<TItem>, DraggableListStateAction<TItem>>,
    TItem[]
  >(reducer, items, createInitialState);

  React.useEffect(() => {
    dispatch({ type: DraggableListStateActionEnum.SET_ITEMS, payload: items });
  }, [items]);

  const stateContextValue = React.useMemo<DraggableListStateContextType>(
    () => ({
      state,
    }),
    [state],
  );

  const dispatchContextValue = React.useMemo<DraggableListDispatchContextType>(
    () => ({
      dispatch: dispatch as (action: DraggableListStateAction<unknown>) => void,
    }),
    [dispatch],
  );

  return (
    <DraggableListStateContext.Provider value={stateContextValue}>
      <DraggableListDispatchContext.Provider value={dispatchContextValue}>
        {isFunc(children) ? children(state) : children}
      </DraggableListDispatchContext.Provider>
    </DraggableListStateContext.Provider>
  );
}
