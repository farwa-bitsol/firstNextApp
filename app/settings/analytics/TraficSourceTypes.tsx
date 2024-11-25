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
    colors: ["#1A52E1", "#6792FF", "#4473EA", "#96B3FF"],

    series: [37.5, 33.6, 11, 6], // Data for the slices
    labels: ["Channel pages", "Direct or unkown", "Search", "External"], // Labels for the slices
    legend: {
      position: "right" as "right",
      offsetY: 80,
    },
  };

  return (
    <div id="donut">
      <ApexCharts
        options={options}
        series={options.series}
        type="donut"
        height={400}
      />
    </div>
  );
};

export default TrafficSourceTypes;
