"use client";
import { useApiRequest } from "@/hooks/useApi";
import { Spinner } from "@heroui/react";
import React, { useEffect, useState, useRef } from "react";

export default function useHook() {
  const { fetchAllData } = useApiRequest();
  const [sumData, setSumData] = useState([]);
  const [chartBarData, setChartBarData] = useState([]);
  const [chartRadialData, setChartRadialData] = useState([]);
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (didFetch.current) return;

    didFetch.current = true;
    setLoading(true);

    fetchAllData()
      .then(({ sumData, chartBarData, chartRadialData }) => {
        setSumData(sumData);
        setChartBarData(chartBarData);
        setChartRadialData(chartRadialData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { sumData, chartBarData, chartRadialData };
}
