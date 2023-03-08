import clsx from "clsx";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Divider({ className, ...props }: DividerProps) {
  return (
    <div {...props} className={clsx("relative w-full", className)}>
      <div className="absolute -left-1.5 -top-0.75 w-1.5 h-1.5 bg-purple-400 rotate-45" />
      <hr className="w-full h-0 border-t-1 border-t-purple-400" />
      <div className="absolute -right-1.5 -top-0.75 w-1.5 h-1.5 bg-purple-400 rotate-45" />
    </div>
  );
}
