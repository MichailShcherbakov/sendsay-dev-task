import clsx from "clsx";
import { UiPaper } from "../../ui-kit/Paper";
import { BuilderSectionItem } from "./Item";
import { Section } from "../../store/builder/type";
import React from "react";
import { useCalcBuilderActions } from "../../store/builder/hooks";
import {
  DraggableListItem,
  DraggableListItemProps,
} from "../../ui-kit/DraggableList/DraggableListItem";
import { DraggableItem } from "../../ui-kit/DraggableList/type";
import { UiGrid } from "~/ui-kit/Grid";

export interface BuilderSectionProps
  extends Omit<DraggableListItemProps<Section>, "canDrag" | "onDropped"> {
  isChosen?: boolean;
}

function _BuilderSection({ isChosen, ...props }: BuilderSectionProps) {
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

  return (
    <DraggableListItem
      {...props}
      canDrag={!isChosen}
      onDropped={droppedItemHandler}
    >
      <UiPaper
        className={clsx({
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
    </DraggableListItem>
  );
}

export const BuilderSection = React.memo(_BuilderSection);
