"use client";

import { useUser } from "@/Context/UserContextProvider";
import React from "react";
import UserPageInfoSkelton from "./skeletons/UserPageInfo";
import Link from "next/link";
import { Routes } from "@/models/constants";
import Logout from "./Logout";

const UserPageInfo = ({ Children }: { Children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
console.log('>>>>user',user)
  if (isLoading) return <UserPageInfoSkelton />;
  return (
    <div>
       <div className="flex justify-between space-x-2">
        <Link href={Routes.users} className="text-blue-500 font-bold">
          User Dashboard
        </Link>

        <div className="text-gray-700 space-x-2 border-b-2 border-transparent hover:border-blue-500">
          {user ? (
            <Logout />
          ) : (
            <>
              <p className="inline-block">Already have an account?</p>
              <Link href="/user/signin" className="text-blue-500 font-bold">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center h-[80vh] mx-auto max-w-md px-2">
        {user ? (
          <h1 className="text-2xl font-bold text-gray-800">
            {`Welcome to Dashboard ${user.fullName ?? user.email}!`}
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">Join Us!</h1>
            <p className="mt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              To begin this journey, tell us what type of account you&apos;d be
              opening.
            </p>
            <p>Let&apos;s get started</p>
            {Children}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPageInfo;
