"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { addToast } from "@heroui/toast";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({ closeModal }) {
  const { fetchPosition, fetchRole, submitCreateUser } = useApiRequest();
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRole()
      .then((data) => setRole(data))
      .catch(console.error);
    fetchPosition()
      .then((data) => setPosition(data))
      .catch(console.error);
  }, []);

  // ----------------- Validation Schema -----------------
  const validationSchema = z
    .object({
      name: z.string().min(1, { message: "กรุณากรอกชื่อ-นามสกุล" }),
      user_name: z
        .string()
        .min(1, { message: "กรุณากรอกชื่อผู้ใช้" })
        .regex(/^[A-Za-z0-9_.-]+$/, {
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
        const data = await submitCreateUser(value);
        if (data) {
          addToast({
            title: "สำเร็จ",
            description: "เพิ่มข้อมูลสำเร็จ",
            color: "success",
            variant: "flat",
            promise: new Promise((resolve) =>
              setTimeout(() => {
                setLoading(false);
                resolve(true);
              }, 1500)
            ),
          });
        } else if (!data) {
          addToast({
            title: "ผิดพลาด",
            description: "ไม่สามารถบันทึกข้อมูลได้",
            color: "danger",
            variant: "flat",
          });
        }
        form.reset();
        closeModal();
      } catch (error) {
        addToast({
          title: "error",
          description: "error",
          color: "danger",
          variant: "flat",
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
