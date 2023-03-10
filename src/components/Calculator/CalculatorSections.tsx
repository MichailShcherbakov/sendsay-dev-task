import clsx from "clsx";
import React from "react";
import { SectionItem, SectionItemTypeEnum } from "~/store/builder/type";
import { CalcSection } from "../Section";
import { Evaluator, EvaluatorErrorEnum } from "./Evaluator";
import { useCalculatorState, useCalculatorStateAction } from "./state";

const ErrorMessages: Record<EvaluatorErrorEnum, string> = {
  [EvaluatorErrorEnum.INFINITE_VALUE]: "Не определено",
  [EvaluatorErrorEnum.NOT_CORRECT_VALUE]: "Ошибка!",
};

export interface CalculatorSectionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CalculatorSections({
  className,
  ...props
}: CalculatorSectionsProps) {
  const { sections } = useCalculatorState();
  const { setDisplayValue } = useCalculatorStateAction();

  const evaluator = React.useRef(new Evaluator()).current;

  const itemClickHandler = React.useCallback(
    (item: SectionItem) => {
      if (item.type !== SectionItemTypeEnum.CELL) return;

      const evalState = evaluator.push(item.value);

      let expr = "";

      if (evalState.error) {
        expr = ErrorMessages[evalState.error];
      } else if (evalState.right) {
        expr = evalState.right;
      } else if (evalState.op) {
        expr = evalState.op;
      } else if (evalState.left) {
        expr = evalState.left;
      }

      expr = expr.replaceAll("*", "x").replaceAll(".", ",");

      setDisplayValue(expr);
    },
    [evaluator, setDisplayValue],
  );

  return (
    <div {...props} className={clsx("flex w-60 flex-col", className)}>
      {sections.map(section => (
        <CalcSection
          key={section.id}
          section={section}
          onItemClick={itemClickHandler}
        />
      ))}
    </div>
  );
}
