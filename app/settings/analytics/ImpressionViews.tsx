"use client"

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const impressionsData = [
  [new Date("2023-11-01").getTime(), 1500],
  [new Date("2023-11-02").getTime(), 1800],
  [new Date("2023-11-03").getTime(), 2000],
  [new Date("2023-11-04").getTime(), 1700],
];

const viewsData = [
  [new Date("2023-11-01").getTime(), 1200],
  [new Date("2023-11-02").getTime(), 1300],
  [new Date("2023-11-03").getTime(), 1600],
  [new Date("2023-11-04").getTime(), 1500],
];

const ImpressionsViewsChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Impressions",
      data: impressionsData,
    },
    {
      name: "Views",
      data: viewsData,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "area" as "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom" as "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    title: {
      text: "Impressions and Views Over Time",
      align: "left" as "left",
    },
    fill: {
      type: "gradient" as "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
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
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (val: number) {
          return val.toFixed(0) + " counts";
        },
      },
    },
    colors: ["#00E396", "#008FFB"],
  });

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ImpressionsViewsChart;
