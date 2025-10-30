"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 โหลด token/user จาก storage ตอนเปิดเว็บ
  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 🟢 ฟังก์ชัน login/logout
  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    Cookies.set("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    localStorage.removeItem("user");
  };

  // 🟢 ตรวจว่า token หมดอายุไหม (เรียกได้จาก ProtectedRoute)
  const checkTokenTimeOut = async () => {
    if (!token) {
      logout();
      return false;
    }

    try {
      const res = await fetch(`${API_URL}/api/check-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res || res.status === 401 || res.status === 403) {
        logout();
        return false;
      }

      return true;
    } catch (err) {
      console.error("❌ Server error:", err);
      logout();
      return false;
    }
  };

  // 🟢 ตั้ง interval ตรวจ token ทุก 1 นาที
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      checkTokenTimeOut();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, checkTokenTimeOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
