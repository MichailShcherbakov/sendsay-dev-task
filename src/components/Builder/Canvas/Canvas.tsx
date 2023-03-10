import React from "react";
import { useCalcBuilder } from "~/store/builder/hooks";
import { DISPLAY_SECTION_ID } from "~/store/builder/sections";
import { Section } from "~/store/builder/type";
import { UiDraggableList, UiDraggableListProps } from "~/ui-kit/DraggableList";
import { DraggableItem } from "~/ui-kit/DraggableList/type";
import { BuilderSection } from "../BuilderSection";
import { CanvasPlaceholder } from "./CanvasPlaceholder";

export interface CanvasProps
  extends Omit<
    UiDraggableListProps<Section>,
    "id" | "accept" | "items" | "children"
  > {}

export function Canvas(props: CanvasProps) {
  const { chosenSections } = useCalcBuilder();

  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);

  function dragOverHandler() {
    if (chosenSections.length) return;

    setIsDragOver(true);
  }

  function dragLeaveHandler() {
    if (chosenSections.length) return;

    setIsDragOver(false);
  }

  function canDrop(item: DraggableItem<Section>) {
    if (!item.dropTarget) return false;

    if (
      item.origin.id === DISPLAY_SECTION_ID &&
      item.dropTarget.targetIdx !== 0
    ) {
      return false;
    }

    if (
      item.dropTarget.targetIdx === 0 &&
      chosenSections.at(0)?.id === DISPLAY_SECTION_ID
    ) {
      return false;
    }

    return true;
  }

  return (
    <UiDraggableList
      {...props}
      id="chosen_sections"
      accept="section"
      items={chosenSections}
      Placeholder={<CanvasPlaceholder isActive={isDragOver} />}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      canDrop={canDrop}
    >
      {props => (
        <BuilderSection
          {...props}
          key={props.item.id}
          type="section"
          accept="section"
          isPinned={props.item.id === DISPLAY_SECTION_ID}
          isRemovable={props.item.id !== DISPLAY_SECTION_ID}
          canDrop={canDrop}
        />
      )}
    </UiDraggableList>
  );
}
