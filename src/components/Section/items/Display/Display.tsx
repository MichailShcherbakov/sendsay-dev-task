import clsx from "clsx";
import React from "react";

export interface DisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Display({ value, className, ...props }: DisplayProps) {
  const cacheContainerElement = React.useRef<HTMLDivElement | null>(null);
  const cacheDisplayElement = React.useRef<HTMLDivElement | null>(null);

  const [size, setSize] = React.useState<{
    fontSize: number;
    lineHeight: number;
  }>({
    fontSize: 2.25,
    lineHeight: 2.5,
  });

  const ro = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    if (!cacheDisplayElement.current) return;

    ro.current = new ResizeObserver(entry => {
      if (!cacheContainerElement.current) return;

      const st = window.getComputedStyle(cacheContainerElement.current);
      const width =
        parseFloat(st.width) -
        parseFloat(st.marginLeft) -
        parseFloat(st.marginRight) -
        parseFloat(st.paddingLeft) -
        parseFloat(st.paddingRight);

      if (width > entry[0].contentBoxSize[0].inlineSize) return;

      setSize({
        fontSize: size.fontSize - 0.35,
        lineHeight: size.lineHeight - 0.25,
      });
    });

    ro.current.observe(cacheDisplayElement.current);

    return () => {
      ro.current?.disconnect();
      ro.current = null;
    };
  }, [size]);

  const style = React.useMemo<React.CSSProperties>(
    () => ({
      fontSize: `${size.fontSize}rem`,
      lineHeight: `${size.lineHeight}rem`,
    }),
    [size],
  );

  return (
    <div
      {...props}
      className={clsx(
        "rounded-md bg-slate-100 h-13 py-1 px-2 w-full select-none overflow-hidden flex flex-col items-end justify-end",
        className,
      )}
    >
      <span
        className="font-extrabold text-slate-800 w-min whitespace-nowrap"
        style={style}
      >
        {value}
      </span>
    </div>
  );
}
