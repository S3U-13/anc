"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes";

export default function BarChart({ chartBarData }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDark = theme === "dark";

    const counts =
      chartBarData.sum_anc_by_month?.map((item) => item.count) || [];

    // 🎨 สีตาม theme
    const colors = isDark ? ["#60a5fa"] : ["#93c5fd"];
    const strokeColor = isDark ? "#2563eb" : "#3b82f6";
    const textColor = isDark ? "#e5e7eb" : "#1f2937";
    const bgColor = isDark ? "#1f2937" : "#ffffff"; // สำหรับพื้นหลัง chart

    const options = {
      series: [
        {
          name: "จำนวน ANC ต่อเดือน",
          data: counts,
        },
      ],
      chart: {
        height: 510,
        type: "bar",
        background: "transparent",
      },
      colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          borderRadius: 2,
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: [strokeColor],
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ],
        labels: {
          style: {
            colors: textColor,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      grid: {
        borderColor: isDark ? "#374151" : "#e5e7eb",
      },
      theme: {
        mode: isDark ? "dark" : "light",
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart-01"), options);
    chart.render();

    // 🧹 ล้าง chart เก่าทุกครั้งที่ theme หรือ data เปลี่ยน
    return () => chart.destroy();
  }, [chartBarData, theme]); // ✅ update เมื่อ theme เปลี่ยน

  return (
    <div>
      <div id="chart-01"></div>
    </div>
  );
}
