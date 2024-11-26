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

  return (
    <div>
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
