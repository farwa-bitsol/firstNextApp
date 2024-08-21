"use client";

import { IUser } from "@/models/types";
import React from "react";
import { deleteUser } from "@/services/userService";

const DeleteUser = ({ user }: { user: IUser }) => {
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-1 flex justify-between px-4">
      <h1 className="font-bold text-gray-800">{user.fullName}</h1>
      <button
        type="button"
        className="text-blue-500 font-bold"
        onClick={() => handleDelete(user.id ?? "")}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
