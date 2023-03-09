import clsx from "clsx";
import { Canvas } from "./Canvas";
import { Palette } from "./Palette";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  return (
    <div {...props} className={clsx("flex flex-row gap-14 h-min", className)}>
      <div className="w-60">
        <Palette />
      </div>
      <div className="w-60">
        <Canvas />
      </div>
    </div>
  );
}
