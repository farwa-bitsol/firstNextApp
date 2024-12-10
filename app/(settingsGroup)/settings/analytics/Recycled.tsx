"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

const colorMap: Record<string, string> = {
  Text: "#1565D8",
  Images: "#5F9CF3",
  Documents: "#96B3FF",
  Videos: "#F572B9",
};

const data = [
  { label: "Text", value: 32 },
  { label: "Images", value: 25 },
  { label: "Documents", value: 22 },
  { label: "Videos", value: 11 },
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
    },
    colors: Object.values(colorMap), // data colors
    series: [37.5, 33.6, 11, 6], // data
    labels: Object.keys(colorMap), // labels
    legend: {
      show: false, // Disable default legend
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center flex-wrap">
      {/* Donut Chart */}
      <ApexCharts
        options={options}
        series={options.series}
        type="donut"
        height={300}
      />

      {/* Custom Legends Styled as a Table */}
      <div className="w-full md:w-72 h-fit m-4 p-6 rounded-2xl">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm font-medium"
            >
              {/* Left Side: Dot and Label */}
              <div className="flex items-center gap-2">
                {/* Color Dot */}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colorMap[item.label] }}
                />
                <span>{item.label}</span>
              </div>

              {/* Right Side: Percentage */}
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[#A4A4CB] w-full text-[#A4A4CB] text-center rounded-lg">
        <button type="button" className="p-4">
          Read Full Report
        </button>
      </div>
    </div>
  );
};

export default Recycled;
