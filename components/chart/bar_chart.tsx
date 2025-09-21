'use client';
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function BarChart() {
    useEffect(() => {
        if (typeof window !== "undefined") {   // ✅ กัน error SSR
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
                colors: [
                    "#9873d9",
                    "#9e7bdb",
                    "#9f7ed9",
                    "#a183d6",
                    "#a285d4",
                    "#a48ad1",
                ],
                plotOptions: {
                    bar: {
                        columnWidth: "45%",
                        distributed: true,
                    },
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

            const chart = new ApexCharts(document.querySelector("#chart-01"), options);
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
    )
}

