"use client";
import React from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNav";
import SessionWrapper from "@/components/SessionWrapper";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto">
      <DashboardNavbar />
      <SessionWrapper>
        <main className="w-full bg-[#EEF4FD]">{children}</main>
      </SessionWrapper>
    </div>
  );
};

export default DashboardLayout;
