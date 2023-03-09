import { useAppDispatch, useAppSelector } from "../hooks";
import { changeModeAction } from "./actions";
import { ModeEnum } from "./type";

export function useCurrentMode() {
  return useAppSelector(state => state.mode.value);
}

export function useModeActions() {
  const dispatch = useAppDispatch();

  function changeCurrentMode(mode: ModeEnum) {
    dispatch(changeModeAction({ mode }));
  }

  return {
    changeCurrentMode,
  };
}
