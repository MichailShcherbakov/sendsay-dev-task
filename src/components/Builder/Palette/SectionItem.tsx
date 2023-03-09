import { UiButton } from "~/ui-kit/Button";
import { SectionItem } from "~/store/builder/type";
import { Display } from "./Display";
import React from "react";
import { UiGrid, UiGridProps } from "~/ui-kit/Grid";

export interface BuilderSectionItemProps
  extends Omit<UiGridProps, "item" | "cols"> {
  item: SectionItem;
  isInteractive?: boolean;
}

function _BuilderSectionItem({
  item,
  isInteractive = false,
  ...props
}: BuilderSectionItemProps) {
  return (
    <UiGrid {...props} item cols={item.cols}>
      {item.type === "display" ? (
        <Display value={item.value} className="w-full" />
      ) : (
        <UiButton
          className="w-full"
          variant={item.variant}
          isInteractive={isInteractive}
        >
          {item.label}
        </UiButton>
      )}
    </UiGrid>
  );
}

export const BuilderSectionItem = React.memo(_BuilderSectionItem);
