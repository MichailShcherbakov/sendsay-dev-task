import clsx from "clsx";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Divider } from "./Divider";
import { genericMemo } from "../../tools/genericMemo";
import { useDraggableListStateAction } from "./state";
import { DraggableItem, DroppableArea, DropTarget } from "./type";
import { isFunc } from "~/tools/isFunc";

export interface UiDraggableListItemProps<TItem>
  extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  accept: string;
  idx: number;
  dropTarget: DropTarget | null;
  item: TItem;
  canDrag?: boolean;
  canDrop?: (item: DraggableItem<TItem>) => boolean;
  onDropped?: (item: DraggableItem<TItem>) => void;
}

function _UiDraggableListItem<TItem>({
  type,
  accept,
  idx,
  dropTarget,
  item,
  canDrop,
  canDrag,
  className,
  children,
  onDropped,
  ...props
}: UiDraggableListItemProps<TItem>) {
  const ref = React.useRef<HTMLDivElement>(null);

  const { showDropTargetAt, hideDropTarget } = useDraggableListStateAction();

  const [_, drop] = useDrop<DraggableItem<TItem>, DroppableArea>({
    accept,
    canDrop,
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      let dropTarget: DropTarget | null = null;

      /// upwards
      if (hoverClientY < hoverMiddleY) {
        dropTarget = {
          anchorIdx: idx,
          targetIdx: idx,
          position: "before",
        };
      }

      /// downwards
      if (hoverClientY > hoverMiddleY) {
        dropTarget = {
          anchorIdx: idx,
          targetIdx: idx + 1,
          position: "after",
        };
      }

      if (
        !dropTarget ||
        (isFunc(canDrop) && !canDrop({ ...draggedItem, dropTarget }))
      ) {
        draggedItem.dropTarget = null;
        hideDropTarget();
        return;
      }

      draggedItem.dropTarget = dropTarget;

      return showDropTargetAt(dropTarget);
    },
  });

  const [__, drag, dragPreview] = useDrag<DraggableItem<TItem>, DroppableArea>({
    type,
    item: {
      idx,
      origin: item,
      dropTarget,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult();

      if (!result) return;

      onDropped?.(draggedItem);
    },
  });

  dragPreview(drag(drop(ref)));

  return (
    <div {...props} ref={ref} className={clsx("relative", className)}>
      {!!dropTarget && (
        <div
          className={clsx("absolute left-0 w-full", {
            "top-0": dropTarget.position === "before",
            "-bottom-0.25": dropTarget.position === "after",
          })}
        >
          <Divider />
        </div>
      )}
      {children}
    </div>
  );
}

export const UiDraggableListItem = genericMemo(_UiDraggableListItem);
