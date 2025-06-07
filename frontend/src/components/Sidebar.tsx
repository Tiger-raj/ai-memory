import { HomeIcon } from "../icons/HomeIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex items-center text-2xl pt-8">
        <div className="text-purple-600">
          <Logo />
        </div>
        <span className="ml-2">Ai-Memory</span>
      </div>
      <div className="pt-8 pl-4">
        <SideBarItem text="Home" icon={<HomeIcon />} />
        <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
        <SideBarItem text="Twitter" icon={<TwitterIcon />} />
      </div>
    </div>
  );
}
