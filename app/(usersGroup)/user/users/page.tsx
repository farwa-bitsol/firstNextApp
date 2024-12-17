"use client";

import DeleteUser from "@/components/DeleteUser";
import Logout from "@/components/Logout";
import Pagination from "@/components/Pagination";
import { IUser } from "@/models/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const fetchUsers = async (page: number): Promise<IUser[]> => {
  try {
    const response = await axios.get(`/api/users/userList?page=${page}`);
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

  const { data: users, isLoading } = useQuery(
    ["fetchUsers", currentPage],
    () => fetchUsers(currentPage),
    {
      keepPreviousData: true, // Keeps data from the previous query while fetching new data
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="absolute top-12 right-12 text-gray-700 flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500">
        <Logout />
      </div>
      <div className="py-32 px-12">
        {users?.map((user) => (
          <DeleteUser key={user.id} user={user} />
        ))}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Users;
