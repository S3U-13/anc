"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

export default function useHook() {
  const auth = useAuth();
  const [sumData, setSumData] = useState([]);
  const [chartBarData, setChartBarData] = useState([]);
  const [chartRadialData, setChartRadialData] = useState([]);

  useEffect(() => {
    fetchSumData();
    fetchChartBar();
    fetchChartRadial();
  }, []);

  const fetchSumData = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/sum-anc-service",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const json = await res.json().catch(() => []);
      setSumData(json);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchChartBar = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/chart-anc-service",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const json = await res.json().catch(() => []);
      setChartBarData(json);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchChartRadial = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/radial-anc-service",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const json = await res.json().catch(() => []);
      setChartRadialData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { sumData, chartBarData, chartRadialData };
}
