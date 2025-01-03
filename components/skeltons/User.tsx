import React from "react";

export const SkeletonDeleteUser = () => {
  return (
    <div className="flex gap-4 p-4 animate-pulse">
      <div className="bg-gray-200 w-32 h-6 rounded"></div>
      <div className="bg-gray-200 w-40 h-6 rounded"></div>
    </div>
  );
};
