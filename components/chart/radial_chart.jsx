"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ✅ ReactApexChart dynamic import (ไม่ SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function RadialChart({ chartRadialData }) {
  const [data, setData] = useState({ series: [], labels: [] });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ✅ เตรียมข้อมูล
  useEffect(() => {
    if (chartRadialData?.am_count) {
      const amCount = chartRadialData.am_count;
      const labels = Object.keys(amCount).map((key) => {
        switch (key) {
          case "am_5":
            return "ตรวจ";
          case "am_6":
            return "ไม่ตรวจ";
          case "am_7":
            return "รอปรึกษา";
          default:
            return key;
        }
      });
      const series = Object.values(amCount);
      setData({ labels, series });
    }
  }, [chartRadialData]);

  const colors = isDark
    ? ["#3b82f6", "#60a5fa", "#93c5fd"]
    : ["#fe68a6", "#fe68a6", "#fe68a6"];
  const textColor = isDark ? "#d1d5db" : "#374151";

  const options = {
    chart: { type: "radialBar", background: "transparent" },
    colors,
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: "รวมทั้งหมด",
            color: textColor,
            formatter: (w) =>
              w.globals.series.reduce((a, b) => a + b, 0) + " คน",
          },
          name: { show: true, color: textColor },
          value: {
            show: true,
            color: textColor,
            formatter: (val) => val + " คน",
          },
        },
      },
    },
    labels: data.labels,
    theme: { mode: isDark ? "dark" : "light" },
  };

  const total = data.series.reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* ✅ container เดิม */}
      <div id="chart-02">
        <ReactApexChart
          options={options}
          series={data.series}
          type="radialBar"
        />
      </div>

      {data.series.length > 0 && (
        <div className="mx-auto text-[10px] xl:text-lg w-[300px] text-center">
          <h1 className="text-gray-600 dark:text-gray-300">
            รวมทั้งหมด {total} <span>คน</span>
          </h1>
          {data.labels.map((label, index) => (
            <h1 className="text-gray-600 dark:text-gray-300" key={index}>
              {label} {data.series[index]} <span>คน</span>
            </h1>
          ))}
        </div>
      )}
    </div>
  );
}
