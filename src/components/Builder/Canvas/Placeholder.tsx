import clsx from "clsx";
import { ReactComponent as ImageIcon } from "~/assets/icons/image.svg";

export interface CanvasPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export function CanvasPlaceholder({
  className,
  isActive,
  ...props
}: CanvasPlaceholderProps) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-row items-center justify-center w-full h-full border-2 border-gray-400 rounded-md border-dashed",
        {
          "bg-blue-100": isActive,
        },
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <ImageIcon className="text-black" />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm font-medium text-purple-400">Перетащите сюда</p>
          <p className="text-xs font-normal text-slate-500">
            любой элемент из левой панели
          </p>
        </div>
      </div>
    </div>
  );
}
