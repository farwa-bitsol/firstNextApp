import React from "react";

const LogoutSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Navigation Skeleton */}
      <div className="flex gap-4 justify-center mt-4">
        <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
      </div>
      {/* User List Skeleton */}
      <div className="py-32 px-12">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 mb-4 border border-gray-300 rounded-md"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="w-48 h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
            </div>
            <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </div>
      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-4 gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-8 h-8 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default LogoutSkeletonLoader;
