"use client";
import SessionWrapper from "@/components/SessionWrapper";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import React from "react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SettingsSidebar />
      <SessionWrapper>
        <main className="w-full overflow-auto">{children}</main>
      </SessionWrapper>
    </div>
  );
};

export default SettingsLayout;
