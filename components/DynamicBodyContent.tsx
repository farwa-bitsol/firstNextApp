"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SettingsSidebar from "./settings/SettingsSidebar";
import Sidebar from "./Sidebar";
import SessionWrapper from "./SessionWrapper";
import DashboardNavbar from "./dashboard/DashboardNav";

const DynamicBodyContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSettingsPage = pathname.startsWith("/settings");
  const isDashboardPage = pathname.startsWith("/dashboard");
  if (isDashboardPage) {
    return (
      <div className="h-screen overflow-auto">
        <DashboardNavbar />
        <SessionWrapper>
          <main className="w-full  bg-[#EEF4FD]">{children}</main>
        </SessionWrapper>
      </div>
    );
  }
  if (isSettingsPage) {
    return (
      <div className="flex h-screen">
        <SettingsSidebar />
        <SessionWrapper>
          <main className="w-full overflow-auto">{children}</main>
        </SessionWrapper>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <SessionWrapper>
        <main className="w-full md:w-1/2">{children}</main>
      </SessionWrapper>
    </div>
  );
};

export default DynamicBodyContent;
