import { UiButtonVariant } from "../../ui-kit/Button";

export enum SectionItemTypeEnum {
  DISPLAY = "DISPLAY",
  CELL = "CELL",
}

export interface AbstractItem {
  id: string;
  type: SectionItemTypeEnum;
  cols?: number;
}

export interface DisplayItem extends AbstractItem {
  type: SectionItemTypeEnum.DISPLAY;
  value: string;
}

export interface CellItem extends AbstractItem {
  type: SectionItemTypeEnum.CELL;
  label: string;
  value: string;
  variant?: UiButtonVariant;
}

export type SectionItem = CellItem | DisplayItem;

export type Section = {
  id: string;
  cols: number;
  items: SectionItem[];
};
