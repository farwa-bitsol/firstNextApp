"use client";
import React from "react";
import Image from "next/image";
import useFetchUser from "@/hooks/useFetchUser";
const Profile = () => {
  const { user, isLoading } = useFetchUser();
  const SkeletonLoader = () => (
    <div className="flex items-center justify-center flex-col space-y-4">
      <div className="w-20 h-20 bg-gray-300 rounded-full animate-pulse" />{" "}
      {/* Profile picture */}
      <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse" />{" "}
      {/* Full name */}
      <div className="w-48 h-4 bg-gray-300 rounded-md animate-pulse" />{" "}
      {/* Email */}
    </div>
  );

  if (isLoading) return <SkeletonLoader />;
  return (
    <div className=" flex items-center justify-center flex-col">
      <Image
        src="/images/profile.png"
        width={80}
        height={80}
        alt="User Profile"
        className="rounded-xl"
      />
      <h1 className="pt-2 font-bold">{user?.fullName}</h1>
      <p className="text-[#62618F]">{user?.email}</p>
    </div>
  );
};

export default Profile;
