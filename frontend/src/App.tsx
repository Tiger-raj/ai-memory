import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <>
      <Button startIcon={<PlusIcon />} variant="secondary" size="lg" text="Click Me" onClick={() => console.log("Button clicked")} />
      <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Click Me" onClick={() => console.log("Primary button clicked")} />
    </>
  );
}

export default App;
