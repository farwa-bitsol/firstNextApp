"use client"
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ExpensesChart = () => {
  // Define the initial data for the chart
  const [chartData, setChartData] = useState<{
    series: { data: number[] }[];
    categories: string[] | number[];
  }>({
    series: [
      { data: [44, 55, 41, 64, 22, 43, 21] },
      { data: [53, 32, 33, 52, 13, 44, 32] },
    ],
    categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007], // Initially numbers
  });

  // Chart options
  const options = {
    chart: { type: "bar" as "bar", height: 430 },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    stroke: { show: true, width: 1, colors: ["#fff"] },
    tooltip: { shared: true, intersect: false },
    xaxis: { categories: chartData.categories },
  };

  // Button click handler to update the chart
  const handleViewChange = (view: any) => {
    if (view === "weekly") {
      setChartData({
        series: [
          { data: [10, 20, 30, 40, 50, 60, 70] },
          { data: [15, 25, 35, 45, 55, 65, 75] },
        ],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      });
    } else if (view === "monthly") {
      setChartData({
        series: [
          { data: [200, 300, 250, 400, 450, 500, 350] },
          { data: [180, 320, 300, 420, 480, 520, 370] },
        ],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      });
    } else if (view === "yearly") {
      setChartData({
        series: [
          { data: [3000, 3200, 3400, 3600, 3800, 4000, 4200] },
          { data: [2800, 3100, 3300, 3500, 3700, 3900, 4100] },
        ],
        categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023],
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleViewChange("weekly")}>Weekly</button>
        <button onClick={() => handleViewChange("monthly")}>Monthly</button>
        <button onClick={() => handleViewChange("yearly")}>Yearly</button>
      </div>
      <ReactApexChart
        options={{ ...options, xaxis: { categories: chartData.categories } }}
        series={chartData.series}
        type="bar"
        height={430}
      />
    </div>
  );
};

export default ExpensesChart;
