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

const Recycled = () => {
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
      show: false, // Disable default legend
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center flex-wrap">
        <ApexCharts
          options={options}
          series={options.series}
          type="donut"
          height={300}
        />

        {/* Custom Legends with Color Dots */}
        <div className="w-full md:w-72 h-fit m-4 p-6 rounded-2xl">
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm font-medium"
              >
                {/* Label and Percentage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Color Dot */}
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colorMap[item.label] }}
                    />
                    &nbsp;&nbsp;<span>{item.label}</span>
                  </div>
                  <div>
                    <span>{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="p-4 rounded-lg text-[#A4A4CB] flex border border-[#A4A4CB]"
      >
        Read Full Report
      </button>
    </>
  );
};

export default Recycled;
