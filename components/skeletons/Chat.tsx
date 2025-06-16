import React from "react";

export const SkeletonChatMessages = () => (
  <div className="flex flex-col gap-4 py-8 px-4 h-screen">
    {/* Skeleton for chat messages */}
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
      <div className="flex-1 bg-gray-300 h-8 rounded-lg animate-pulse" />
    </div>
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
      <div className="flex-1 bg-gray-300 h-8 rounded-lg animate-pulse" />
    </div>
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
      <div className="flex-1 bg-gray-300 h-8 rounded-lg animate-pulse" />
    </div>
  </div>
);

export const SkeletonChatList = () => (
  <div className="space-y-4 h-screen">
    {/* Skeleton for chat list items */}
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full" />
      <div className="flex-1 bg-gray-300 h-6 rounded-lg animate-pulse" />
    </div>
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full" />
      <div className="flex-1 bg-gray-300 h-6 rounded-lg animate-pulse" />
    </div>
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full" />
      <div className="flex-1 bg-gray-300 h-6 rounded-lg animate-pulse" />
    </div>
  </div>
);

export const SkeletonSearch = () => (
  <div className="px-2 bg-white m-2 rounded-full">
    <div className="w-full p-2 bg-gray-300 animate-pulse rounded-full" />
  </div>
);
