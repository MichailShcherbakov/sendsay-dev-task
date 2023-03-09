import clsx from "clsx";
import React from "react";
import { useCalcBuilder } from "~/store/builder/hooks";
import { Section } from "~/store/builder/type";
import { DraggableList, DraggableListProps } from "~/ui-kit/DraggableList";
import { BuilderSection } from "../Builder/Section";
import { CanvasPlaceholder } from "./Placeholder";

export interface CanvasProps extends Partial<DraggableListProps<Section>> {}

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

  return (
    <DraggableList
      {...props}
      id="chosen_sections"
      accept="section"
      items={chosenSections}
      className={clsx("w-full h-full", className)}
      Placeholder={<CanvasPlaceholder isActive={isDragOver} />}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      {props => (
        <BuilderSection
          {...props}
          key={props.item.id}
          type="section"
          accept="section"
        />
      )}
    </DraggableList>
  );
}
