import clsx from "clsx";
import { UiPaper, UiPaperProps } from "../../ui-kit/Paper";
import { ConstructorSectionItem } from "./Item";
import { SectionItem } from "../../store/type";

export interface ConstructorSectionProps {
  cols?: number;
  items: SectionItem[];
  UiPaperProps?: UiPaperProps;
}

export function ConstructorSection(props: ConstructorSectionProps) {
  const { items, cols = 1, UiPaperProps } = props;
  return (
    <UiPaper
      {...UiPaperProps}
      className={clsx("grid w-full gap-2", UiPaperProps?.className)}
      style={{
        ...UiPaperProps?.style,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {items.map(item => (
        <ConstructorSectionItem key={item.id} item={item} />
      ))}
    </UiPaper>
  );
}
