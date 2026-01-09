"use client";
import { useApiRequest } from "@/hooks/useApi";
import { createContext, useContext, useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { logoutAPI, checkToken } = useApiRequest();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const ROLE_REDIRECT = {
    1: "/dashboard/",
    2: "/dashboard_admin/",
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res?.status === "VALID") {
          const redirectPath = ROLE_REDIRECT[res.user.role_id];

          const isLoginPage = pathname === "/";

          if (isLoginPage && redirectPath) {
            router.replace(redirectPath);
          }
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      })
      .finally(() => setLoading(false));
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
          logout(); // clear state + redirect ไป login
        }
      },
      60 * 60 * 1000
    ); // ทุก 1 ชม

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
