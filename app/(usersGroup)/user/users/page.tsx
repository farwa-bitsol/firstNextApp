"use client";

import DeleteUser from "@/components/DeleteUser";
import Pagination from "@/components/Pagination";
import LogoutSkeletonLoader from "@/components/skeltons/Logout";
import { Routes } from "@/models/constants";
import { IUser } from "@/models/types";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const fetchUsers = async (page: number): Promise<{ users: IUser[] }> => {
  try {
    const response = await axios.get(`/api/users/userList`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||
      error?.message ||
      error?.error ||
      "Failed to fetch users";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useQuery(
    ["fetchUsers", currentPage],
    () => fetchUsers(currentPage),
    {
      keepPreviousData: true, // Keeps data from the previous query while fetching new data
    }
  );

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

  if (isLoading) return <LogoutSkeletonLoader />;

  return (
    <>
      <div className="flex gap-4 justify-center mt-4 text-blue-500">
        <Link href={Routes.dashboard}>Dashboard</Link>
        <Link href={Routes.settings}>Settings</Link>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="py-32 px-12">
        {data?.users?.map((user) => (
          <DeleteUser
            key={user?._id}
            user={user}
            invalidateQueryKey={["fetchUsers", currentPage]}
          />
        ))}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Users;
