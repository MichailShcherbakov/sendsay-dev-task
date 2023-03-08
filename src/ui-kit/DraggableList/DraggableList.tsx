import {
  DraggableListContent,
  DraggableListContentProps,
} from "./DraggableListContent";
import { DraggableListStateProvider } from "./state";

export interface DraggableListProps<TItem>
  extends DraggableListContentProps<TItem> {
  items: TItem[];
}

export function DraggableList<TItem>({
  items,
  ...props
}: DraggableListProps<TItem>) {
  return (
    <DraggableListStateProvider items={items}>
      <DraggableListContent {...props} />
    </DraggableListStateProvider>
  );
}
