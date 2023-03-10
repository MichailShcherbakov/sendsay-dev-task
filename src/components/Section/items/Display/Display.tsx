import clsx from "clsx";
import React from "react";

const INITIAL_FONT_SIZE = 2.25;
const INITIAL_LINE_HEIGHT = 2.5;

const FONT_SIZE_STEP = 0.35;
const LINE_HEIGHT_STEP = 0.25;

export interface DisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Display({ value, className, ...props }: DisplayProps) {
  const cacheContainerElement = React.useRef<HTMLDivElement | null>(null);
  const cacheDisplayElement = React.useRef<HTMLDivElement | null>(null);

  const isOverflown = (element: HTMLElement, container: HTMLElement) => {
    const containerStyle = window.getComputedStyle(container, null);
    const containerWidth =
      Number.parseFloat(containerStyle.width) -
      Number.parseFloat(containerStyle.paddingLeft) -
      Number.parseFloat(containerStyle.paddingRight);

    const displayStyle = window.getComputedStyle(element, null);
    const displayWidth = Number.parseFloat(displayStyle.width);

    return displayWidth > containerWidth;
  };

  React.useEffect(() => {
    if (!cacheContainerElement.current || !cacheDisplayElement.current) return;

    let fontSize = INITIAL_FONT_SIZE;
    let lineHeight = INITIAL_LINE_HEIGHT;

    cacheDisplayElement.current.style.fontSize = `${fontSize}rem`;
    cacheDisplayElement.current.style.lineHeight = `${lineHeight}rem`;

    if (
      isOverflown(cacheDisplayElement.current, cacheContainerElement.current)
    ) {
      while (
        isOverflown(cacheDisplayElement.current, cacheContainerElement.current)
      ) {
        fontSize -= FONT_SIZE_STEP;
        lineHeight -= LINE_HEIGHT_STEP;

        cacheDisplayElement.current.style.fontSize = `${fontSize}rem`;
        cacheDisplayElement.current.style.lineHeight = `${lineHeight}rem`;
      }
    } else if (
      fontSize < INITIAL_FONT_SIZE ||
      lineHeight < INITIAL_LINE_HEIGHT
    ) {
      while (
        !isOverflown(cacheDisplayElement.current, cacheContainerElement.current)
      ) {
        fontSize += FONT_SIZE_STEP;
        lineHeight += LINE_HEIGHT_STEP;

        if (fontSize > INITIAL_FONT_SIZE || lineHeight > INITIAL_LINE_HEIGHT) {
          break;
        }

        cacheDisplayElement.current.style.fontSize = `${fontSize}rem`;
        cacheDisplayElement.current.style.lineHeight = `${lineHeight}rem`;
      }

      fontSize = Math.min(INITIAL_FONT_SIZE, fontSize - FONT_SIZE_STEP);
      lineHeight = Math.min(INITIAL_LINE_HEIGHT, fontSize - LINE_HEIGHT_STEP);

      cacheDisplayElement.current.style.fontSize = `${fontSize}rem`;
      cacheDisplayElement.current.style.lineHeight = `${lineHeight}rem`;
    }
  }, [value]);

  return (
    <div
      {...props}
      ref={cacheContainerElement}
      className={clsx(
        "rounded-md bg-slate-100 h-13 py-1 px-2 w-full select-none overflow-hidden flex flex-col items-end justify-end",
        className,
      )}
    >
      <span
        ref={cacheDisplayElement}
        className="font-extrabold text-slate-800 w-min whitespace-nowrap"
      >
        {value}
      </span>
    </div>
  );
}
