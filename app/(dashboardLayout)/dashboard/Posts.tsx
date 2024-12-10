"use client";
import React from "react";
import { useQuery } from "react-query"; // Importing useQuery hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCommentAlt,
  faShare,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns"; // Importing the date-fns function

// Define the PostProps interface
interface PostProps {
  profilePhoto: string;
  userName: string;
  postTime: string;
  title: string;
  description: string;
  postPhoto?: string; // Optional
  likes: number;
  comments: number;
  shares: number;
}

const fetchPosts = async (): Promise<PostProps[]> => {
  const response = await fetch("http://localhost:3000/postData", {
    cache: "no-store", // Ensures fresh data fetch each time
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const Posts = () => {
  // Use react-query to fetch posts
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery("postData", fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts</div>;

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
            postPhoto,
            likes,
            comments,
            shares,
          },
          index
        ) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 mb-4"
            key={`${title}-${index}`}
          >
            {/* Header */}
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

            {/* Title */}
            <p className="mt-2 font-semibold">{title}</p>

            {/* Description */}
            <p className="mt-2 text-gray-700">{description}</p>

            {/* Post Photo */}
            {postPhoto && (
              <div className="mt-2">
                <Image
                  src={postPhoto}
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
                {likes} Likes &bull; {comments} Comments &bull; {shares} Shares
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
        )
      )}
    </>
  );
};

export default Posts;
