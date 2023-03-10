import React from "react";
import { UiTabsContextProvider } from "./TabsContext";

export interface UiTabsProps<TValue> {
  value: TValue;
  children: React.ReactNode;
}

export function UiTabs<TValue>(props: UiTabsProps<TValue>) {
  return <UiTabsContextProvider {...props} />;
}
