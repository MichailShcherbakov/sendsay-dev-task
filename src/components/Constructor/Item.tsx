import { UiButton } from "../../ui-kit/Button";
import { Display } from "../Display";
import { SectionItem } from "../../store/type";

export interface ConstructorSectionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: SectionItem;
}

export function ConstructorSectionItem({
  item,
  ...props
}: ConstructorSectionItemProps) {
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
