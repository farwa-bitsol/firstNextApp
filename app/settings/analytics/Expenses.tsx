"use client";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ExpensesChart = () => {
  // data for chart
  const [chartData, setChartData] = useState<{
    series: { data: number[]; barWidth?: string }[];
    categories: string[] | number[];
  }>({
    series: [
      { data: [44, 55, 41, 64, 22, 43, 21], barWidth: "40%" },
      { data: [55, 41, 64, 22, 43, 21], barWidth: "20%" },
    ],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // default render
  });

  const [viewChange, setViewChange] = useState<string>("weekly");

  const options = {
    chart: { type: "bar" as "bar", height: 430 },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -6,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    stroke: { show: true, width: 1, colors: ["#fff"] },
    tooltip: { shared: true, intersect: false },
    xaxis: { categories: chartData.categories },
    yaxis: {
      labels: {
        formatter: (value: number | undefined) =>
          value != null ? value.toString() : "",
      },
    },
  };

  const handleViewChange = (view: string) => {
    setViewChange(view); // Update the current view state
    if (view === "weekly") {
      setChartData({
        series: [
          { data: [10, 20, 30, 40, 50, 60, 70], barWidth: "50%" },
          { data: [20, 30, 40, 50, 60, 70], barWidth: "30%" },
        ],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      });
    } else if (view === "monthly") {
      setChartData({
        series: [
          { data: [200, 300, 250, 400, 450, 500, 350], barWidth: "60%" },
          { data: [300, 250, 400, 450, 500, 350], barWidth: "40%" },
        ],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      });
    } else if (view === "yearly") {
      setChartData({
        series: [
          { data: [3000, 3200, 3400, 3600, 3800, 4000, 4200], barWidth: "70%" },
          { data: [3200, 3400, 3600, 3800, 4000, 4200], barWidth: "50%" },
        ],
        categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023],
      });
    }
  };

  const buttons = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  return (
    <div>
      <div className="bg-[#1565D814] border w-fit p-1 rounded-full gap-4 flex">
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`rounded-full py-4 px-6 ${
              viewChange === button.value
                ? "bg-[#1565D8] text-white"
                : "text-[#1D235A]"
            }`}
            onClick={() => handleViewChange(button.value)}
          >
            {button.label}
          </button>
        ))}
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
