import { useTabsState } from "./TabsContext";

export interface UiTabPanelProps<TValue> {
  value: TValue;
  children: React.ReactNode;
}

export function UiTabPanel<TValue>({
  value,
  children = null,
}: UiTabPanelProps<TValue>) {
  const state = useTabsState();

  if (state.currentValue !== value) return null;

  return <>{children}</>;
}
