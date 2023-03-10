import React from "react";
import { useCalcBuilder } from "~/store/builder/hooks";
import { Section } from "~/store/builder/type";
import { UiDraggableList, UiDraggableListProps } from "~/ui-kit/DraggableList";
import { BuilderSection } from "../BuilderSection";

export interface PaletteProps
  extends Omit<
    UiDraggableListProps<Section>,
    "id" | "accept" | "items" | "children"
  > {}

export function Palette(props: PaletteProps) {
  const { allSections, getChosenSectionById } = useCalcBuilder();

  const canDrop = React.useCallback(() => false, []);

  return (
    <UiDraggableList
      {...props}
      id="all_sections"
      accept="no_section"
      items={allSections}
    >
      {props => (
        <BuilderSection
          {...props}
          key={props.item.id}
          type="section"
          accept="section"
          isChosen={!!getChosenSectionById(props.item.id)}
          canDrop={canDrop}
        />
      )}
    </UiDraggableList>
  );
}
