"use client";

import useFetchPosts from "@/hooks/useFetchPosts";

const PostCount = () => {
  const { posts, isLoading } = useFetchPosts();

  return (
    <p className="py-6">
      Would you like to delete your account? This account contains{" "}
      {isLoading ? "..." : posts?.length ?? 0} posts. Deleting your account will
      remove all the content associated with it.
    </p>
  );
};

export default PostCount;
