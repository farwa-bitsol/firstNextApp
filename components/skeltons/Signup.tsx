import React from "react";

const SignupSkelton = () => {
  return (
    <div className="animate-pulse px-8 pt-16">
      {/* Header Skeleton */}
      <div className="flex justify-between space-x-2 mb-8">
        <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col gap-4 items-center justify-center h-[80vh] mx-auto max-w-md px-2">
        {/* Placeholder for Main Heading */}
        <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
        {/* Placeholder for Subtext */}
        <div className="w-64 h-4 bg-gray-300 rounded-md"></div>

        {/* Placeholder for Account Options */}
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="w-full h-20 bg-gray-300 rounded-md p-4"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SignupSkelton;
