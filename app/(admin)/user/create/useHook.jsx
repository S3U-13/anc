"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { addToast } from "@heroui/toast";

export default function useHook() {
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRole();
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/position");
      const json = await res.json();
      setPosition(json);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRole = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/role");
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
        .min(1, { message: "กรุณากรอกชื่อผู้ใช้งาน" })
        .regex(/^[A-Za-z0-9]+$/, {
          message: "ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น",
        }),
      password: z
        .string()
        .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
        .regex(/^[A-Za-z0-9]+$/, {
          message: "รหัสผ่านต้องประกอบด้วยตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น",
        }),
      confirm_password: z.string().min(1, {
        message: "กรุณากรอกรหัสผ่านอีกครั้งเพื่อตรวจสอบ",
      }),
      position: z.string().min(1, { message: "กรุณาระบุตำแหน่ง" }),
      role: z.string().min(1, { message: "กรุณาระบุบทบาท" }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirm_password"],
          message: "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน",
        });
      }
    });

  const defaultValues = {
    name: "",
    user_name: "",
    password: "",
    confirm_password: "",
    position: "",
    role: "",
  };

  // ----------------- Form -----------------
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (isSubmitting) return;
      try {
        // Validate ด้วย zod
        const result = validationSchema.safeParse(value);
        if (!result.success) {
          throw result.error;
        }

        const res = await fetch("http://localhost:3000/api/addUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (!res.ok) throw new Error("เพิ่มผู้ใช้ไม่สำเร็จ");

        addToast({
          title: "สำเร็จ",
          description: "เพิ่มผู้ใช้สำเร็จ",
          variant: "flat",
          color: "success",
        });
        form.reset();
      } catch (error) {
        addToast({
          title: "ไม่สำเร็จ",
          description: error?.errors?.[0]?.message || "เพิ่มผู้ใช้ไม่สำเร็จ",
          variant: "flat",
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

  return { role, position, form, validationSchema, handleChange };
}
