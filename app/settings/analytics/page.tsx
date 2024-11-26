import React from "react";
import RadialProgressbar from "./RadialProgressbar";
import TrafficSourceTypes from "./TraficSourceTypes";
import Goals from "./Goals";
import Recycled from "./Recycled";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-20 md:pt-10 px-16">
      <p className="text-2xl font-bold mb-4">Analytics</p>
      <div className="flex flex-wrap gap-4">
        <div className="bg-[#F6F9FF] flex-auto md:w[40%] h-60 p-6 rounded-2xl">
          <p className="text-lg font-medium pb-6">Your Progress</p>
          <RadialProgressbar />
        </div>

        <div className="bg-[#F6F9FF] flex-auto md:w-[60%] p-6 rounded-2xl">
          <p className="text-2xl font-medium">Traffic source types</p>
          <p className="text-sm">Views · Last 28 days</p>
          <TrafficSourceTypes />
        </div>

        <div className="bg-[#F6F9FF] w-fit  p-6 rounded-2xl">
          <p className="text-lg font-medium pb-6">Recycled</p>
          <Recycled />
        </div>

        <div className="bg-[#F6F9FF] w-fit p-6 rounded-2xl">
          <p className="text-2xl font-medium">Goals</p>

          <Goals />
        </div>
      </div>
    </div>
  );
};

export default page;
