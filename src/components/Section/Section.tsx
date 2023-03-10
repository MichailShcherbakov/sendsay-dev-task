import clsx from "clsx";
import React from "react";
import { Section, SectionItem } from "~/store/builder/type";
import { UiGrid } from "~/ui-kit/Grid";
import { UiPaper, UiPaperProps } from "~/ui-kit/Paper";
import { CalcSectionItem } from "./SectionItem";

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
  return (
    <UiPaper {...props} className={clsx("my-1", className)}>
      <UiGrid className="gap-2" cols={section.cols}>
        {section.items.map(item => (
          <CalcSectionItem
            key={item.id}
            item={item}
            isInteractive={isInteractive}
            onClickCapture={() => onItemClick?.(item, section)}
          />
        ))}
      </UiGrid>
    </UiPaper>
  );
}

export const CalcSection = React.memo(_CalcSection);
