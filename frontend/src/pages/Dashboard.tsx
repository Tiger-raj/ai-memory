import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { ShareMemoryModal } from "../components/ShareMemoryModal";
import { QueryModal } from "../components/QueryModal";
import { EditContentModal } from "../components/EditContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SidebarIcon } from "../icons/SidebarIcon";
import { QueryIcon } from "../icons/QueryIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string>("home");
  const [contentToDelete, setContentToDelete] = useState<{ id: string; title: string } | null>(null);
  const [contentToEdit, setContentToEdit] = useState<{
    _id: string;
    title: string;
    link: string;
    type: string;
    description?: string;
  } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareModalLoading, setShareModalLoading] = useState(false);
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
      } else {
        setShareUrl(null);
      }
    } catch (error) {
      console.error("Error checking sharing status:", error);
      setShareUrl(null);
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

  const handleShareModalOpen = async () => {
    setShareModalOpen(true);
    setShareModalLoading(true);
    // Check sharing status every time the modal opens
    await checkSharingStatus();
    setShareModalLoading(false);
  };

  const handleEditClick = (content: { _id: string; title: string; link: string; type: string; description?: string }) => {
    setContentToEdit(content);
    setEditModalOpen(true);
  };

  const getEmptyStateContent = () => {
    switch (selectedContentType) {
      case "home":
        return {
          title: "Your memory is empty",
          description: "Start building your digital memory by adding your first piece of content. Save videos, documents, links, and more!",
          buttonText: "Add your first content",
        };
      case "document":
        return {
          title: "No documents in your memory",
          description: "Add your important documents, notes, and text content to keep them organized and easily accessible.",
          buttonText: "Add your first document",
        };
      case "youtube":
        return {
          title: "No YouTube videos in your memory",
          description: "Save YouTube videos you want to remember. Create your own curated collection of educational and entertaining content.",
          buttonText: "Add your first video",
        };
      case "twitter":
        return {
          title: "No Twitter posts in your memory",
          description: "Save interesting tweets and Twitter threads that you want to reference later.",
          buttonText: "Add your first tweet",
        };
      case "pinterest":
        return {
          title: "No Pinterest content in your memory",
          description: "Save Pinterest pins and boards that inspire you or contain useful information.",
          buttonText: "Add your first pin",
        };
      case "linkedin":
        return {
          title: "No LinkedIn content in your memory",
          description: "Save professional LinkedIn posts, articles, and connections that matter to your career.",
          buttonText: "Add your first LinkedIn post",
        };
      case "instagram":
        return {
          title: "No Instagram content in your memory",
          description: "Save Instagram posts, reels, and stories that you want to keep for inspiration or reference.",
          buttonText: "Add your first Instagram post",
        };
      case "link":
        return {
          title: "No links in your memory",
          description: "Save useful websites, articles, and resources. Build your personal collection of valuable links.",
          buttonText: "Add your first link",
        };
      default:
        return {
          title: "Your memory is empty",
          description: "Start building your digital memory by adding your first piece of content. Save videos, documents, links, and more!",
          buttonText: "Add your first content",
        };
    }
  };

  const emptyStateContent = getEmptyStateContent();

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

          <EditContentModal
            open={editModalOpen}
            onClose={() => {
              setEditModalOpen(false);
              setContentToEdit(null);
              fetchContent();
            }}
            content={contentToEdit}
          />

          <DeleteConfirmationModal open={deleteModalOpen} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} title={contentToDelete?.title || ""} />

          <ShareMemoryModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} shareUrl={shareUrl} onEnableSharing={handleEnableSharing} onDisableSharing={handleDisableSharing} isLoading={shareLoading} isModalLoading={shareModalLoading} />

          <QueryModal open={queryModalOpen} onClose={() => setQueryModalOpen(false)} />

          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button startIcon={<QueryIcon />} variant="primary" size="md" text="Query your memory ?" onClick={() => setQueryModalOpen(true)} />
            <Button startIcon={<PlusIcon />} variant="primary" size="md" text="Add content" onClick={() => setModalOpen(true)} />
            <Button startIcon={<ShareIcon />} variant="secondary" size="md" text="Share Memory" onClick={handleShareModalOpen} />
          </div>

          {/* Content Section with Border */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[400px]">
            {content.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {content.map(({ _id, type, link, title, description }) => (
                  <Card key={_id} _id={_id} title={title} link={link} type={type} description={description} onDelete={handleDeleteClick} onEdit={handleEditClick} />
                ))}
              </div>
            ) : (
              // Dynamic Empty State
              <div className="flex flex-col items-center justify-center h-full py-16">
                <div className="text-gray-300 mb-6">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{emptyStateContent.title}</h3>
                <p className="text-gray-500 text-center mb-6 max-w-sm">{emptyStateContent.description}</p>
                <Button startIcon={<PlusIcon />} variant="primary" size="md" text={emptyStateContent.buttonText} onClick={() => setModalOpen(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
