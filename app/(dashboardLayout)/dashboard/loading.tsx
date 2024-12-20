import React from "react";

const Loading = () => {
  return (
    <div className="flex px-8 justify-center animate-pulse h-screen">
      {/* main side */}
      <div className="flex flex-col w-full md:w-[80%] gap-4 justify-center items-center">
        <div className="bg-gray-300 h-28 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-28 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-28 rounded-lg w-full"></div>
        <div className="bg-gray-300 h-28 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default Loading;
