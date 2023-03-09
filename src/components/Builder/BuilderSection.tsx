import clsx from "clsx";
import { Section } from "~/store/builder/type";
import React from "react";
import { useCalcBuilderActions } from "~/store/builder/hooks";
import {
  UiDraggableListItem,
  UiDraggableListItemProps,
} from "~/ui-kit/DraggableList/DraggableListItem";
import { DraggableItem } from "~/ui-kit/DraggableList/type";
import { CalcSection } from "~/components/Section";

export interface BuilderSectionProps
  extends Omit<UiDraggableListItemProps<Section>, "canDrag" | "onDropped"> {
  isChosen?: boolean;
  isPinned?: boolean;
}

function _BuilderSection({
  isChosen,
  isPinned,
  ...props
}: BuilderSectionProps) {
  const { item: section } = props;

  const { chooseBuilderSection, removeBuilderSection } =
    useCalcBuilderActions();

  function doubleClickHandler() {
    removeBuilderSection(section.id);
  }

  function droppedItemHandler(item: DraggableItem<Section>) {
    if (!item.dropTarget) return;

    chooseBuilderSection(item.origin.id, item.dropTarget.targetIdx);
  }

  const canDrag = !isChosen && !isPinned;

  return (
    <UiDraggableListItem
      {...props}
      canDrag={canDrag}
      onDropped={droppedItemHandler}
    >
      <CalcSection
        section={section}
        className={clsx({
          "hover:drag-cursor-pointer": canDrag,
          "hover:cursor-not-allowed": isPinned,
          "shadow-none opacity-40": isChosen,
        })}
        onDoubleClick={doubleClickHandler}
      />
    </UiDraggableListItem>
  );
}

export const BuilderSection = React.memo(_BuilderSection);
