import clsx from "clsx";

export interface UiPaperProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UiPaper({ className, ...props }: UiPaperProps) {
  return (
    <div
      {...props}
      className={clsx("p-1 shadow-md rounded bg-white", className)}
    />
  );
}
