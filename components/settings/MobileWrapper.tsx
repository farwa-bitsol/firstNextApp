"use client";

import { Menu } from "lucide-react";
import { ReactNode, useState } from "react";

interface MobileWrapperProps {
  children: ReactNode;
}
const MobileWrapper = ({ children }: MobileWrapperProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#F5F9FF] z-20 p-4">
        <div className="flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-gray-700">
            <Menu size={24} />
          </button>
          <p className="text-xl font-bold">Settings</p>
          <div></div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#F5F9FF] shadow-lg z-10 p-4 transition-transform ${
          isSidebarOpen ? "transform-none" : "-translate-x-full"
        }`}
      >
        {children}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/2">
        <div className="h-screen w-64 bg-[#F5F9FF] shadow-lg z-10 p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileWrapper;
