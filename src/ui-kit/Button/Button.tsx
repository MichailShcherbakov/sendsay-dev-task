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
}

export function UiButton({
  size = "md",
  variant = "default",
  className,
  ...props
}: UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "text-center",
        {
          "w-8 h-8": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
          "text-black border border-gray-100 rounded-md bg-white hover:border-2 hover:border-purple-400":
            variant === "default",
          "text-white rounded-md bg-purple-400": variant === "primary",
        },
        className,
      )}
    />
  );
}
