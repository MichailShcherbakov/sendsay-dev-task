export const DRAGGABLE_LIST = "DRAGGABLE_LIST";

export type DropTarget = {
  /**
   * Anchor item index
   */
  anchorIdx: DraggableItem["idx"];
  /**
   * Position relative to the anchor item
   */
  position: "after" | "before";
  /**
   * Target item index
   */
  targetIdx: DraggableItem["idx"];
};

export type DroppableArea = {
  id: string;
};

export type DraggableItem<TType = unknown> = {
  /**
   * Index of the item
   */
  idx: number;
  /**
   * Origin item provider by side
   */
  origin: TType;
  /**
   * Location where the item would be
   */
  dropTarget: DropTarget | null;
};
