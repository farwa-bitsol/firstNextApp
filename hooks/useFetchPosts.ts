import { useQuery } from "@tanstack/react-query";
import { PostProps } from "@/models/types";

const useFetchPosts = (userId: string) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await fetch(`/api/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      return data as PostProps[];
    },
  });
};

export default useFetchPosts;
