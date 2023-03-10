import produce from "immer";
import { WritableDraft } from "immer/dist/internal";
import { DisplayItem, SectionItemTypeEnum } from "~/store/builder/type";
import {
  CalculatorState,
  CalculatorStateAction,
  CalculatorStateActionEnum,
} from "./type";

export function reducer(
  state: CalculatorState,
  action: CalculatorStateAction,
): CalculatorState {
  switch (action.type) {
    case CalculatorStateActionEnum.SET_SECTIONS: {
      return produce(state, draft => {
        draft.sections = action.payload;
      });
    }
    case CalculatorStateActionEnum.SET_DISPLAY_VALUE: {
      return produce(state, draft => {
        let display: WritableDraft<DisplayItem> | undefined;

        for (const section of draft.sections) {
          display = section.items.find(
            i => i.type === SectionItemTypeEnum.DISPLAY,
          ) as WritableDraft<DisplayItem> | undefined;

          if (display) break;
        }

        if (!display) return;

        display.value = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
