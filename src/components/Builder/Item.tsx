import { UiButton } from "../../ui-kit/Button";
import { Display } from "../Display";
import { SectionItem } from "../../store/builder/type";
import React from "react";

export interface BuilderSectionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: SectionItem;
}

function _BuilderSectionItem({ item, ...props }: BuilderSectionItemProps) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        gridRow: `span ${item.cols ?? 1} / span ${item.cols ?? 1}`,
      }}
    >
      {item.type === "display" ? (
        <Display value={item.value} className="w-full" />
      ) : (
        <UiButton className="w-full" variant={item.variant}>
          {item.label}
        </UiButton>
      )}
    </div>
  );
}

export const BuilderSectionItem = React.memo(_BuilderSectionItem);
