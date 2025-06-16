"use client";

import useFetchPosts from "@/hooks/useFetchPosts";
import { useUser } from "@/Context/UserContextProvider";

const PostCount = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: posts, isLoading } = useFetchPosts(user?._id ?? "");

  return (
    <p className="py-6">
      Would you like to delete your account? This account contains{" "}
      {isUserLoading || isLoading ? "..." : posts?.length ?? 0} posts. Deleting your account will
      remove all the content associated with it.
    </p>
  );
};

export default PostCount;
