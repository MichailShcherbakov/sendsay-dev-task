import React from "react";
import { DraggableListState } from "./type";

export function createInitialState<TItem>(
  items: TItem[] = [],
): DraggableListState<TItem> {
  return {
    items,
    dropTarget: null,
  };
}

export type DraggableListStateContextType<TItem = unknown> = {
  state: DraggableListState<TItem>;
};

export const DraggableListStateContext =
  React.createContext<DraggableListStateContextType>({
    state: {
      items: [],
      dropTarget: null,
    },
  });
