import { Section, SectionItemTypeEnum } from "./type";

export const SECTIONS: Section[] = [
  {
    id: "1",
    cols: 1,
    items: [
      {
        id: "1-1",
        type: SectionItemTypeEnum.DISPLAY,
        value: "0",
      },
    ],
  },
  {
    id: "2",
    cols: 4,
    items: [
      {
        id: "2-1",
        type: SectionItemTypeEnum.CELL,
        label: "/",
        value: "/",
      },
      {
        id: "2-2",
        type: SectionItemTypeEnum.CELL,
        label: "x",
        value: "*",
      },
      {
        id: "2-3",
        type: SectionItemTypeEnum.CELL,
        label: "-",
        value: "-",
      },
      {
        id: "2-4",
        type: SectionItemTypeEnum.CELL,
        label: "+",
        value: "+",
      },
    ],
  },
  {
    id: "3",
    cols: 3,
    items: [
      {
        id: "3-1",
        type: SectionItemTypeEnum.CELL,
        label: "7",
        value: "7",
      },
      {
        id: "3-2",
        type: SectionItemTypeEnum.CELL,
        label: "8",
        value: "8",
      },
      {
        id: "3-3",
        type: SectionItemTypeEnum.CELL,
        label: "9",
        value: "9",
      },
      {
        id: "3-4",
        type: SectionItemTypeEnum.CELL,
        label: "4",
        value: "4",
      },
      {
        id: "3-5",
        type: SectionItemTypeEnum.CELL,
        label: "5",
        value: "5",
      },
      {
        id: "3-6",
        type: SectionItemTypeEnum.CELL,
        label: "6",
        value: "6",
      },
      {
        id: "3-7",
        type: SectionItemTypeEnum.CELL,
        label: "1",
        value: "1",
      },
      {
        id: "3-8",
        type: SectionItemTypeEnum.CELL,
        label: "2",
        value: "2",
      },
      {
        id: "3-9",
        type: SectionItemTypeEnum.CELL,
        label: "3",
        value: "3",
      },
      {
        id: "3-10",
        type: SectionItemTypeEnum.CELL,
        label: "0",
        value: "0",
        cols: 2,
      },
      {
        id: "3-11",
        type: SectionItemTypeEnum.CELL,
        label: ",",
        value: ".",
      },
    ],
  },
  {
    id: "4",
    cols: 1,
    items: [
      {
        id: "4-1",
        type: SectionItemTypeEnum.CELL,
        label: "=",
        value: "=",
        variant: "primary",
      },
    ],
  },
];
