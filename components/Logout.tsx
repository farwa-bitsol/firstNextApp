"use client";

import { Routes } from "@/models/constants";
import { signOut } from "next-auth/react";
import { useUser } from "@/Context/UserContextProvider";

const Logout = () => {
  const { clearUser } = useUser();

  const handleLogout = async () => {
    try {
      // Clear user context first
      clearUser();
      
      // Sign out from NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: Routes.login 
      });
      
      // Clear any custom cookies
      await fetch("/api/users/logout");
      
      // Force page refresh to clear session cache
      window.location.href = Routes.login;
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-blue-500 font-bold"
    >
      Logout
    </button>
  );
};

export default Logout;
