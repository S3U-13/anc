"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { addToast } from "@heroui/toast";
import { useAuth } from "@/context/AuthContext";

export default function useHook({ closeModal }) {
  const modalRef = useRef(null);
  const auth = useAuth();
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRole();
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/position", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await res.json();
      setPosition(json);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRole = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/role", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await res.json();
      setRole(json);
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------- Validation Schema -----------------
  const validationSchema = z
    .object({
      name: z.string().min(1, { message: "กรุณากรอกชื่อ-นามสกุล" }),
      user_name: z
        .string()
        .min(1, { message: "กรุณากรอกชื่อผู้ใช้" })
        .regex(/^[A-Za-z0-9]+$/, {
          message: "ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น",
        }),
      password: z
        .string()
        .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
        .regex(/^[A-Za-z0-9]+$/, {
          message: "รหัสผ่านห้ามมีอักษรพิเศษ",
        }),
      confirm_password: z.string().min(1, { message: "กรุณายืนยันรหัสผ่าน" }),
      position_id: z.preprocess(
        (val) => (val === "" || val === undefined ? 0 : Number(val)),
        z.number().min(1, { message: "กรุณาระบุตำแหน่ง" })
      ),
      role_id: z.preprocess(
        (val) => (val === "" || val === undefined ? 0 : Number(val)),
        z.number().min(1, { message: "กรุณาระบุบทบาท" })
      ),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "รหัสผ่านไม่ตรงกัน",
      path: ["confirm_password"],
    });

  const defaultValues = {
    name: "",
    user_name: "",
    password: "",
    confirm_password: "",
    position_id: "",
    role_id: "",
  };
  // ----------------- Form -----------------
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        // ✅ Validate ด้วย Zod ตอน submit เท่านั้น
        const result = validationSchema.safeParse(value);
        if (!result.success) {
          const firstError = result.error.issues[0];
          addToast({
            title: "ข้อมูลไม่ถูกต้อง",
            description: firstError?.message,
            color: "warning",
          });
          return;
        }

        // ✅ ส่งข้อมูลไป API
        const res = await fetch("http://localhost:3000/api/admin/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(result.data),
        });

        // ✅ ตรวจจับ error ที่ส่งจาก backend เช่น user_name ซ้ำ
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "เพิ่มผู้ใช้ไม่สำเร็จ");
        }

        addToast({
          title: "สำเร็จ",
          description: "เพิ่มผู้ใช้สำเร็จ",
          color: "success",
        });
        form.reset();
        closeModal();
      } catch (err) {
        addToast({
          title: "ไม่สำเร็จ",
          description: err.message || "เกิดข้อผิดพลาด",
          color: "danger",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // ----------------- Handle Change -----------------
  const handleChange = (name, value) => {
    form.setFieldValue(name, value);
  };

  return { role, position, form, validationSchema, handleChange, isSubmitting };
}
