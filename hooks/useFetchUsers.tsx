import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IUser } from "@/models/types";

const useFetchUsers = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data.users as IUser[];
    },
  });

  if (error) {
    toast.error("Failed to fetch users");
  }

  return { users, isLoading, error };
};

export default useFetchUsers;
