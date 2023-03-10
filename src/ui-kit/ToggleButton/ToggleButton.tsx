import clsx from "clsx";
import React from "react";
import { useToggleGroupState } from "./ToggleGroupContext";

export interface UiToggleButtonProps<TValue>
  extends React.HTMLAttributes<HTMLButtonElement> {
  value: TValue;
  icon?: React.ReactNode;
  /**
   * @default true
   */
  isInteractive?: boolean;
  children: string;
}

export function UiToggleButton<TValue>({
  value,
  icon,
  isInteractive = true,
  className,
  children,
  onClick,
  ...props
}: UiToggleButtonProps<TValue>) {
  const state = useToggleGroupState<TValue>();

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isInteractive) return;

    state.onChange(value);

    onClick?.(e);
  }

  return (
    <button
      {...props}
      className={clsx(
        "flex flex-row items-center py-2 px-3 gap-2 rounded-md border ",
        {
          "border-slate-100": value !== state.currentValue,
          "hover:cursor-not-allowed": !isInteractive,
          "bg-white  border-gray-100": value === state.currentValue,
        },
        className,
      )}
      onClick={clickHandler}
    >
      {!!icon && (
        <picture
          className={clsx({
            "text-slate-400": value !== state.currentValue,
            "text-purple-400": value === state.currentValue,
          })}
        >
          {icon}
        </picture>
      )}
      <span className="text-sm font-medium text-slate-400">{children}</span>
    </button>
  );
}
