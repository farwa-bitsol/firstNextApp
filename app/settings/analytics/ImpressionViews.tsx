"use client";

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const impressionsData = [
  [new Date("2023-11-01").getTime(), 1500],
  [new Date("2023-11-02").getTime(), 2200],
  [new Date("2023-11-03").getTime(), 1800],
  [new Date("2023-11-04").getTime(), 2500],
];

const ImpressionsChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Impressions",
      data: impressionsData,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "line" as "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "straight" as "straight",
      width: 2, // Line thickness
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 6, // Highlight data points
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
      title: {
        text: "Count",
      },
    },
    xaxis: {
      type: "datetime" as "datetime",
      title: {
        text: "Date",
      },
      labels: {
        formatter: function (val: string) {
          return new Date(parseInt(val)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        },
      },
    },
    tooltip: {
      shared: false, // Tooltip only for individual points
      y: {
        formatter: function (val: number) {
          return val.toFixed(0) + " counts";
        },
      },
    },
    colors: ["#FF4560"], // Custom color for the line
  });

  const dataVisuals = [
    { label: "Impressions", value: "383" },
    { label: "Click-through rate", value: "9.1%", isPrimary: true },
    { label: "Views", value: "97" },
    { label: "Unique viewers", value: "54" },
  ];

  return (
    <div>
      <div className="bg-white  w-fit rounded-lg flex gap-4">
        {dataVisuals.map((data) => (
          <div
            key={data.label}
            className={`flex flex-col justify-center items-center p-8 ${
              data.isPrimary ? "bg-[#1565D8] text-white rounded-xl" : ""
            }`}
          >
            <p className="text-sm text-center">{data.label}</p>
            <p className="text-xl font-bold text-center`">{data.value}</p>
          </div>
        ))}
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ImpressionsChart;
