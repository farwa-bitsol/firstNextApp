import React from "react";

const UpcomingEventsSkelton = () => {
  return (
    <div className="flex py-4 justify-between items-center flex-wrap animate-pulse">
      <div className="flex items-center">
        <div className="bg-gray-300 rounded-full h-12 w-12"></div>
        <div className="flex flex-col px-2">
          <div className="bg-gray-300 h-4 w-24 rounded-md mb-2"></div>
          <div className="bg-gray-300 h-3 w-16 rounded-md"></div>
        </div>
      </div>
      <div className="bg-gray-300 h-6 w-6 rounded-md"></div>
    </div>
  );
};

export default UpcomingEventsSkelton;
