"use client";

import DeleteUser from "@/components/DeleteUser";
import Pagination from "@/components/Pagination";
import LogoutSkeletonLoader from "@/components/skeltons/Logout";
import { Routes } from "@/models/constants";
import Link from "next/link";
import toast from "react-hot-toast";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import axios from "axios";

const Users = () => {
  const { data, isLoading, currentPage, setCurrentPage } = useFetchUsers();

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
