import React from "react";
import Image from "next/image";
import AddButton from "./addButton";

const friends = [
  { name: "user", profileUrl: "/images/profile.png" },
  { name: "user", profileUrl: "/images/profile.png" },
  { name: "user", profileUrl: "/images/profile.png" },
];

const AddFriends = () => {
  return (
    <div className="px-5 w-[100%]">
      <div className="flex justify-between flex-wrap items-center">
        <p className="font-bold text-lg">Add Friends</p>
        <button
          type="button"
          className="text-[#1565D8] border-b border-[#1565D8] pb-0 mb-0"
        >
          See All
        </button>
      </div>
      <div className="flex gap-1 overflow-x-auto overflow-y-hidden pb-1">
        {friends.map((friend, index) => (
          <div
            className="border flex flex-col relative justify-center my-2 w-fit p-4 rounded-md"
            key={`${friend.name}-${index}`}
          >
            <Image
              src="/images/profile.png"
              width={50}
              height={50}
              alt="User Profile"
              className="rounded-full"
            />
            <p className="text-center">user</p>
            <AddButton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriends;
