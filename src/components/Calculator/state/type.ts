import { Section } from "~/store/builder/type";

export type CalculatorState = {
  sections: Section[];
};

export enum CalculatorStateActionEnum {
  SET_DISPLAY_VALUE = "SET_DISPLAY_VALUE",
  SET_SECTIONS = "SET_SECTIONS",
}

export type CalculatorStateAction =
  | {
      type: CalculatorStateActionEnum.SET_DISPLAY_VALUE;
      payload: string;
    }
  | {
      type: CalculatorStateActionEnum.SET_SECTIONS;
      payload: Section[];
    };
