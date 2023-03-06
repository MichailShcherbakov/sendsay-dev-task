import React from "react";
import { UiButton } from "./ui-kit/Button";
import { UiToggleButton, UiToggleButtonItem } from "./ui-kit/ToggleButton";
import { ReactComponent as EyeIcon } from "./assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "./assets/icons/selector.svg";
import { Display } from "./components/Display";
import { UiPaper } from "./ui-kit/Paper";
import { Canvas } from "./components/Сanvas";

const items: UiToggleButtonItem[] = [
  { id: "1", label: "Runtime", icon: <EyeIcon /> },
  { id: "2", label: "Constructor", icon: <SelectorIcon /> },
];

export default function App() {
  const [activeItemId, setActiveItemId] = React.useState<
    UiToggleButtonItem["id"] | null
  >(items.at(0)!.id);

  return (
    <div className="flex flex-col p-16 gap-16">
      <UiButton>1</UiButton>
      <UiButton variant="primary" size="lg">
        =
      </UiButton>
      <UiToggleButton
        items={items}
        activeItemId={activeItemId}
        onActiveItemChange={item => setActiveItemId(item.id)}
      />
      <UiPaper>
        <Display value={"0"} className="w-48" />
      </UiPaper>
      <UiPaper className="flex flex-row items-center gap-2">
        <UiButton>/</UiButton>
        <UiButton>x</UiButton>
        <UiButton>-</UiButton>
        <UiButton>+</UiButton>
      </UiPaper>
      <Canvas empty className="w-96 h-96" />
    </div>
  );
}
