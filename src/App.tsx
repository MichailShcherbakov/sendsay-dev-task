import { UiToggleButton, UiToggleButtonItem } from "./ui-kit/ToggleButton";
import { ReactComponent as EyeIcon } from "./assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "./assets/icons/selector.svg";
import { Builder } from "./components/Builder/Builder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

const items: UiToggleButtonItem[] = [
  { id: "1", label: "Runtime", icon: <EyeIcon /> },
  { id: "2", label: "Builder", icon: <SelectorIcon /> },
];

export default function App() {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col w-screen h-screen items-center justify-center overflow-hidden">
          <div className="flex flex-col w-min h-full gap-7.5 py-9.5 px-20 overflow-hidden">
            <div className="flex flex-row-reverse">
              <UiToggleButton items={items} activeItemId={items.at(1)!.id} />
            </div>
            <Builder />
          </div>
        </div>
      </DndProvider>
    </ReduxProvider>
  );
}
