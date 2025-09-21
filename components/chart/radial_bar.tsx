'use client';
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

export default function RadialBar() {
    // ✅ เก็บข้อมูล series และ labels ใน state
    const [data, setData] = useState({
        series: [76, 67, 61],
        labels: ["ตรวจ", "ไม่ตรวจ", "รอปรึกษา"],
    });

    useEffect(() => {
        const options = {
            series: data.series,
            chart: {
                height: 500,
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        total: {
                            show: true,
                            label: "รวมทั้งหมด",
                            formatter: function (w: any) {
                                return (
                                    w.globals.series.reduce((a: number, b: number) => a + b, 0) +
                                    " คน"
                                );
                            },
                        },
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                            formatter: function (val: number) {
                                return val + " คน";
                            },
                        },
                    },
                },
            },
            labels: data.labels,
            colors: ["#683cb4", "#9873d9", "#ac8de3"],
        };

        const chart = new ApexCharts(document.querySelector("#chart-02"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [data]);

    // ✅ คำนวณรวมทั้งหมด
    const total = data.series.reduce((a, b) => a + b, 0);

    return (
        <div>
            <div id="chart-02"></div>
            <div className="mx-auto w-[300px] text-center">
                <h1 className="text-gray-600">รวมทั้งหมด {total} <span>คน</span></h1>
                {data.labels.map((label, index) => (
                    <h1 className="text-gray-600" key={index}>
                        {label} {data.series[index]} <span>คน</span>
                    </h1>
                ))}
            </div>
        </div>
    );
}
