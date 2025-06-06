import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModel } from "./components/CreateContentModel";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-4">
      <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex justify-end gap-4">
        <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Add content" onClick={() => setModalOpen(true)} />
        <Button startIcon={<ShareIcon />} variant="secondary" size="md" text="Share Memory" onClick={() => console.log("Secondary button clicked")} />
      </div>
      <div className="flex gap-4 min-h-screen bg-gray-100 p-4">
        <Card title="First Tweet" link="https://x.com/IndiaPostOffice/status/1926489225110663212" type="twitter" />
        <Card title="First Video" link="https://youtu.be/bXISlqXpTi8?si=7xDePEdRtGTB1jZC" type="youtube" />
      </div>
    </div>
  );
}

export default App;
