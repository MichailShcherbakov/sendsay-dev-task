import { useCalcBuilder } from "~/store/builder/hooks";
import { UiDraggableList } from "~/ui-kit/DraggableList";
import { BuilderSection } from "./Section";

export function Palette() {
  const { allSections, getChosenSectionById } = useCalcBuilder();

  return (
    <UiDraggableList id="all_sections" accept="no_section" items={allSections}>
      {props => (
        <BuilderSection
          {...props}
          key={props.item.id}
          type="section"
          accept="no_section"
          isChosen={!!getChosenSectionById(props.item.id)}
        />
      )}
    </UiDraggableList>
  );
}
