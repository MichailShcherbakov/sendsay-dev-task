import React from "react";
import { Section } from "~/store/builder/type";
import { UiGrid } from "~/ui-kit/Grid";
import { UiPaper, UiPaperProps } from "~/ui-kit/Paper";
import { CalcSectionItem } from "./SectionItem";

export interface SectionProps extends UiPaperProps {
  section: Section;
}

function _CalcSection({ section, ...props }: SectionProps) {
  return (
    <UiPaper {...props}>
      <UiGrid className="gap-2" cols={section.cols}>
        {section.items.map(item => (
          <CalcSectionItem key={item.id} item={item} />
        ))}
      </UiGrid>
    </UiPaper>
  );
}

export const CalcSection = React.memo(_CalcSection);
