import { Provider as ReduxProvider } from "react-redux";
import { ModeManager } from "~/components/ModeManager";
import { store } from "../store";

export function HomeLayout() {
  return (
    <ReduxProvider store={store}>
      <div className="flex flex-col w-screen h-screen items-center justify-center overflow-hidden">
        <ModeManager />
      </div>
    </ReduxProvider>
  );
}
