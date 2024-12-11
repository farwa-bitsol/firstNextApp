"use client";

import DeleteUser from "@/components/DeleteUser";
import Logout from "@/components/Logout";
import Pagination from "@/components/Pagination";
import { IUser } from "@/models/types";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchUsers = async (page: number): Promise<IUser[]> => {
  const response = await fetch(`/api/users?_page=${page}&_limit=4`, {
    cache: "no-store", // Ensures fresh data fetch each time
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }

  return response.json();
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery(["fetchUsers", currentPage], () => fetchUsers(currentPage), {
    keepPreviousData: true, // Keeps data from the previous query while fetching new data
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

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
