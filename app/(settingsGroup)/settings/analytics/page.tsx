"use client";

import React from "react";
import dynamic from 'next/dynamic';
import RadialProgressbar from "./RadialProgressbar";
import Goals from "./Goals";
import SelectField from "./SelectField";

// Dynamically import chart components with ssr: false
const TrafficSourceTypes = dynamic(() => import("./TraficSourceTypes"), { ssr: false });
const Recycled = dynamic(() => import("./Recycled"), { ssr: false });
const ImpressionsViewsChart = dynamic(() => import("./ImpressionViews"), { ssr: false });
const ExpensesChart = dynamic(() => import("./Expenses"), { ssr: false });

const recycledSelectOptions = [{ label: "This month", value: "current-month" }];

const Page = () => {
  return (
    <div className="flex flex-col justify-start pt-20 md:pt-10 px-14 pb-8">
      <p className="text-2xl font-bold mb-4">Analytics</p>
      <div className="grid grid-cols-10  gap-4 grid-rows-[auto]">
        <div className="bg-[#F6F9FF] p-6 rounded-2xl col-span-12 lg:col-span-4 lg:row-span-2">
          <p className="text-lg font-medium pb-6">Your Progress</p>
          <RadialProgressbar />
        </div>

        <div className="bg-[#F6F9FF]  p-6 rounded-2xl col-span-12 lg:col-span-6 lg:row-span-4">
          <p className="text-2xl font-medium">Traffic source types</p>
          <p className="text-sm">Views · Last 28 days</p>
          <TrafficSourceTypes />
        </div>

        <div className="bg-[#F6F9FF]  p-6 rounded-2xl col-span-12 lg:col-span-4 lg:row-span-4">
          <p className="text-lg font-medium">Recycled</p>
          <Recycled />
        </div>

        <div className="bg-[#F6F9FF] p-6 px-8 rounded-2xl col-span-12 lg:col-span-6 lg:row-span-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Goals</p>
            <SelectField options={recycledSelectOptions} />
          </div>
          <Goals />
        </div>

        <div className="bg-[#F6F9FF] p-6 rounded-2xl col-span-12 lg:col-span-4 lg:row-span-2">
          <p className="text-2xl font-medium pb-6">Your Tasks</p>
          <RadialProgressbar hideDrescription />
        </div>

        <div className="bg-[#F6F9FF] p-6 rounded-2xl col-span-10">
          <ImpressionsViewsChart />
        </div>

        <div className="bg-[#F6F9FF] p-6 rounded-2xl col-span-10">
          <p className="text-2xl font-medium pb-6">Expenses</p>
          <ExpensesChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
