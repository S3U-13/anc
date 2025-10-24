"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

// dynamic import สำหรับ react-apexcharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const { theme } = useTheme();

  const series = [
    {
      name: "Visitors",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  // line chart options
  const options = useMemo(
    () => ({
      chart: {
        id: "basic-line",
        toolbar: { show: false },
        foreColor: theme === "dark" ? "#d1d5db" : "#374151",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
        labels: { style: { colors: theme === "dark" ? "#d1d5db" : "#374151" } },
      },
      stroke: { curve: "smooth" },
      grid: { borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb" },
      colors: ["#3b82f6"],
    }),
    [theme]
  );

  // donut chart options
  const donutSeries = [44, 33, 23];
  const donutOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        foreColor: theme === "dark" ? "#d1d5db" : "#374151",
      },
      labels: ["Desktop", "Mobile", "Tablet"],
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      legend: {
        position: "bottom",
        fontSize: "14px",
        labels: { colors: theme === "dark" ? "#d1d5db" : "#6b7280" },
      },
      dataLabels: {
        enabled: true,
        style: { colors: ["#374151"] },
        formatter: (val) => `${val.toFixed(0)}%`,
      },
      stroke: { show: false },
      plotOptions: { pie: { donut: { size: "60%" } } },
    }),
    [theme]
  );

  return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard (ยังใช้งานไม่ได้ใส่ไว้สวยๆ เฉยๆ)
        </h1>
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md border border-gray-200 dark:border-[#3d3d3d] hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Card {i}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              รายละเอียดตัวอย่าง
            </p>
          </div>
        ))}
      </section>

      {/* Charts side by side */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md border border-gray-200 dark:border-[#3d3d3d] col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Visitors Trend
          </h2>
          <Chart options={options} series={series} type="line" height={485} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md border border-gray-200 dark:border-[#3d3d3d]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Device Visitors
          </h2>
          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            height={485}
          />
        </div>
      </section>
    </div>
  );
}
