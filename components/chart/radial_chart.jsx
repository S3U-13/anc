"use client";
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes"; // ✅ เพิ่มเข้ามา

export default function RadialChart({ chartRadialData }) {
  const [data, setData] = useState({
    series: [],
    labels: [],
  });

  const { theme } = useTheme(); // ✅ ดึง theme จาก next-themes

  useEffect(() => {
    if (chartRadialData && chartRadialData.am_count) {
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

  useEffect(() => {
    if (typeof window === "undefined" || data.series.length === 0) return;

    const isDark = theme === "dark";

    // 🎨 ปรับสีให้เหมาะกับ theme
    const colors = isDark
      ? ["#3b82f6", "#60a5fa", "#93c5fd"] // โทนน้ำเงินเข้มฟ้าใน dark mode
      : ["#60a5fa", "#93c5fd", "#bfdbfe"]; // โทนฟ้าอ่อนใน light mode

    const textColor = isDark ? "#d1d5db" : "#374151"; // สีตัวอักษร
    const bgColor = isDark ? "transparent" : "#ffffff";

    const options = {
      series: data.series,
      chart: {
        height: 500,
        type: "radialBar",
        background: bgColor,
      },
      colors,
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              show: true,
              label: "รวมทั้งหมด",
              color: textColor,
              formatter: function (w) {
                return w.globals.series.reduce((a, b) => a + b, 0) + " คน";
              },
            },
            name: {
              show: true,
              color: textColor,
            },
            value: {
              show: true,
              color: textColor,
              formatter: function (val) {
                return val + " คน";
              },
            },
          },
        },
      },
      labels: data.labels,
      theme: {
        mode: isDark ? "dark" : "light",
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart-02"), options);
    chart.render();

    return () => chart.destroy();
  }, [data, theme]); // ✅ อัปเดตเมื่อ theme เปลี่ยน

  // ✅ รวมยอดทั้งหมด
  const total = data.series.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div id="chart-02"></div>

      {data.series.length > 0 && (
        <div className="mx-auto w-[300px] text-center">
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
