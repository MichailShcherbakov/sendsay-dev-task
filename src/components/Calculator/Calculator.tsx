import { useCalcBuilder } from "~/store/builder/hooks";
import {
  CalculatorSections,
  CalculatorSectionsProps,
} from "./CalculatorSections";
import { CalculatorStateProvider } from "./state";

export interface CalculatorProps extends CalculatorSectionsProps {}

export function Calculator(props: CalculatorProps) {
  const { chosenSections } = useCalcBuilder();

  return (
    <CalculatorStateProvider sections={chosenSections}>
      <CalculatorSections {...props} />
    </CalculatorStateProvider>
  );
}
