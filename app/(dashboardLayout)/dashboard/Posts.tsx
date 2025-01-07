"use client";
import React, { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCommentAlt,
  faShare,
  faGlobe,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const PostSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-gray-300 rounded-full w-10 h-10"></div>
        <div className="ml-4">
          <div className="bg-gray-300 w-24 h-4 mb-2"></div>
          <div className="flex items-center text-gray-500 text-xs">
            <div className="bg-gray-300 w-12 h-4 mr-1"></div>
            <div className="bg-gray-300 w-6 h-4"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
    </div>

    {/* Title */}
    <div className="mt-2 bg-gray-300 w-1/2 h-4"></div>

    {/* Description */}
    <div className="mt-2 bg-gray-300 w-full h-4"></div>

    {/* Post Photo */}
    <div className="mt-2 bg-gray-300 w-full h-40"></div>

    {/* Likes, Comments, Shares */}
    <div className="mt-4 bg-gray-300 w-1/4 h-4"></div>

    {/* Actions */}
    <div className="mt-4 border-t pt-2 flex justify-around text-gray-600 text-sm">
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
    </div>
  </div>
);

interface PostMediaProps {
  contentType: string;
  data: string;
  name: string;
}
export interface PostProps {
  profilePhoto: string;
  postMedia: PostMediaProps | null;
  userName: string;
  postTime: string;
  title: string;
  description: string;
  postPhoto?: string; // Optional
  likes: number;
  comments: number;
  shares: number;
  _id: string;
}

const fetchPosts = async (): Promise<PostProps[]> => {
  const response = await axios.get("/api/posts");
  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }
  return response.data;
};

const deletePost = async (postId: string) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }
  toast.success("post deleted successfully");
  return postId;
};

const Posts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncateText = useCallback(
    (text: string, limit: number) =>
      text?.length > limit ? text?.slice(0, limit) : text,
    []
  );

  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery("postData", fetchPosts);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation(deletePost, {
    onSuccess: (postId) => {
      // Optimistically update UI after successful delete
      queryClient.invalidateQueries("postData");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  if (isLoading) return <PostSkeleton />;
  if (isError) return <div>Error fetching posts</div>;

  // If there are no posts, show a "No posts" message
  if (!postData || postData.length === 0) {
    return <div>No posts available</div>;
  }

  // Sort posts by postTime in descending order (newest first)
  const sortedPosts = postData?.sort((a, b) => {
    return new Date(b.postTime).getTime() - new Date(a.postTime).getTime();
  });
  return (
    <>
      {sortedPosts?.map(
        (
          {
            profilePhoto,
            postTime,
            title,
            userName,
            description,
            postMedia,
            likes,
            comments,
            shares,
            _id: postId,
          },
          index
        ) => {
          return (
            <div
              className="bg-white rounded-lg shadow-md p-4 mb-4"
              key={`${title}-${index}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={profilePhoto}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-bold text-sm">{userName}</p>
                    <div className="flex items-center text-gray-500 text-xs">
                      {/* Use formatDistanceToNow to display relative time */}
                      <span>
                        {postTime &&
                          formatDistanceToNow(new Date(postTime ?? ""), {
                            addSuffix: true,
                          })}{" "}
                        &bull;
                      </span>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="ml-1"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* Delete Icon */}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteMutate(postId)}
                  style={{ width: "16px", height: "16px" }}
                />
              </div>

              {/* Title */}
              <p className="mt-2 font-semibold">{title}</p>

              <div className="mt-2 text-gray-700">
                {isExpanded ? (
                  <>
                    <p>{description}</p>
                    <button
                      className="text-blue-500 mt-1 inline-block"
                      onClick={handleToggleExpand}
                    >
                      Less...
                    </button>
                  </>
                ) : (
                  <>
                    <p>{truncateText(description, 300)}</p>
                    {description.length > 300 && (
                      <button
                        className="text-blue-500 mt-1 inline-block"
                        onClick={handleToggleExpand}
                      >
                        Read More...
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Post Photo */}
              {postMedia && (
                <div className="mt-2">
                  <Image
                    src={`data:${postMedia.contentType};base64,${postMedia.data}`}
                    alt="Post"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}

              {/* Likes, Comments, Shares */}
              <div className="mt-4 text-gray-500 text-sm">
                <p>
                  {likes} Likes &bull; {comments} Comments &bull; {shares}{" "}
                  Shares
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 border-t pt-2 flex justify-around text-gray-600 text-sm">
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                  <span>Like</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faCommentAlt} className="mr-2" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faShare} className="mr-2" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default Posts;
