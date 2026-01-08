"use client";
import { useApiRequest } from "@/hooks/useApi";
import { createContext, useContext, useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { logoutAPI } = useApiRequest();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // 🟢 ฟังก์ชัน login/logout
  const login = (data) => {
    if (!data?.user) return;
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.error("logout failed", e);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const checkTokenTimeout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/check-token`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return false;
      }

      return data;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const result = await checkTokenTimeout();

        if (!result || result.status === "TOKEN_EXPIRED") {
          logout(); // clear state + redirect
        }
      },
      60 * 1000 * 60
    ); // เช็คทุก 1 ชั่วโมง

    return () => clearInterval(interval);
  }, []);
  // 🟢 ตรวจ token หมดอายุไหม

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
