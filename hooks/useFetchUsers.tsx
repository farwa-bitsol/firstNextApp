import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/models/types";

const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      return response.data;
    },
  });

  if (error) {
    toast.error("Failed to fetch users");
  }

  return { users, isLoading, error };
};

export default useFetchUsers;
