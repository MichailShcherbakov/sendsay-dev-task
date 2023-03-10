import clsx from "clsx";
import React from "react";
import { useCalcBuilder } from "~/store/builder/hooks";
import { SectionItem, SectionItemTypeEnum } from "~/store/builder/type";
import { CalcSection } from "../Section";
import { Evaluator, EvaluatorErrorEnum } from "./Evaluator";

const ErrorMessages: Record<EvaluatorErrorEnum, string> = {
  [EvaluatorErrorEnum.INFINITE_VALUE]: "Не определено",
  [EvaluatorErrorEnum.NOT_CORRECT_VALUE]: "Ошибка!",
};

export interface CalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Calculator({ className, ...props }: CalculatorProps) {
  const { chosenSections } = useCalcBuilder();

  const [sections, setSections] = React.useState(chosenSections);

  const evaluator = React.useRef(new Evaluator()).current;

  function itemClickHandler(item: SectionItem) {
    if (item.type !== SectionItemTypeEnum.CELL) return;

    evaluator.push(item.value);

    setSections(
      sections.map(s => {
        if (s.id !== "1") return s;

        return {
          ...s,
          items: s.items.map(i => {
            if (i.type !== SectionItemTypeEnum.DISPLAY) return i;

            const evalState = evaluator.getState();

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

            return {
              ...i,
              value: expr,
            };
          }),
        };
      }),
    );
  }

  return (
    <div {...props} className={clsx("flex w-60 flex-col", className)}>
      {sections.map(section => (
        <CalcSection
          key={section.id}
          section={section}
          isInteractive
          onItemClick={itemClickHandler}
        />
      ))}
    </div>
  );
}
