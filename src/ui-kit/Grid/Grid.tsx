import clsx from "clsx";
import React from "react";

export interface UiGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  item?: boolean;
}

function _UiGrid({ className, style, cols = 1, item, ...props }: UiGridProps) {
  return (
    <div
      {...props}
      className={clsx("grid w-full", className)}
      style={{
        ...style,
        gridTemplateColumns: !item
          ? `repeat(${cols}, minmax(0, 1fr))`
          : undefined,
        gridColumn: item ? `span ${cols} / span ${cols}` : undefined,
      }}
    />
  );
}

export const UiGrid = React.memo(_UiGrid);
