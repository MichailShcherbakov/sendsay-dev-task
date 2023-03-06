import clsx from "clsx";
import { ReactComponent as ImageIcon } from "../../assets/icons/image.svg";

export type CanvasProps = {
  empty?: boolean;
  className?: string;
};

export function Canvas(props: CanvasProps) {
  const { empty, className } = props;

  return (
    <div
      className={clsx(
        {
          "flex flex-row w-min h-min items-center justify-center border-2 border-gray-400 rounded-md border-dashed":
            empty,
        },
        className,
      )}
    >
      {empty && (
        <div className="flex flex-col items-center justify-center gap-3">
          <ImageIcon className="text-black" />
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium text-purple-400">
              Перетащите сюда
            </p>
            <p className="text-xs font-normal text-slate-500">
              любой элемент из левой панели
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
