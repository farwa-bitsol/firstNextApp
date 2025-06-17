"use client";

import DeleteUser from "@/components/DeleteUser";
import LogoutSkeletonLoader from "@/components/skeletons/Logout";
import { Routes } from "@/models/constants";
import Link from "next/link";
import toast from "react-hot-toast";
import useFetchUsers from "@/hooks/useFetchUsers";
import { IUser } from "@/models/types";

const Users = () => {
  const { users, isLoading } = useFetchUsers();

  const logout = async () => {
    try {
      const response = await fetch("/api/users/logout");
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
      const data = await response.json();
      if (data?.success) {
        window.location.href = Routes.login;
      } else {
        toast.error("Failed to log out");
      }
    } catch (error: any) {
      toast.error("Logout failed, please try again later");
    }
  };

  if (isLoading) return <LogoutSkeletonLoader />;

  return (
    <>
      <div className="flex gap-4 justify-center mt-4 text-blue-500">
        <Link href={Routes.dashboard}>Dashboard</Link>
        <Link href={Routes.settings}>Settings</Link>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="py-32 px-12">
        {users?.map((user: IUser) => (
          <DeleteUser
            key={user?._id}
            user={user}
            invalidateQueryKey={["users"]}
          />
        ))}
      </div>
    </>
  );
};

export default Users;
