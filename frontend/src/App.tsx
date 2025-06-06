import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Add content" onClick={() => console.log("Button clicked")} />
      <Button startIcon={<ShareIcon />} variant="secondary" size="md" text="Share Memory" onClick={() => console.log("Secondary button clicked")} />
      <Card />
    </>
  );
}

export default App;
