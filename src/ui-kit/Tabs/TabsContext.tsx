import React from "react";

export type TabsContextType<TValue = unknown> = {
  currentValue: TValue | null;
};

export const initialContext: TabsContextType = {
  currentValue: null,
};

export const TabsContext = React.createContext(initialContext);

export type UiTabsContextProviderProps<TValue> = {
  value?: TValue | null;
  children?: React.ReactNode;
};

export function UiTabsContextProvider<TValue>({
  value = null,
  children,
}: UiTabsContextProviderProps<TValue>) {
  const contextValue = React.useMemo<TabsContextType<TValue>>(
    () => ({
      currentValue: value,
    }),
    [value],
  );

  return (
    <TabsContext.Provider value={contextValue as TabsContextType}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsState<TValue>() {
  const state = React.useContext(TabsContext) as TabsContextType<TValue>;
  return state;
}
