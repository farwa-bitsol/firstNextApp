"use client";

import useFetchUser from "@/hooks/useFetchUser";
import { IUser } from "@/models/types";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { SkeletonDeleteUser } from "./skeltons/User";
import axios from "axios";

const deleteUser = async (userId: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

const DeleteUser = ({
  user,
  invalidateQueryKey,
}: {
  user: IUser;
  invalidateQueryKey: any;
}) => {
  const { user: currentUser, isLoading: isUserLoading } = useFetchUser();
  const queryClient = useQueryClient();

  const {
    mutate: handleDelete,
    isLoading,
    isError,
    error,
  } = useMutation(deleteUser, {
    onSuccess: () => {
      // Invalidate the users query to refetch the updated list
      queryClient.invalidateQueries(invalidateQueryKey);
    },
  });

  if (isUserLoading || isLoading) {
    return <SkeletonDeleteUser />;
  }

  return (
    <div className="p-1 flex justify-between px-4">
      <div className="flex gap-4">
        <h1 className="font-bold text-gray-800">{user?.fullName}</h1>
        <h1 className="font-bold text-gray-800">{user?.email}</h1>
      </div>
      {currentUser?._id !== user._id && (
        <button
          type="button"
          className="text-blue-500 font-bold"
          onClick={() => handleDelete(user?._id ?? "")}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      )}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
    </div>
  );
};

export default DeleteUser;
