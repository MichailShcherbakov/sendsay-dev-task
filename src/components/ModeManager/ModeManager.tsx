import { useCurrentMode, useModeActions } from "~/store/mode/hooks";
import { ModeEnum } from "~/store/mode/type";
import { UiTabPanel, UiTabs } from "~/ui-kit/Tabs";
import { UiToggleButton, UiToggleGroup } from "~/ui-kit/ToggleButton";
import { Builder } from "../Builder/Builder";
import { Calculator } from "../Calculator";
import { ReactComponent as EyeIcon } from "~/assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "~/assets/icons/selector.svg";
import { useCalcBuilder } from "~/store/builder/hooks";
import clsx from "clsx";

export function ModeManager() {
  const currentMode = useCurrentMode();
  const { changeCurrentMode } = useModeActions();
  const { allSections, chosenSections } = useCalcBuilder();

  const isRuntimeAvailable = allSections.length === chosenSections.length;

  function modeChangeHandler(mode: ModeEnum) {
    changeCurrentMode(mode);
  }

  return (
    <div className="flex flex-col w-min h-full gap-7.5 py-9.5 px-20 overflow-hidden">
      <div className="flex flex-row-reverse">
        <UiToggleGroup value={currentMode} onChange={modeChangeHandler}>
          <UiToggleButton
            value={ModeEnum.RUNTIME}
            icon={<EyeIcon />}
            isInteractive={isRuntimeAvailable}
          >
            Runtime
          </UiToggleButton>
          <UiToggleButton value={ModeEnum.BUILDER} icon={<SelectorIcon />}>
            Builder
          </UiToggleButton>
        </UiToggleGroup>
      </div>
      <UiTabs value={currentMode}>
        <UiTabPanel value={ModeEnum.RUNTIME}>
          <div className={clsx("flex flex-row w-134 justify-end")}>
            <Calculator />
          </div>
        </UiTabPanel>
        <UiTabPanel value={ModeEnum.BUILDER}>
          <Builder />
        </UiTabPanel>
      </UiTabs>
    </div>
  );
}
