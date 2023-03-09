import clsx from "clsx";
import { useCalcBuilder } from "~/store/builder/hooks";
import { CalcSection } from "../Section";

export interface CalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Calculator({ className, ...props }: CalculatorProps) {
  const { chosenSections } = useCalcBuilder();

  return (
    <div {...props} className={clsx("flex flex-col gap-3", className)}>
      {chosenSections.map(section => (
        <CalcSection key={section.id} section={section} />
      ))}
    </div>
  );
}
