import produce, { castDraft } from "immer";
import {
  DraggableListState,
  DraggableListStateAction,
  DraggableListStateActionEnum,
} from "./type";

export function reducer<TItem>(
  state: DraggableListState<TItem>,
  action: DraggableListStateAction<TItem>,
): DraggableListState<TItem> {
  switch (action.type) {
    case DraggableListStateActionEnum.SET_ITEMS: {
      return produce(state, pevState => {
        pevState.items = castDraft(action.payload);
      });
    }
    case DraggableListStateActionEnum.SHOW_DROP_TARGET_AT: {
      return produce(state, pevState => {
        pevState.dropTarget = action.payload;
      });
    }
    case DraggableListStateActionEnum.HIDE_DROP_TARGET: {
      return produce(state, pevState => {
        pevState.dropTarget = null;
      });
    }
    default: {
      return state;
    }
  }
}
