"use client";
import Image from "next/image";
import React from "react";

const users = [
  {
    name: "Guy",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
  {
    name: "John",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
  {
    name: "Steve",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
];

const UserStories = () => {
  return (
    <div className="flex space-x-4 w-full overflow-x-auto justify-center overflow-y-hidden">
      <div className="relative w-[80px] h-[140px] sm:w-[160px] sm:h-[250px] shadow-lg">
        <div
          className="w-full h-[75%] flex items-center justify-center rounded-tl-lg rounded-tr-lg"
          style={{
            backgroundImage: `url(/images/profile.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <button
          className="absolute left-1/2 top-[75%] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => {}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2 h-2 transform scale-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        <div className="w-full h-[25%] bg-white flex items-center justify-center  text-xs lg:text-sm font-semibold text-gray-700 rounded-bl-lg rounded-br-lg">
          Create Story
        </div>
      </div>

      {users.map((user, index) => (
        <div
          className="relative w-[80px] h-[140px] sm:w-[160px] sm:h-[250px] rounded-lg overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(${user.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={`${user.name}-${index}`}
        >
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-white">
            {user.name}
          </div>

          <div className="absolute top-2 left-2 w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full border-2 border-white overflow-hidden">
            <Image
              src={user.profile}
              width={60}
              height={60}
              alt="User Profile"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStories;
