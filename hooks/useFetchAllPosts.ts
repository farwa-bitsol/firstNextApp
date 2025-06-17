import { useQuery } from "@tanstack/react-query";
import { PostProps } from "@/models/types";

const fetchPosts = async (): Promise<PostProps[]> => {
    const response = await fetch("/api/allPosts");
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
};

// Custom hook
const useFetchAllPosts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["allPostData"],
        queryFn: fetchPosts,
    });

    return {
        posts: data,
        isLoading,
        error,
    };
};

export default useFetchAllPosts;
