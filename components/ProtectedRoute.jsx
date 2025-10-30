"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, checkTokenTimeOut, logout } = useAuth(); // ✅ เพิ่ม checkTokenTimeOut, logout
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const verifyToken = async () => {
        const valid = await checkTokenTimeOut(); // ✅ ตรวจ token หมดอายุไหม
        if (!valid) {
          logout();
          router.replace("/"); // กลับหน้า login
          return;
        }

        if (!user) router.replace("/");
        else if (role && user.role_id !== role) router.replace("/unauthorized");
      };

      verifyToken();
    }
  }, [user, loading, role, router, checkTokenTimeOut, logout]);

  // ✅ แสดง loading spinner ระหว่างตรวจ token
  if (loading)
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <Spinner
          size="lg"
          classNames={{ label: "text-foreground" }}
          label="loading"
          variant="wave"
        />
      </div>
    );

  if (!user) return null; // ป้องกัน render ก่อนตรวจ user เสร็จ

  return children;
}
