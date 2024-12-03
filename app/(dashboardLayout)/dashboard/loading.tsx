import React from "react";

const Loading = () => {
  return (
    <div className="flex gap-4 py-8 justify-center animate-pulse">
      {/* left side */}
      <div className="hidden lg:flex flex-col gap-4 w-1/5">
        <div className="bg-gray-300 h-40 px-4 py-6 rounded-lg"></div>
        <div className="bg-gray-300 h-28 p-4 rounded-lg"></div>
        <div className="bg-gray-300 h-28 p-4 rounded-lg"></div>
        <div className="bg-gray-300 h-28 p-4 rounded-lg"></div>
      </div>

      {/* main side */}
      <div className="flex-1 max-w-2xl space-y-4">
        <div className="bg-gray-300 h-16 rounded-lg"></div>
        <div className="bg-gray-300 h-40 px-4 py-6 rounded-lg"></div>
      </div>

      {/* right side */}
      <div className="hidden lg:flex flex-col w-1/5 space-y-4">
        <div className="bg-gray-300 h-28 p-4 rounded-lg"></div>
        <div className="bg-gray-300 h-28 p-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Loading;
