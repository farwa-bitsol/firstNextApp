"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SettingsSidebar from "./settings/SettingsSidebar";
import Sidebar from "./Sidebar";
import SessionWrapper from "./SessionWrapper";

const DynamicBodyContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSettingsPage = pathname.startsWith("/settings");
  return isSettingsPage ? (
    <>
      <SettingsSidebar />
      <SessionWrapper>
        <main className="w-full overflow-auto">{children}</main>
      </SessionWrapper>
    </>
  ) : (
    <>
      <Sidebar />
      <SessionWrapper>
        <main className="w-full md:w-1/2">{children}</main>
      </SessionWrapper>
    </>
  );
};

export default DynamicBodyContent;
