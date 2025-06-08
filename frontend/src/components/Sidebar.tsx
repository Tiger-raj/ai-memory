import { HomeIcon } from "../icons/HomeIcon";
import { Logo } from "../icons/Logo";
import { LogOutIcon } from "../icons/LogoutIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { SideBarItem } from "./SidebarItem";

interface SidebarProps {
  onContentTypeChange: (contentType: string) => void;
  selectedType: string;
  onClose?: () => void;
}

export function Sidebar({ onContentTypeChange, selectedType, onClose }: SidebarProps) {
  return (
    <div className="h-screen bg-white border-r w-72 left-0 top-0 pl-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-2xl pt-8">
          <div className="flex items-center">
            <div className="text-purple-600">
              <Logo />
            </div>
            <span className="ml-2">Ai-Memory</span>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700 mr-6">
              <CrossIcon />
            </button>
          )}
        </div>
        <div className="pt-8 pl-4">
          <SideBarItem text="Home" icon={<HomeIcon />} onClick={() => onContentTypeChange("home")} isSelected={selectedType === "home"} />
          <SideBarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => onContentTypeChange("youtube")} isSelected={selectedType === "youtube"} />
          <SideBarItem text="Twitter" icon={<TwitterIcon />} onClick={() => onContentTypeChange("twitter")} isSelected={selectedType === "twitter"} />
        </div>
      </div>
      <div className="pl-4 mb-4">
        <SideBarItem
          text="Logout"
          icon={<LogOutIcon />}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/signin";
          }}
        />
      </div>
    </div>
  );
}
