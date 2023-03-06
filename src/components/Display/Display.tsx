import clsx from "clsx";

export interface DisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
}

export function Display({ value, className, ...props }: DisplayProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-md bg-slate-100 h-13 py-1 px-2 w-full",
        className,
      )}
    >
      <span className="text-4xl font-extrabold text-slate-800 block whitespace-nowrap text-end">
        {value}
      </span>
    </div>
  );
}
