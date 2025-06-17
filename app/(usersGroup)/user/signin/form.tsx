"use client";

import { Routes } from "@/models/constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // Get the callback URL from the search params or use default
      const callbackUrl = searchParams.get("callbackUrl") || Routes.users;
      router.push(callbackUrl);
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error?.message || "An error occurred during login");
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
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <Link
            href={Routes.userForm}
            className={`text-blue-500 ${
              loading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
