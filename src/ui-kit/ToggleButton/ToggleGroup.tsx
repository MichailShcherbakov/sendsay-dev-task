import clsx from "clsx";
import React from "react";
import { UiToggleGroupContextProvider } from "./ToggleGroupContext";

export interface UiToggleGroupProps<TValue>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: TValue;
  onChange?: (value: TValue) => void;
}

export function UiToggleGroup<TValue>({
  value,
  onChange,
  className,
  ...props
}: UiToggleGroupProps<TValue>) {
  return (
    <UiToggleGroupContextProvider value={value} onChange={onChange}>
      <div
        {...props}
        className={clsx(
          "flex flex-row items-center bg-slate-100 rounded-md w-min h-min border border-slate-100 select-none",
          className,
        )}
      />
    </UiToggleGroupContextProvider>
  );
}
