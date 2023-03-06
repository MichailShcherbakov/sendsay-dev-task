import clsx from "clsx";
import React from "react";

export interface UiPaperProps extends React.HTMLAttributes<HTMLDivElement> {}

function _UiPaper(
  { className, ...props }: UiPaperProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx("p-1 shadow-md rounded bg-white", className)}
    />
  );
}

export const UiPaper = React.forwardRef(_UiPaper);
