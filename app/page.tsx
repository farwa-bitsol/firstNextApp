import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative bg-white h-screen">
      <div className="absolute top-12 right-12 text-gray-700 flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500">
        <p>Already have an account?</p>
        <Link href="/signin" className="text-blue-500  font-bold">
          Sign in
        </Link>
      </div>

      {/* main content */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to the Home Page
        </h1>
      </div>
    </div>
  );
}
