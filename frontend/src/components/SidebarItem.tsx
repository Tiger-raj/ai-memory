import type { ReactElement } from "react";

export function SideBarItem({ text, icon }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex items-center py-4  hover:bg-gray-100 text-gray-700 cursor-pointer transition-all duration-200 rounded pl-4">
      {icon}
      <span className="ml-2">{text}</span>
    </div>
  );
}
