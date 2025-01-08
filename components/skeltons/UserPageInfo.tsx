import React from "react";

const UserPageInfoSkelton = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[80vh] mx-auto max-w-md px-2 animate-pulse">
      <div className="w-32 h-8 bg-gray-300 rounded-md"></div>
      <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
      <div className="w-full h-10 bg-gray-300 rounded-md mt-4"></div>
      <div className="w-full h-10 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default UserPageInfoSkelton;
