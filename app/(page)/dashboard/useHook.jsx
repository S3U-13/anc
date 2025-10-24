import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useRef } from "react";

export default function useHook() {
  const auth = useAuth();
  const [sumData, setSumData] = useState([]);
  const [chartBarData, setChartBarData] = useState([]);
  const [chartRadialData, setChartRadialData] = useState([]);
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล

  useEffect(() => {
    if (!auth.token || didFetch.current) return;

    didFetch.current = true; // mark ว่า fetch แล้ว

    const fetchAllData = async () => {
      try {
        const [sumRes, barRes, radialRes] = await Promise.all([
          fetch("http://localhost:3000/api/user/sum-anc-service", {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
          fetch("http://localhost:3000/api/user/chart-anc-service", {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
          fetch("http://localhost:3000/api/user/radial-anc-service", {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
        ]);

        const [sumJson, barJson, radialJson] = await Promise.all([
          sumRes.json().catch(() => []),
          barRes.json().catch(() => []),
          radialRes.json().catch(() => []),
        ]);

        setSumData(sumJson);
        setChartBarData(barJson);
        setChartRadialData(radialJson);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, [auth.token]);

  return { sumData, chartBarData, chartRadialData };
}
