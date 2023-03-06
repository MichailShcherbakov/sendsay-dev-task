import clsx from "clsx";

export type DisplayProps = {
  value: string;
  className?: string;
};

export function Display(props: DisplayProps) {
  const { value, className } = props;
  return (
    <div className={clsx("rounded-md bg-slate-100 h-13 py-1 px-2", className)}>
      <span className="text-4xl font-extrabold text-slate-800 block whitespace-nowrap text-end">
        {value}
      </span>
    </div>
  );
}
