"use client";
import { PostSkeleton } from "@/components/skeltons/Post";
import useFetchPosts from "@/hooks/useFetchPosts";
import {
  faCommentAlt,
  faGlobe,
  faShare,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const deletePost = async (postId: string) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }
  toast.success("post deleted successfully");
  return postId;
};

const Posts = () => {
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    posts: postData,
    isLoading,
    error: isFetchPostError,
  } = useFetchPosts();

  const handleToggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const truncateText = useCallback(
    (text: string, limit: number) =>
      text?.length > limit ? text?.slice(0, limit) : text,
    []
  );

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation(deletePost, {
    onMutate: () => {
      setIsDeleting(true); // Start overlay when mutation begins
    },
    onSuccess: () => {
      queryClient.invalidateQueries("postData");
      setIsDeleting(false); // Stop overlay after mutation
    },
    onError: (error) => {
      setIsDeleting(false); // Stop overlay if there's an error
      console.error("Error deleting post:", error);
    },
  });

  if (isLoading) return <PostSkeleton />;
  if (isFetchPostError) return <div>Error fetching posts</div>;

  if (!postData || postData.length === 0) {
    return <div>No posts available</div>;
  }

  const sortedPosts = postData?.sort((a, b) => {
    return new Date(b.postTime).getTime() - new Date(a.postTime).getTime();
  });

  return (
    <>
      {/* Overlay when post is being deleted */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-blue-500 border-solid"></div>
            <p className="ml-4 text-lg font-semibold">Deleting post...</p>
          </div>
        </div>
      )}

      {/* Page content with dimming effect */}
      <div className={isDeleting ? "opacity-50 pointer-events-none" : ""}>
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

                <div
                  className="mt-2 text-gray-700"
                  style={{
                    whiteSpace: "break-spaces",
                  }}
                >
                  {expandedPosts[postId] ? (
                    <>
                      <p>{description}</p>
                      <button
                        className="text-blue-500 mt-1 inline-block"
                        onClick={() => handleToggleExpand(postId)}
                      >
                        Show Less...
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{truncateText(description, 300)}</p>
                      {description?.length > 300 && (
                        <button
                          className="text-blue-500 mt-1 inline-block"
                          onClick={() => handleToggleExpand(postId)}
                        >
                          Read More...
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Post Media */}
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
      </div>
    </>
  );
};

export default Posts;
