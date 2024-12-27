import { LogOut } from "lucide-react";
import React from "react";
import Logout from "../Logout";

const LogoutMenuItem = () => {
  return (
    <div className="mt-auto py-2 fixed bottom-0 left-9 w-full rounded-lg text-[#62618F]">
      <div className="flex items-center space-x-2">
        <LogOut size={20} />
        <Logout />
      </div>
    </div>
  );
};

export default LogoutMenuItem;
