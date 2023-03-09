import { useCurrentMode, useModeActions } from "~/store/mode/hooks";
import { ModeEnum } from "~/store/mode/type";
import { UiTabPanel, UiTabs } from "~/ui-kit/Tabs";
import { UiToggleButton, UiToggleButtonItem } from "~/ui-kit/ToggleButton";
import { Builder } from "../Builder/Builder";
import { Calculator } from "../Calculator";
import { ReactComponent as EyeIcon } from "~/assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "~/assets/icons/selector.svg";

const itemsCollection: UiToggleButtonItem[] = [
  { id: ModeEnum.RUNTIME, label: "Runtime", icon: <EyeIcon /> },
  { id: ModeEnum.BUILDER, label: "Builder", icon: <SelectorIcon /> },
];

const itemsMap = itemsCollection.reduce<
  Record<UiToggleButtonItem["id"], UiToggleButtonItem>
>((all, item) => {
  all[item.id] = item;
  return all;
}, {});

export function ModeManager() {
  const currentMode = useCurrentMode();
  const { changeCurrentMode } = useModeActions();

  function activeItemChangeHandler(item: UiToggleButtonItem) {
    changeCurrentMode(item.id as ModeEnum);
  }

  return (
    <div className="flex flex-col w-min h-full gap-7.5 py-9.5 px-20 overflow-hidden">
      <div className="flex flex-row-reverse">
        <UiToggleButton
          items={itemsCollection}
          activeItemId={itemsMap[currentMode].id}
          onActiveItemChange={activeItemChangeHandler}
        />
      </div>
      <UiTabs value={currentMode}>
        <UiTabPanel value={ModeEnum.RUNTIME}>
          <Calculator />
        </UiTabPanel>
        <UiTabPanel value={ModeEnum.BUILDER}>
          <Builder />
        </UiTabPanel>
      </UiTabs>
    </div>
  );
}
