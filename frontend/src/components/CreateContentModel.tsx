// controlled component

import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface openProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: openProps) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-white/20 backdrop-blur-sm fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="bg-white p-4 rounded">
              <div className="flex justify-end mb-2">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <CrossIcon />
                </button>
              </div>
              <div>
                {/* input component  */}
                <Input placeholder="Enter content link" />
                <Input placeholder="Enter content title" />
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    text="Add Content"
                    onClick={() => {
                      console.log("Content added");
                      onClose();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
