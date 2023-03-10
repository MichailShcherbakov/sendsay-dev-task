import React from "react";

export type ToggleGroupContextType<TValue = unknown> = {
  currentValue: TValue | null;
  onChange: (value: TValue) => void;
};

export const initialContext: ToggleGroupContextType = {
  currentValue: null,
  onChange: () => {},
};

export const ToggleGroupContext = React.createContext(initialContext);

export type UiToggleGroupContextProviderProps<TValue> = {
  value?: TValue | null;
  onChange?: (value: TValue) => void;
  children?: React.ReactNode;
};

export function UiToggleGroupContextProvider<TValue>({
  value = null,
  onChange = () => {},
  children,
}: UiToggleGroupContextProviderProps<TValue>) {
  const contextValue = React.useMemo<ToggleGroupContextType<TValue>>(
    () => ({
      currentValue: value,
      onChange,
    }),
    [value, onChange],
  );

  return (
    <ToggleGroupContext.Provider value={contextValue as ToggleGroupContextType}>
      {children}
    </ToggleGroupContext.Provider>
  );
}

export function useToggleGroupState<TValue>() {
  const state = React.useContext(
    ToggleGroupContext,
  ) as ToggleGroupContextType<TValue>;
  return state;
}
