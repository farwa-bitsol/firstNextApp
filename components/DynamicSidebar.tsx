"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SettingsSidebar from "./settings/SettingsSidebar";
import Sidebar from "./Sidebar";

const DynamicSidebar = () => {
  const pathname = usePathname();
  const isSettingsPage = pathname.startsWith("/settings");
  return isSettingsPage ? <SettingsSidebar /> : <Sidebar />;
};

export default DynamicSidebar;
