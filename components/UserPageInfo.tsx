"use client";

import { IUser } from "@/models/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserPageInfo = ({ Children }: { Children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ data: IUser }>(`/api/users/me`);
        setUser(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          error?.error ||
          "Failed to fetch user";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  console.log(">>>user2", user);
  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center h-[80vh] mx-auto max-w-md px-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <h1 className="text-2xl font-bold text-gray-800">
            {`Welcome to Dashboard ${user.fullName ?? user.email}!`}
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">Join Us!</h1>
            <p className="mt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              To begin this journey, tell us what type of account you’d be
              opening.
            </p>
            {Children}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPageInfo;
