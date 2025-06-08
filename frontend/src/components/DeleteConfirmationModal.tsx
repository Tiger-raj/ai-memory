import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function DeleteConfirmationModal({ open, onClose, onConfirm, title }: DeleteConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="w-screen h-screen bg-white/20 backdrop-blur-sm fixed top-0 left-0 flex justify-center z-50">
      <div className="flex flex-col justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg min-w-96">
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <CrossIcon />
            </button>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Delete Content</h2>
            <p className="text-gray-600">Are you sure you want to delete "{title}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" size="md" text="No, Keep it" onClick={onClose} />
            <Button variant="danger" size="md" text="Yes, Delete" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
