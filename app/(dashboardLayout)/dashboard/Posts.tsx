import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCommentAlt,
  faShare,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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

const postData = [
  {
    profilePhoto: "/images/profile.png",
    userName: "John Doe",
    postTime: "2 hours ago",
    title: "A day in the life of a software developer",
    description: "Had a productive day coding and debugging!",
    postPhoto: "/images/code.jpg", // Optional
    likes: 120,
    comments: 45,
    shares: 10,
  },
];

const Posts = () => {
  return (
    <>
      {postData.map(
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
                  <span>{postTime} &bull;</span>
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
