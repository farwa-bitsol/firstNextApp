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

  return (
    <div
      className={`h-screen ${
        isChatPage ? "sm:overflow-auto md:overflow-hidden" : "overflow-auto"
      } `}
    >
      <DashboardNavbar />
      <SessionWrapper>
        <main className={`w-full ${isChatPage ? "" : "h-screen"} bg-[#EEF4FD]`}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </SessionWrapper>
    </div>
  );
};

export default DashboardLayout;
