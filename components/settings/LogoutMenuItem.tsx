"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutMenuItem = () => {
  return (
    <div className="mt-auto py-2 fixed bottom-0 left-9">
      <button
        onClick={() => {
          signOut();
        }}
        className="w-full py-2 rounded-lg text-[#62618F]"
      >
        <div className="flex items-center space-x-2 justify-center">
          <LogOut size={20} />
          <p className="text-sm">Logout</p>
        </div>
      </button>
    </div>
  );
};

export default LogoutMenuItem;
