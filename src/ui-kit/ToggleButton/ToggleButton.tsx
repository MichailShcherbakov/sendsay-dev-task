import clsx from "clsx";
import React from "react";

export type UiToggleButtonItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export interface UiToggleButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: UiToggleButtonItem[];
  activeItemId?: string | null;
  onActiveItemChange?: (item: UiToggleButtonItem) => void;
}

function _UiToggleButton({
  items,
  activeItemId,
  onActiveItemChange,
  className,
  ...props
}: UiToggleButtonProps) {
  function ToggleButtonItemClickHandler(item: UiToggleButtonItem) {
    if (item.id === activeItemId) return;

    onActiveItemChange?.(item);
  }

  return (
    <div
      {...props}
      className={clsx(
        "flex flex-row items-center bg-slate-100 rounded-md w-min h-min border border-slate-100 select-none",
        className,
      )}
    >
      {items.map(item => (
        <button
          className={clsx(
            "flex flex-row items-center py-2 px-3 gap-2 rounded-md border ",
            {
              "border-slate-100": item.id !== activeItemId,
              "bg-white  border-gray-100": item.id === activeItemId,
            },
          )}
          key={item.id}
          onClick={() => ToggleButtonItemClickHandler(item)}
        >
          <picture
            className={clsx({
              "text-slate-400": item.id !== activeItemId,
              "text-purple-400": item.id === activeItemId,
            })}
          >
            {item.icon}
          </picture>
          <span className="text-sm font-medium text-slate-400">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export const UiToggleButton = React.memo(_UiToggleButton);
