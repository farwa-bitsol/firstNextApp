import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostProps } from "@/models/types";

const useFetchPosts = (userId: string) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await axios.get(`/api/posts?userId=${userId}`);
      return response.data as PostProps[];
    },
  });
};

export default useFetchPosts;
