import clsx from "clsx";

export type UiToggleButtonItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type UiToggleButtonProps = {
  items: UiToggleButtonItem[];
  activeItemId?: string | null;
  onActiveItemChange?: (item: UiToggleButtonItem) => void;
};

export function UiToggleButton(props: UiToggleButtonProps) {
  const { items, activeItemId, onActiveItemChange } = props;

  function ToggleButtonItemClickHandler(item: UiToggleButtonItem) {
    if (item.id === activeItemId) return;

    onActiveItemChange?.(item);
  }

  return (
    <div className="flex flex-row items-center bg-slate-100 rounded-md w-min h-min border border-slate-100">
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
