import React from "react";
import RadialProgressbar from "./RadialProgressbar";
import TrafficSourceTypes from "./TraficSourceTypes";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-8 md:pt-10 px-10">
      <p className="text-2xl font-bold mb-4">Analytics</p>
      <div className="flex">
        <div className="bg-[#F6F9FF] w-72 h-44 m-4 p-6 rounded-2xl">
          <p className="text-lg font-medium">Your Progress</p>
          <RadialProgressbar />
        </div>

        <div className="bg-[#F6F9FF] max-w-[600px] max-h-fit m-4 p-6 rounded-2xl">
          <p className="text-2xl font-medium">Traffic source types</p>
          <p className="text-sm">Views · Last 28 days</p>
          <TrafficSourceTypes />
        </div>
      </div>
    </div>
  );
};

export default page;
