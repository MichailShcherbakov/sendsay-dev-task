import clsx from "clsx";
import { BuilderSection } from "./Section";
import { Canvas } from "../Canvas";
import { useCalcBuilder } from "../../store/builder/hooks";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  const { allSections, chosenSections, getChosenSectionById } =
    useCalcBuilder();
  return (
    <div {...props} className={clsx("flex flex-row gap-14 h-min", className)}>
      <div className="w-60">
        <div className="flex flex-col w-full h-full gap-3">
          {allSections.map(section => (
            <BuilderSection
              key={section.id}
              section={section}
              isChosen={!!getChosenSectionById(section.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-60 ">
        <Canvas className="h-full" isEmpty={!chosenSections.length}>
          {chosenSections.map(section => (
            <BuilderSection key={section.id} section={section} />
          ))}
        </Canvas>
      </div>
    </div>
  );
}
