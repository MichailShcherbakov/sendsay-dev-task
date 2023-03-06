import clsx from "clsx";
import { ConstructorSection } from "./Section";
import { Section } from "../../store/type";

export interface ConstructorProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: Section[];
}

export function Constructor({
  sections,
  className,
  ...props
}: ConstructorProps) {
  return (
    <div
      {...props}
      className={clsx("flex flex-col w-full h-full gap-3", className)}
    >
      {sections.map(section => (
        <ConstructorSection
          key={section.id}
          items={section.items}
          cols={section.cols}
        />
      ))}
    </div>
  );
}
