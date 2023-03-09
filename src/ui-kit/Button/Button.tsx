import clsx from "clsx";

export type UiButtonSize = "sm" | "md" | "lg";
export type UiButtonVariant = "default" | "primary";

export interface UiButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * @default md
   */
  size?: UiButtonSize;
  /**
   * @default default
   */
  variant?: UiButtonVariant;
  /**
   * If it's false the button is like disabled without any visible changes
   * @default true
   */
  isInteractive?: boolean;
  /**
   * @default false
   */
  isDisabled?: boolean;
}

export function UiButton({
  size = "md",
  variant = "default",
  className,
  isDisabled,
  isInteractive,
  onClick,
  ...props
}: UiButtonProps) {
  isInteractive = isDisabled ? !isDisabled : isInteractive ?? true;

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isInteractive) return;

    onClick?.(e);
  }

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        "text-center",
        {
          "w-8 h-8": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
          "text-black border border-gray-100 rounded-md bg-white":
            variant === "default",
          "hover:border-2 hover:border-purple-400":
            variant === "default" && isInteractive,
          "hover:cursor-default": !isInteractive,
          "text-white rounded-md bg-purple-400": variant === "primary",
        },
        className,
      )}
      onClick={clickHandler}
    />
  );
}
