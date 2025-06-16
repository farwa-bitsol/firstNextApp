"use client";

import { useUser } from "@/Context/UserContextProvider";
import { IUser, ApiError } from "@/models/types";
import axios from "axios";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { SkeletonDeleteUser } from "./skeletons/User";

const deleteUser = async (userId: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage =
      apiError?.response?.data?.error ||
      apiError?.message ||
      "Failed to delete user";
    throw new Error(errorMessage);
  }
};

const DeleteUser = ({
  user,
  invalidateQueryKey,
}: {
  user: IUser;
  invalidateQueryKey: any;
}) => {
  const { user: currentUser, isLoading: isUserLoading } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: handleDelete,
    isPending,
    isError,
    error,
  }: UseMutationResult<{ message: string }, Error, string> = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the updated list
      queryClient.invalidateQueries(invalidateQueryKey);
    },
  });

  if (isUserLoading || isPending) {
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
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      )}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
    </div>
  );
};

export default DeleteUser;
