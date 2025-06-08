import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string>("home");
  const [contentToDelete, setContentToDelete] = useState<{ id: string; title: string } | null>(null);
  const { content, fetchContent } = useContent(selectedContentType);

  const handleContentTypeChange = (contentType: string) => {
    setSelectedContentType(contentType);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setContentToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contentToDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          contentId: contentToDelete.id,
        },
      });

      // Refresh content after successful deletion
      fetchContent();

      // Close modal and reset state
      setDeleteModalOpen(false);
      setContentToDelete(null);

      console.log("Content deleted successfully");
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setContentToDelete(null);
  };

  return (
    <div>
      <Sidebar onContentTypeChange={handleContentTypeChange} selectedType={selectedContentType} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchContent();
          }}
        />

        <DeleteConfirmationModal open={deleteModalOpen} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} title={contentToDelete?.title || ""} />

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
            <Card key={_id} _id={_id} title={title} link={link} type={type} onDelete={handleDeleteClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
