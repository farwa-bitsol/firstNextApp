"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNav";
import SessionWrapper from "@/components/SessionWrapper";
import Loading from "./loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Check if the current route is the chat page
  const isChatPage = pathname.includes("/chat");

  // Constructing the classes dynamically using template literals
  const layoutClasses = `h-screen ${
    isChatPage ? "overflow-auto md:overflow-hidden" : "overflow-auto"
  }`;
  const mainClasses = `w-full ${isChatPage ? "" : "h-screen"} bg-[#EEF4FD]`;

  return (
    <div className={layoutClasses}>
      <DashboardNavbar />
      <SessionWrapper>
        <main className={mainClasses}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </SessionWrapper>
    </div>
  );
};

export default DashboardLayout;
