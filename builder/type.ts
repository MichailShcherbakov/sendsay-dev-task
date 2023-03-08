import { UiButtonVariant } from "../src/ui-kit/Button";

export type ItemType = "display" | "cell";

export interface AbstractItem {
  id: string;
  type: ItemType;
  cols?: number;
}

export interface DisplayItem extends AbstractItem {
  type: "display";
  value: string;
}

export interface CellItem extends AbstractItem {
  type: "cell";
  label: string;
  variant?: UiButtonVariant;
}

export type SectionItem = CellItem | DisplayItem;

export type Section = {
  id: string;
  cols: number;
  items: SectionItem[];
};
