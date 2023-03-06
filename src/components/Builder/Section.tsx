import clsx from "clsx";
import { UiPaper, UiPaperProps } from "../../ui-kit/Paper";
import { BuilderSectionItem } from "./Item";
import { Section } from "../../store/builder/type";
import { useDrag } from "react-dnd";
import React from "react";
import { useCalcBuilderActions } from "../../store/builder/hooks";

export interface BuilderSectionProps {
  section: Section;
  UiPaperProps?: UiPaperProps;
  isChosen?: boolean;
}

function _BuilderSection(props: BuilderSectionProps) {
  const { section, UiPaperProps, isChosen } = props;

  const { chooseBuilderSection, removeBuilderSection } =
    useCalcBuilderActions();

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "BOX",
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => !isChosen,
    end(draggedItem, monitor) {
      const dropResult = monitor.getDropResult();

      if (!(dropResult as any)?.place) return;

      chooseBuilderSection(section.id);
    },
  });

  function doubleClickHandler() {
    removeBuilderSection(section.id);
  }

  return (
    <UiPaper
      {...UiPaperProps}
      ref={dragPreview}
      className={clsx(
        {
          "shadow-none opacity-40": isChosen,
        },
        UiPaperProps,
      )}
      onDoubleClick={doubleClickHandler}
    >
      <div
        ref={drag}
        role="handle"
        className={clsx("grid w-full gap-2", UiPaperProps?.className)}
        style={{
          ...UiPaperProps?.style,
          gridTemplateColumns: `repeat(${section.cols}, minmax(0, 1fr))`,
        }}
      >
        {section.items.map(item => (
          <BuilderSectionItem key={item.id} item={item} />
        ))}
      </div>
    </UiPaper>
  );
}

export const BuilderSection = React.memo(_BuilderSection);
