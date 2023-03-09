import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import { UiDraggableListItemProps } from "./DraggableListItem";
import {
  DraggableListState,
  useDraggableListState,
  useDraggableListStateAction,
} from "./state";
import { DraggableItem, DroppableArea, DropTarget } from "./type";

function getDropTarget<TItem>(state: DraggableListState<TItem>, idx: number) {
  return state.dropTarget && state.dropTarget.anchorIdx === idx
    ? state.dropTarget
    : null;
}

export interface UiDraggableListContentProps<TItem>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children" | "onDragOver"
  > {
  id: string;
  accept: string;
  Placeholder?: React.ReactNode;
  children: (props: UiDraggableListItemProps<TItem>) => React.ReactNode;
  canDrop?: (item: DraggableItem<TItem>) => boolean;
  onDragOver?: (options: { shallow: boolean }) => void;
  onDragLeave?: () => void;
}

export function UiDraggableListContent<TItem>({
  canDrop,
  accept,
  children,
  className,
  onDragOver,
  onDragLeave,
  Placeholder,
  ...props
}: UiDraggableListContentProps<TItem>) {
  const { id } = props;

  const state = useDraggableListState<TItem>();
  const { showDropTargetAt, hideDropTarget } = useDraggableListStateAction();

  const ref = React.useRef<HTMLDivElement>(null);

  const [collect, drop] = useDrop<
    DraggableItem<TItem>,
    DroppableArea,
    {
      isOver: boolean;
      canDrop: boolean;
      currentDraggedItem: DraggableItem<TItem>;
    }
  >({
    accept,
    drop: () => {
      return { id };
    },
    canDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      currentDraggedItem: monitor.getItem(),
    }),
    hover(draggedItem, monitor) {
      if (!ref.current) return;

      onDragOver?.({
        shallow: monitor.isOver({ shallow: true }),
      });

      /// hover only at the container
      if (!monitor.isOver({ shallow: true })) return;

      const dropTarget: DropTarget = {
        anchorIdx: state.items.length - 1,
        targetIdx: state.items.length,
        position: "after",
      };

      draggedItem.dropTarget = dropTarget;

      showDropTargetAt(dropTarget);
    },
  });

  React.useEffect(() => {
    if (collect.isOver) return;

    if (collect.currentDraggedItem) {
      collect.currentDraggedItem.dropTarget = null;
    }

    hideDropTarget();

    onDragLeave?.();
  }, [collect.currentDraggedItem, collect.isOver, hideDropTarget, onDragLeave]);

  const isEmpty = !state.items.length;

  drop(ref);

  return (
    <div {...props} ref={ref} className={clsx("flex flex-col ", className)}>
      {isEmpty && Placeholder}
      {!isEmpty &&
        state.items.map((item, idx) => {
          const dropTarget = getDropTarget(state, idx);

          return children({
            type: accept,
            accept,
            item,
            idx,
            dropTarget,
          });
        })}
    </div>
  );
}
