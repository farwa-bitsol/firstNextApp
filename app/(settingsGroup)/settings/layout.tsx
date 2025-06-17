"use client";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import React, { Suspense } from "react";
import { GeneralFormSkeleton } from "@/components/skeletons/GeneralForm";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SettingsSidebar />
      <main className="w-full overflow-auto">
        <Suspense fallback={<GeneralFormSkeleton />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default SettingsLayout;
