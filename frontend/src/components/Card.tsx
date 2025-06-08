import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { DocumentIcon } from "../icons/DocumentIcon";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: (id: string, title: string) => void;
}

export function Card({ _id, title, link, type, onDelete }: CardProps) {
  return (
    <div>
      <div className="bg-white rounded-md border border-gray-300 p-4 w-full min-h-48">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <DocumentIcon />
            </div>
            <span className="truncate">{title}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank" className="hover:text-blue-500">
                <LinkIcon />
              </a>
            </div>
            <div className="text-gray-500 pr-2 hover:text-red-500 cursor-pointer" onClick={() => onDelete(_id, title)}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div>
          {type === "youtube" && <iframe className="w-full aspect-video" src={link.includes("youtu.be/") ? link.replace("youtu.be/", "www.youtube.com/embed/") : link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
