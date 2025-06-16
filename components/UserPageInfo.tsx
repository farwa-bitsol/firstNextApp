"use client";

import { useUser } from "@/Context/UserContextProvider";
import React from "react";
import UserPageInfoSkelton from "./skeletons/UserPageInfo";

const UserPageInfo = ({ Children }: { Children: React.ReactNode }) => {
  const { user, isLoading } = useUser();

  if (isLoading) return <UserPageInfoSkelton />;
  return (
    <div>
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
