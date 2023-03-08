import { DropTarget } from "../type";

export type DraggableListState<TItem = unknown> = {
  items: TItem[];
  dropTarget: DropTarget | null;
};

export enum DraggableListStateActionEnum {
  SET_ITEMS = "SET_ITEMS",
  SHOW_DROP_TARGET_AT = "SHOW_DROP_TARGET_AT",
  HIDE_DROP_TARGET = "HIDE_DROP_TARGET",
}

export type DraggableListStateAction<TItem> =
  | {
      type: DraggableListStateActionEnum.SET_ITEMS;
      payload: TItem[];
    }
  | {
      type: DraggableListStateActionEnum.SHOW_DROP_TARGET_AT;
      payload: DropTarget;
    }
  | {
      type: DraggableListStateActionEnum.HIDE_DROP_TARGET;
    };
