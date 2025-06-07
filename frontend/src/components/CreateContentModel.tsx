import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface openProps {
  open: boolean;
  onClose: () => void;
}

type ContentType = "youtube" | "twitter";

export function CreateContentModel({ open, onClose }: openProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("youtube");

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    if (title && link) {
      const content = {
        title,
        link,
        type,
      };
      // make it try catch block
      try {
        await axios.post(`${BACKEND_URL}/api/v1/content`, content, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Content added:", content);
        onClose();
      } catch (error) {
        console.error("Error adding content:", error);
      }
    } else {
      console.error("Title and link are required");
    }
  }

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
                <Input ref={titleRef} placeholder="Enter content title" />
                <Input ref={linkRef} placeholder="Enter content link" />
              </div>
              <div className="mt-4">
                <h1 className="text-lg">Select Content Type</h1>
                <div className="flex justify-between">
                  <Button variant={type === "youtube" ? "primary" : "secondary"} size="md" text="YouTube" onClick={() => setType("youtube")} />
                  <Button variant={type === "twitter" ? "primary" : "secondary"} size="md" text="Twitter" onClick={() => setType("twitter")} />
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" text="Add Content" onClick={addContent} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
