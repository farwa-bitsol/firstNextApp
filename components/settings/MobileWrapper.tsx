"use client";

import { Menu } from "lucide-react";
import { ReactNode, useState, useEffect, useRef } from "react";

interface MobileWrapperProps {
  children: ReactNode;
}

const MobileWrapper = ({ children }: MobileWrapperProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const topMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar if click outside of the sidebar or the top menu
  const handleClickOutside = (e: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target as Node) &&
      topMenuRef.current &&
      !topMenuRef.current.contains(e.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  // Set up event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={topMenuRef}
        className={`md:hidden fixed top-0 left-0  w-full bg-[#F5F9FF] z-20 p-4 transition-all shadow-md ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-700">
            <Menu size={24} />
          </button>
          <p className="text-xl m-auto">Settings</p>
          <div></div>
        </div>
      </div>

      <div
        ref={sidebarRef}
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
