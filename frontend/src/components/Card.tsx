import { ShareIcon } from "../icons/ShareIcon";

export function Card() {
  return (
    <div>
      <div className="bg-white rounded-md border border-gray-300 p-4 max-w-96">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            Project Ideas
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div>
          {/* <iframe className="w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
          {/* this is to embed yt video */}
          <blockquote className="twitter-tweet">
            <a href="https://twitter.com/username/status/807811447862468608"></a>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
