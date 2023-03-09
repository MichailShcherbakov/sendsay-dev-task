import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "./Canvas";
import { Palette } from "./Palette";

export interface BuilderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Builder({ className, ...props }: BuilderProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        {...props}
        className={clsx("flex flex-row w-134 h-min gap-14", className)}
      >
        <Palette className="flex-1" />
        <Canvas className="flex-1" />
      </div>
    </DndProvider>
  );
}
