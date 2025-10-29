"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

// ✅ โหลด ReactApexChart แบบ dynamic (ไม่ SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BarChart({ chartBarData }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ✅ state เก็บความสูง chart (คำนวณจากขนาดหน้าจอจริง)
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      const h = Math.min(window.innerHeight * 0.6, 520);
      setChartHeight(h);
    };
    updateHeight(); // คำนวณครั้งแรก
    window.addEventListener("resize", updateHeight); // อัปเดตเมื่อ resize
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { options, series } = useMemo(() => {
    const counts =
      chartBarData?.sum_anc_by_month?.map((item) => item.count) || [];

    const colors = isDark ? ["#60a5fa"] : ["#93c5fd"];
    const strokeColor = isDark ? "#2563eb" : "#3b82f6";
    const textColor = isDark ? "#e5e7eb" : "#1f2937";

    return {
      series: [{ name: "จำนวน ANC ต่อเดือน", data: counts }],
      options: {
        chart: {
          type: "bar",
          background: "transparent",
          toolbar: { show: false },
        },
        colors,
        plotOptions: {
          bar: { columnWidth: "45%", distributed: true, borderRadius: 3 },
        },
        stroke: { show: true, width: 1, colors: [strokeColor] },
        dataLabels: { enabled: false },
        legend: { show: false },
        xaxis: {
          categories: [
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
          ],
          labels: { style: { colors: textColor, fontSize: "12px" } },
        },
        yaxis: {
          labels: { style: { colors: textColor, fontSize: "12px" } },
        },
        grid: { borderColor: isDark ? "#374151" : "#e5e7eb" },
        theme: { mode: isDark ? "dark" : "light" },
      },
    };
  }, [chartBarData, isDark]);

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={chartHeight}
      />
    </div>
  );
}
