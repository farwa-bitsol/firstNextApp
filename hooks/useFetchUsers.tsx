import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/models/types";

const fetchUsers = async (page: number): Promise<{ users: IUser[] }> => {
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

export const useFetchUsers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, refetch } = useQuery(
    ["fetchUsers", currentPage],
    () => fetchUsers(currentPage),
    {
      keepPreviousData: true, // Keeps previous data while fetching new data
    }
  );

  return { data, isLoading, isError, currentPage, setCurrentPage, refetch };
};
