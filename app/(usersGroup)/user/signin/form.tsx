"use client";

import { Routes } from "@/models/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const user = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push(Routes.users);
    } catch (error: any) {
      console.log("Login failed", error);

      // Extract error message
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        error?.error ||
        "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen mx-auto max-w-md mt-10">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset"
          type="email"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset"
          type="password"
        />
        <div className="flex justify-center items-center gap-4 mt-2">
          {" "}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <Link
            href={Routes.userForm}
            className={`text-blue-500 ${
              loading ? "pointer-events-none opacity-50" : "" // disable link on loading
            }`}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
