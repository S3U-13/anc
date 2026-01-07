"use client";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (loading) return;

    // ❌ ผู้ใช้ไม่ได้ login
    if (!user) {
      router.replace("/");
      return;
    }
    // ❌ role ไม่ตรงกัน
    if (role) {
      const allowRoles = Array.isArray(role) ? role : [role];

      if (!allowRoles.includes(user.role_id)) {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, role]); // ลด dependency เพื่อป้องกันลูป

  // show loading screen
  if (loading) {
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
  }

  // block render ระหว่าง redirect
  if (!user) return null;

  return children;
}
