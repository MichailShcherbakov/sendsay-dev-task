import clsx from "clsx";
import { useDrop } from "react-dnd";
import { ReactComponent as ImageIcon } from "../../assets/icons/image.svg";

export interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  isEmpty?: boolean;
  className?: string;
}

export function Canvas({
  isEmpty,
  className,
  children,
  ...props
}: CanvasProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => ({ place: "constructor" }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      {...props}
      ref={drop}
      className={clsx(
        {
          "flex flex-row items-center justify-center border-2 border-gray-400 rounded-md border-dashed":
            isEmpty,
          "flex flex-col w-full h-full gap-3": !isEmpty,
        },
        className,
      )}
    >
      {isEmpty && (
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
      {!isEmpty && children}
    </div>
  );
}
