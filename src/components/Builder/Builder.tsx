import clsx from "clsx";
import { Canvas } from "./Canvas";
import { Palette } from "./Palette";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  return (
    <div
      {...props}
      className={clsx("flex flex-row w-134 h-min gap-14", className)}
    >
      <Palette className="flex-1" />
      <Canvas className="flex-1" />
    </div>
  );
}
