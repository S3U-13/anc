"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function BarChart() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ กัน error SSR
      const options = {
        series: [
          {
            data: [21, 22, 10, 28, 16, 21, 13, 30, 20, 10, 15, 16],
          },
        ],
        chart: {
          height: 510,
          type: "bar",
        },
        colors: ["#98cbfb"], // ฟ้าอ่อน modern
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
            borderRadius: 2, // ✅ มุมโค้งนิดๆ ดูทันสมัย
          },
        },
        stroke: {
          show: true, // ✅ แสดงเส้นกรอบ
          width: 1, // ✅ ความหนาเส้น
          colors: ["#63abf7"], // ✅ สีกรอบ (น้ำเงินกรมท่า เรียบหรู)
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
              fontSize: "12px",
            },
          },
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#chart-01"),
        options
      );
      chart.render();

      // ✅ cleanup ป้องกัน chart ซ้ำเวลา re-render
      return () => {
        chart.destroy();
      };
    }
  }, []);
  return (
    <div>
      <div id="chart-01"></div>
    </div>
  );
}
