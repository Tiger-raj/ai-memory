import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="bg-white rounded-md border border-gray-300 p-4 max-w-96 min-h-48 min-w-72">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank" className="hover:text-blue-500">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div>
          {type === "youtube" && <iframe className="w-full" src={link.includes("youtu.be/") ? link.replace("youtu.be/", "www.youtube.com/embed/") : link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

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
