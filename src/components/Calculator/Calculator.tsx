import clsx from "clsx";
import React from "react";
import { Evaluator } from "~/lib/math-expression-evaluator/evaluator";
import { useCalcBuilder } from "~/store/builder/hooks";
import { SectionItem, SectionItemTypeEnum } from "~/store/builder/type";
import { CalcSection } from "../Section";

export interface CalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Calculator({ className, ...props }: CalculatorProps) {
  const { chosenSections } = useCalcBuilder();

  const [sections, setSections] = React.useState(chosenSections);

  const currentExpr = React.useRef("0");
  const expr = React.useRef("0");
  const evaluator = React.useRef(Evaluator()).current;

  function itemClickHandler(item: SectionItem) {
    if (item.type !== SectionItemTypeEnum.CELL) return;

    setSections(
      sections.map(s => {
        if (s.id !== "1") return s;

        return {
          ...s,
          items: s.items.map(i => {
            if (i.type !== SectionItemTypeEnum.DISPLAY) return i;

            if (item.label === "=") {
              expr.current += currentExpr.current;
              currentExpr.current = "0";

              const result = evaluator.evaluate(expr.current);

              expr.current = "0";

              return {
                ...i,
                value: Number.isNaN(result)
                  ? "Ошибка!"
                  : !Number.isFinite(result)
                  ? "Не определено"
                  : result.toString(),
              };
            }

            if ("/x-+".indexOf(item.label) !== -1) {
              if ("/x-+".indexOf(currentExpr.current.at(-1)!) !== -1) {
                currentExpr.current =
                  currentExpr.current.slice(1, -1) + item.label;
              } else {
                expr.current += currentExpr.current;
                currentExpr.current = item.label;
              }

              return {
                ...i,
                value: currentExpr.current,
              };
            } else if ("/x-+".indexOf(currentExpr.current.at(-1)!) !== -1) {
              expr.current += currentExpr.current;
              currentExpr.current = "0";
            }

            if ((currentExpr.current + item.label).length > 16) return i;

            currentExpr.current =
              currentExpr.current === "0"
                ? item.label
                : currentExpr.current + item.label;

            return {
              ...i,
              value: currentExpr.current,
            };
          }),
        };
      }),
    );
  }

  return (
    <div
      {...props}
      className={clsx("flex flex-row w-134 justify-end", className)}
    >
      <div className="flex w-60 flex-col">
        {sections.map(section => (
          <CalcSection
            key={section.id}
            section={section}
            isInteractive
            onItemClick={itemClickHandler}
          />
        ))}
      </div>
    </div>
  );
}
