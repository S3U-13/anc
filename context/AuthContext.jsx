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

  const checkTokenTimeOut = async () => {};

  // 🟢 ตรวจ token หมดอายุไหม

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
