import { UiToggleButton, UiToggleButtonItem } from "./ui-kit/ToggleButton";
import { ReactComponent as EyeIcon } from "./assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "./assets/icons/selector.svg";
import { Canvas } from "./components/Сanvas";
import { Constructor } from "./components/Constructor/Constructor";
import { SECTIONS } from "./store/section";

const items: UiToggleButtonItem[] = [
  { id: "1", label: "Runtime", icon: <EyeIcon /> },
  { id: "2", label: "Constructor", icon: <SelectorIcon /> },
];

export default function App() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center overflow-hidden">
      <div className="flex flex-col w-min h-full gap-7.5 py-9.5 px-20 overflow-hidden">
        <div className="flex flex-row-reverse">
          <UiToggleButton items={items} activeItemId={items.at(1)!.id} />
        </div>
        <div className="flex flex-row gap-14 h-min">
          <div className="w-60">
            <Constructor sections={SECTIONS} />
          </div>
          <div className="w-60 ">
            <Canvas empty className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
