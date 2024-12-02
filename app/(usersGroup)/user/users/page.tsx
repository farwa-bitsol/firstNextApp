"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "@/services/userService";
import DeleteUser from "@/components/DeleteUser";
import { IUser } from "@/models/types";
import Pagination from "@/components/Pagination";
import Logout from "@/components/Logout";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getUsers = useCallback(async () => {
    try {
      const fetchedUsers = await fetchUsers(currentPage);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <div className="absolute top-12 right-12 text-gray-700 flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500">
        <Logout />
      </div>
      <div className="py-32 px-12">
        {users?.map((user, index) => (
          <DeleteUser key={index} user={user} />
        ))}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Users;
