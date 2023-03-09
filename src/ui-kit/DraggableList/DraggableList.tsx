import {
  UiDraggableListContent,
  UiDraggableListContentProps,
} from "./DraggableListContent";
import { UiDraggableListStateProvider } from "./state";

export interface UiDraggableListProps<TItem>
  extends UiDraggableListContentProps<TItem> {
  items: TItem[];
}

export function UiDraggableList<TItem>({
  items,
  ...props
}: UiDraggableListProps<TItem>) {
  return (
    <UiDraggableListStateProvider items={items}>
      <UiDraggableListContent {...props} />
    </UiDraggableListStateProvider>
  );
}
