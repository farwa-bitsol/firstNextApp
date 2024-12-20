"use client";

import { IUser } from "@/models/types";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const deleteUser = async (userId: string): Promise<{ message: string }> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete user");
  }

  return response.json();
};

const DeleteUser = ({ user }: { user: IUser }) => {
  const queryClient = useQueryClient();

  const {
    mutate: handleDelete,
    isLoading,
    isError,
    error,
  } = useMutation(deleteUser, {
    onSuccess: () => {
      // Invalidate the users query to refetch the updated list
      queryClient.invalidateQueries("users");
    },
  });

  return (
    <div className="p-1 flex justify-between px-4">
      <div className="flex gap-4">
        <h1 className="font-bold text-gray-800">{user?.fullName}</h1>
        <h1 className="font-bold text-gray-800">{user?.email}</h1>
      </div>
      <button
        type="button"
        className="text-blue-500 font-bold"
        onClick={() => handleDelete(user.id ?? "")}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
    </div>
  );
};

export default DeleteUser;
