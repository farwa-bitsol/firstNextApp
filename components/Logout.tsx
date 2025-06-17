"use client";

import { Routes } from "@/models/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout");
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
      const data = await response.json();
      if (data?.success) {
        router.push(Routes.login);
      } else {
        toast.error("Failed to log out");
      }
    } catch (error: any) {
      toast.error("Logout failed, please try again later");
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
