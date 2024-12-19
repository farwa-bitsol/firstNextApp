"use client";

import { Routes } from "@/models/constants";
import axios from "axios";
import toast from "react-hot-toast";

export default function Logout() {
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response?.data?.success) {
        window.location.href = Routes.login;
      } else {
        toast.error("Failed to log out");
      }
    } catch (error: any) {
      toast.error("Logout failed, please try again later");
    }
  };

  return <button onClick={logout}>Logout</button>;
}
