import {
  SectionItem as ISectionItem,
  SectionItemTypeEnum,
} from "~/store/builder/type";
import { Display } from "./items/Display";
import React from "react";
import { UiGrid, UiGridProps } from "~/ui-kit/Grid";
import { Cell } from "./items/Cell";

function provideCalcSectionItem(item: ISectionItem, isInteractive = false) {
  switch (item.type) {
    case SectionItemTypeEnum.DISPLAY: {
      return <Display value={item.value} />;
    }
    case SectionItemTypeEnum.CELL: {
      return (
        <Cell variant={item.variant} isInteractive={isInteractive}>
          {item.label}
        </Cell>
      );
    }
  }
}

export interface CalcSectionItemProps
  extends Omit<UiGridProps, "item" | "cols"> {
  item: ISectionItem;
  isInteractive?: boolean;
}

function _CalcSectionItem({
  item,
  isInteractive,
  ...props
}: CalcSectionItemProps) {
  return (
    <UiGrid {...props} item cols={item.cols}>
      {provideCalcSectionItem(item, isInteractive)}
    </UiGrid>
  );
}

export const CalcSectionItem = React.memo(_CalcSectionItem);
