import clsx from "clsx";
import { BuilderSection } from "./Section";
import { Canvas } from "../Canvas";
import { useCalcBuilder } from "../../store/builder/hooks";
import { DraggableList } from "../../ui-kit/DraggableList";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  const { allSections, chosenSections, getChosenSectionById } =
    useCalcBuilder();

  return (
    <div {...props} className={clsx("flex flex-row gap-14 h-min", className)}>
      <div className="w-60">
        <DraggableList
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
        </DraggableList>
      </div>
      <div className="w-60 ">
        <DraggableList
          id="chosen_sections"
          accept="section"
          items={chosenSections}
          className="w-full h-full"
          Placeholder={<Canvas className="w-full h-full" isEmpty />}
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
      </div>
    </div>
  );
}
