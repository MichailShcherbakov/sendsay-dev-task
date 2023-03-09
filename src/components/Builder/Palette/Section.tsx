import clsx from "clsx";
import { UiPaper } from "~/ui-kit/Paper";
import { BuilderSectionItem } from "./SectionItem";
import { Section } from "~/store/builder/type";
import React from "react";
import { useCalcBuilderActions } from "~/store/builder/hooks";
import {
  UiDraggableListItem,
  UiDraggableListItemProps,
} from "~/ui-kit/DraggableList/DraggableListItem";
import { DraggableItem } from "~/ui-kit/DraggableList/type";
import { UiGrid } from "~/ui-kit/Grid";

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
      <UiPaper
        className={clsx({
          "hover:drag-cursor-pointer": canDrag,
          "hover:cursor-not-allowed": isPinned,
          "shadow-none opacity-40": isChosen,
        })}
        onDoubleClick={doubleClickHandler}
      >
        <UiGrid className="gap-2" cols={section.cols}>
          {section.items.map(item => (
            <BuilderSectionItem key={item.id} item={item} />
          ))}
        </UiGrid>
      </UiPaper>
    </UiDraggableListItem>
  );
}

export const BuilderSection = React.memo(_BuilderSection);
