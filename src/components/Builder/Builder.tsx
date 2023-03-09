import clsx from "clsx";
import { BuilderSection } from "./Section";
import { Canvas } from "../Canvas";
import { useCalcBuilder } from "../../store/builder/hooks";
import { UiDraggableList } from "../../ui-kit/DraggableList";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  const { allSections, getChosenSectionById } = useCalcBuilder();

  return (
    <div {...props} className={clsx("flex flex-row gap-14 h-min", className)}>
      <div className="w-60">
        <UiDraggableList
          id="all_sections"
          accept="no_section"
          items={allSections}
        >
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
      </div>
      <div className="w-60">
        <Canvas />
      </div>
    </div>
  );
}
