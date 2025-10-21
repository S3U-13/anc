"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

export default function useHook() {
  const auth = useAuth();
  const [sumData, setSumData] = useState([]);

  useEffect(() => {
    fetchSumData();
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
  return { sumData };
}
