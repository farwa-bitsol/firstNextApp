"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/users");
    }
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen mx-auto max-w-md mt-10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset"
          type="email"
        />
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset"
          type="password"
        />
        <button type="submit" className="m-auto flex mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
