"use client";
import React, { useState } from "react";
import { loginAPI } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ import มาด้วย
import { addToast } from "@heroui/toast";

export default function useHook() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ ดึงฟังก์ชัน login มาจาก Context

  const [field, setField] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, res } = await loginAPI(field.user_name, field.password);
      login(data); // ✅ ใช้ได้แล้ว เพราะมาจาก Context
      if (data.user.role_id === 1) router.push("/dashboard");
      else router.push("/dashboard_admin");
      if (res.status == 200) {
        addToast({
          title: "สำเร็จ",
          description: "login สำเร็จ",
          color: "success",
          variant: "solid",
        });
      }
    } catch (err) {
      addToast({
        title: "ไม่สำเร็จ",
        // description: err.message || "เกิดข้อผิดพลาด",
        description: "login ไม่สำเร็จ",
        color: "danger",
        variant: "solid",
      });
    }
  };

  return {
    field,
    handleChange,
    handleSubmit,
  };
}
