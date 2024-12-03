"use client";
import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import React from "react";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <SessionWrapper>
        <main className="w-full md:w-1/2">{children}</main>
      </SessionWrapper>
    </div>
  );
};

export default UsersLayout;
