"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

const colorMap: Record<string, string> = {
  "Channel pages": "#1A52E1",
  "Direct or unknown": "#6792FF",
  Search: "#4473EA",
  External: "#96B3FF",
};

const data = [
  { label: "Channel pages", value: 37.5 },
  { label: "Direct or unknown", value: 33.6 },
  { label: "Search", value: 11 },
  { label: "External", value: 6 },
];

const TrafficSourceTypes = () => {
  const options = {
    chart: {
      type: "donut" as "donut",
      width: "100%",
      height: 400,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "75%",
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined,
      },
    },
    colors: Object.values(colorMap), // data colors
    series: [37.5, 33.6, 11, 6], // data
    labels: Object.keys(colorMap), // labels
    legend: {
      show: false,
      position: "right" as "right",
      offsetY: 30,
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-start flex-wrap">
      <ApexCharts
        options={options}
        series={options.series}
        type="donut"
        height={300}
      />

      {/* data Representation with Progress Bars */}
      <div className="w-full md:w-72 h-fit  m-4 p-6 rounded-2xl">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-sm">{item.label}</p>

              <div
                className={`w-[${item.value}%] h-2 bg-white rounded-full mt-2 flex items-center gap-2`}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: colorMap[item.label],
                  }}
                ></div>
                <div>
                  <p className="text-sm">{item.value}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-6 mb-2 text-[#1565D8] flex space-x-2  border-b-2 border-[#1565D8]"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default TrafficSourceTypes;
