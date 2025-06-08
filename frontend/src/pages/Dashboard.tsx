import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { ShareMemoryModal } from "../components/ShareMemoryModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SidebarIcon } from "../icons/SidebarIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string>("home");
  const [contentToDelete, setContentToDelete] = useState<{ id: string; title: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const { content, fetchContent } = useContent(selectedContentType);

  // Check if memory is already shared on component mount
  useEffect(() => {
    checkSharingStatus();
  }, []);

  const checkSharingStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.hash) {
        setShareUrl(`${window.location.origin}/share/${response.data.hash}`);
      }
    } catch (error) {
      console.error("Error checking sharing status:", error);
    }
  };

  const handleEnableSharing = async () => {
    setShareLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const hash = response.data.hash || response.data.shareLink;
      const newShareUrl = `${window.location.origin}/share/${hash}`;
      setShareUrl(newShareUrl);
    } catch (error) {
      console.error("Error enabling sharing:", error);
      alert("Failed to enable sharing. Please try again.");
    } finally {
      setShareLoading(false);
    }
  };

  const handleDisableSharing = async () => {
    setShareLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShareUrl(null);
    } catch (error) {
      console.error("Error disabling sharing:", error);
      alert("Failed to disable sharing. Please try again.");
    } finally {
      setShareLoading(false);
    }
  };

  const handleContentTypeChange = (contentType: string) => {
    setSelectedContentType(contentType);
    // Close mobile menu when content type changes
    setMobileMenuOpen(false);
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
    <div className="relative">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />}

      {/* Sidebar - Hidden on small screens, overlay on mobile when open */}
      <div className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out fixed z-50 md:z-auto`}>
        <Sidebar onContentTypeChange={handleContentTypeChange} selectedType={selectedContentType} onClose={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main content area */}
      <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${mobileMenuOpen ? "blur-sm md:blur-none" : ""} ml-0 md:ml-72`}>
        {/* Mobile header with menu button */}
        <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700 hover:text-gray-900 transition-colors">
            <SidebarIcon />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Ai-Memory</h1>
          <div className="w-6"></div> {/* Spacer for center alignment */}
        </div>

        <div className="p-4">
          <CreateContentModel
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              fetchContent();
            }}
          />

          <DeleteConfirmationModal open={deleteModalOpen} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} title={contentToDelete?.title || ""} />

          <ShareMemoryModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} shareUrl={shareUrl} onEnableSharing={handleEnableSharing} onDisableSharing={handleDisableSharing} isLoading={shareLoading} />

          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Add content" onClick={() => setModalOpen(true)} />
            <Button startIcon={<ShareIcon />} variant="secondary" size="md" text="Share Memory" onClick={() => setShareModalOpen(true)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {content.map(({ _id, type, link, title }) => (
              <Card key={_id} _id={_id} title={title} link={link} type={type} onDelete={handleDeleteClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
