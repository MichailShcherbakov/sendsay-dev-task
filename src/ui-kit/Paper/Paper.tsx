import clsx from "clsx";

export type UiPaper = {
  children?: React.ReactNode;
  className?: string;
};

export function UiPaper({ className, ...props }: UiPaper) {
  return (
    <div
      {...props}
      className={clsx("w-min h-min p-1 shadow-md rounded bg-white", className)}
    />
  );
}
