import React from "react";
import { UiButton } from "./ui-kit/Button";
import { UiToggleButton, UiToggleButtonItem } from "./ui-kit/ToggleButton";
import { ReactComponent as EyeIcon } from "./assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "./assets/icons/selector.svg";

const items: UiToggleButtonItem[] = [
  { id: "1", label: "Runtime", icon: <EyeIcon /> },
  { id: "2", label: "Constructor", icon: <SelectorIcon /> },
  { id: "3", label: "Constructor", icon: <SelectorIcon /> },
  { id: "4", label: "Constructor", icon: <SelectorIcon /> },
];

export default function App() {
  const [activeItemId, setActiveItemId] = React.useState<
    UiToggleButtonItem["id"] | null
  >(items.at(0)!.id);

  return (
    <div className="flex flex-row p-16 gap-16">
      <UiButton>1</UiButton>
      <UiButton variant="primary" size="lg">
        =
      </UiButton>
      <UiToggleButton
        items={items}
        activeItemId={activeItemId}
        onActiveItemChange={item => setActiveItemId(item.id)}
      />
    </div>
  );
}
