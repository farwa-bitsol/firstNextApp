"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

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
    colors: ["#6792FF", "#1A52E1", "#4473EA", "#96B3FF"], // data colors
    series: [37.5, 33.6, 11, 6], // data
    labels: ["Channel pages", "Direct or unknown", "Search", "External"], // labels
    legend: {
      show: false,
      position: "right" as "right",
      offsetY: 30,
    },
  };

  const data = [
    { label: "Channel pages", value: 37.5 },
    { label: "Direct or unknown", value: 33.6 },
    { label: "Search", value: 11 },
    { label: "External", value: 6 },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start flex-wrap">
      <ApexCharts
        options={options}
        series={options.series}
        type="donut"
        height={300}
      />

      {/* data Representation with Progress Bars */}
      <div className="bg-[#F6F9FF] w-full md:w-72 h-fit  m-4 p-6 rounded-2xl">
        <p className="text-lg font-medium">Traffic Source Breakdown</p>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-sm">{item.label}</p>
                <p className="text-sm">{item.value}%</p>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor:
                      item.label === "Channel pages"
                        ? "#6792FF"
                        : item.label === "Direct or unknown"
                        ? "#1A52E1"
                        : item.label === "Search"
                        ? "#4473EA"
                        : "#96B3FF",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficSourceTypes;
