import { useQuery } from "react-query";
import axios from "axios";
import { PostProps } from "@/models/types";


const fetchPosts = async (): Promise<PostProps[]> => {
    const response = await axios.get("/api/posts");
    if (response.status !== 200) {
        throw new Error("Failed to fetch posts");
    }
    return response.data;
};

// Custom hook
const useFetchPosts = () => {
    const { data, isLoading, error } = useQuery("postData", fetchPosts);

    return {
        posts: data,
        isLoading,
        error,
    };
};

export default useFetchPosts;
