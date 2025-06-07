import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, fetchContent } = useContent();

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchContent();
          }}
        />
        <div className="flex justify-end gap-4">
          <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Add content" onClick={() => setModalOpen(true)} />
          <Button
            startIcon={<ShareIcon />}
            variant="secondary"
            size="md"
            text="Share Memory"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const shareUrl = `https://localhost:5173/share/${response.data.hash}`;
              navigator.clipboard.writeText(shareUrl);
              alert("Memory shared! Link copied to clipboard.");
            }}
          />
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          {content.map(({ _id, type, link, title }) => (
            <Card key={_id} title={title} link={link} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}
