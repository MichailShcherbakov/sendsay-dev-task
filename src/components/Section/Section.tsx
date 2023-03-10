import clsx from "clsx";
import React from "react";
import { Section, SectionItem } from "~/store/builder/type";
import { UiGrid } from "~/ui-kit/Grid";
import { UiPaper, UiPaperProps } from "~/ui-kit/Paper";
import { CalcSectionItem } from "./SectionItem";
import memoize from "fast-memoize";

export interface SectionProps extends UiPaperProps {
  section: Section;
  isInteractive?: boolean;
  onItemClick?: (item: SectionItem, section: Section) => void;
}

function _CalcSection({
  section,
  isInteractive,
  className,
  onItemClick,
  ...props
}: SectionProps) {
  const itemClickHandler = React.useMemo(
    () =>
      memoize(
        (item: SectionItem, section: Section) => () =>
          onItemClick?.(item, section),
      ),
    [onItemClick],
  );

  return (
    <UiPaper {...props} className={clsx("my-1", className)}>
      <UiGrid className="gap-2" cols={section.cols}>
        {section.items.map(item => (
          <CalcSectionItem
            key={item.id}
            item={item}
            isInteractive={isInteractive}
            onClickCapture={itemClickHandler(item, section)}
          />
        ))}
      </UiGrid>
    </UiPaper>
  );
}

export const CalcSection = React.memo(_CalcSection);
