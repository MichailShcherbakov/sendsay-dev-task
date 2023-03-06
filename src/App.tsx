import { UiButton } from "./ui-kit/Button";

export default function App() {
  return (
    <div className="flex flex-row p-16 gap-16">
      <UiButton>1</UiButton>
      <UiButton variant="primary" size="lg">
        =
      </UiButton>
    </div>
  );
}
