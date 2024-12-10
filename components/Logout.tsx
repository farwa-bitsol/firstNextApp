"use client";

import { apiUrl } from "@/models/constants";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: apiUrl });
      }}
    >
      Logout
    </button>
  );
}
