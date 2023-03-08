import React from "react";
import { DraggableListStateAction } from "./type";

export function createInitialState<
  TItem,
>(): DraggableListDispatchContextType<TItem> {
  return {
    dispatch: () => {},
  };
}

export type DraggableListDispatchContextType<TItem = unknown> = {
  dispatch: (action: DraggableListStateAction<TItem>) => void;
};

export const DraggableListDispatchContext =
  React.createContext<DraggableListDispatchContextType>({
    dispatch: () => {},
  });
