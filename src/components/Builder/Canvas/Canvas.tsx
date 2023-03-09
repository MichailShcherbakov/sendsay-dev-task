import clsx from "clsx";
import React from "react";
import { useCalcBuilder } from "~/store/builder/hooks";
import { Section } from "~/store/builder/type";
import { UiDraggableList, UiDraggableListProps } from "~/ui-kit/DraggableList";
import { DraggableItem } from "~/ui-kit/DraggableList/type";
import { BuilderSection } from "../Palette/Section";
import { CanvasPlaceholder } from "./Placeholder";

export interface CanvasProps
  extends Pick<UiDraggableListProps<Section>, "className"> {}

export function Canvas({ className, ...props }: CanvasProps) {
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

    if (item.origin.id === "1" && item.dropTarget.targetIdx !== 0) {
      return false;
    }

    if (item.dropTarget.targetIdx === 0 && chosenSections.at(0)?.id === "1") {
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
      className={clsx("w-full h-full", className)}
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
          isPinned={props.item.id === "1"}
          canDrop={canDrop}
        />
      )}
    </UiDraggableList>
  );
}
