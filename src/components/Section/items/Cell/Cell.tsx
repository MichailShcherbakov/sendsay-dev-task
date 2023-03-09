import clsx from "clsx";
import { UiButton, UiButtonProps } from "~/ui-kit/Button";

export interface CellProps extends UiButtonProps {}

export function Cell({ className, ...props }: CellProps) {
  return (
    <UiButton {...props} className={clsx("w-full select-none", className)} />
  );
}
