"use client";
import Overlay from "@/components/Overlay";
import { PostSkeleton } from "@/components/skeletons/Post";
import { useUser } from "@/Context/UserContextProvider";
import useFetchPosts from "@/hooks/useFetchPosts";
import { PostProps } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePostResponse {
  message: string;
}

const deletePost = async (postId: string): Promise<DeletePostResponse> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
  return response.json();
};

const Posts = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

  const { data: posts = [], isLoading } = useFetchPosts(user?._id || "");

  const { mutate: deletePostMutation, isPending: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const handleDelete = useCallback((postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation(postId);
    }
  }, [deletePostMutation]);

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <PostSkeleton />;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <Image
              src={post.profilePhoto || "/images/default-avatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">{post.userName}</h3>
              <p className="text-sm text-gray-500">{formatDate(post.postTime)}</p>
            </div>
          </div>
          {post.title && <h2 className="text-xl font-bold mt-2">{post.title}</h2>}
          {post.description && (
            <p className="mt-2 text-gray-700">{post.description}</p>
          )}
          {post.postMedia && (
            <div className="mt-4">
              <Image
                src={post.postMedia.data}
                alt={post.postMedia.name}
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-blue-500">
                Like ({post.likes})
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                Comment ({post.comments})
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                Share ({post.shares})
              </button>
            </div>
            {user?._id === post.userId && (
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
