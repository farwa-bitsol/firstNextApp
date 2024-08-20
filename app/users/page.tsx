"use client";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/services/userService";
import DeleteUser from "@/components/DeleteUser";
import { IUser } from "@/models/types";
import Pagination from "@/components/Pagination";

const Page = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers(currentPage);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <div className="py-32 px-12">
      {users?.map((user, index) => (
        <DeleteUser key={index} user={user} />
      ))}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Page;
