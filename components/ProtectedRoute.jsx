"use client"; // ✅ ต้องมี
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress } from "@heroui/progress";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/react";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/");
      else if (role && user.role_id !== role) router.replace("/unauthorized");
    }
  }, [user, loading, router, role]);

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
    ); // รอ context โหลดก่อน
  if (!user) return null; // ป้องกัน render ก่อนโหลด user

  return children;
}
