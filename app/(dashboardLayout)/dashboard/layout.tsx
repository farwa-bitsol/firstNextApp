"use client";
import React, { Suspense } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNav";
import SessionWrapper from "@/components/SessionWrapper";
import Loading from "./loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto">
      <DashboardNavbar />
      <SessionWrapper>
        <main className="w-full h-screen bg-[#EEF4FD]">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </SessionWrapper>
    </div>
  );
};

export default DashboardLayout;
