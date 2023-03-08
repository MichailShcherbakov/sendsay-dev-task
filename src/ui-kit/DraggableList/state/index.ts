import React from "react";
import { DropTarget } from "../type";
import { DraggableListDispatchContext } from "./DraggableListDispatchContext";
import {
  DraggableListStateContext,
  DraggableListStateContextType,
} from "./DraggableListStateContext";
import { DraggableListStateActionEnum } from "./type";

export * from "./DraggableListStateProvider";

export * from "./type";

export function useDraggableListState<TItem>() {
  const { state } = React.useContext<DraggableListStateContextType<TItem>>(
    DraggableListStateContext as React.Context<
      DraggableListStateContextType<TItem>
    >,
  );

  return state;
}

export function useDraggableListStateAction() {
  const { dispatch } = React.useContext(DraggableListDispatchContext);

  function showDropTargetAt(target: DropTarget) {
    dispatch({
      type: DraggableListStateActionEnum.SHOW_DROP_TARGET_AT,
      payload: target,
    });
  }

  function hideDropTarget() {
    dispatch({
      type: DraggableListStateActionEnum.HIDE_DROP_TARGET,
    });
  }

  return {
    showDropTargetAt,
    hideDropTarget,
  };
}
