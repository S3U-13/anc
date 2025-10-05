"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import * as z from "zod";

export default function useHook({ closeModal }) {
  const [field, setField] = useState({
    hn_wife: "",
    hn_husband: "",
  });

  const [pat, setPat] = useState(null); // 👈 เก็บ object คนเดียว

  const [patHusband, setPatHusband] = useState(null);

  const patWifeData = async (value) => {
    try {
      const res = await fetch(`http://localhost:3000/api/pat/${value}`);
      const json = await res.json();
      if (!res.ok) throw new Error("ไม่พบข้อมูล");
      setPat(json);
      // อัปเดต field

      form.setFieldValue("hn_wife", json.hn || "");

      // setField((prev) => ({
      //   ...prev,
      //   hn_wife: json.hn || "",
      // }));
      addToast({
        title: "สำเร็จ",
        description: "ดึงข้อมูลสำเร็จ",
        variant: "flat",
        color: "primary",
      });
    } catch (error) {
      console.log(error);
      addToast({
        title: "ไม่พบข้อมูล",
        description: "error",
        variant: "flat",
        color: "danger",
      });
    }
  };

  const [hnInputWife, setHnInputWife] = useState("");

  const handleSearchHnWife = async () => {
    if (!hnInputWife) {
      addToast({
        title: "กรุณากรอก HN Wife ก่อน",
        description: "คุณยังไม่ได้กรอกค่า HN Wife",
        variant: "flat",
        color: "warning",
      });
      return;
    }
    await patWifeData(hnInputWife); // รอ fetch เสร็จก่อน
  };

  const patHusbandData = async (value) => {
    try {
      const res = await fetch(`http://localhost:3000/api/pat/${value}`);
      const json = await res.json();
      if (!res.ok) throw new Error("ไม่พบข้อมูล");
      setPatHusband(json);

      form.setFieldValue("hn_husband", json.hn || "");
      // อัปเดต field
      // setField((prev) => ({
      //   ...prev,
      //   hn_husband: json.hn || "",
      // }));
      addToast({
        title: "สำเร็จ",
        description: "ดึงข้อมูลสำเร็จ",
        variant: "flat",
        color: "primary",
      });
    } catch (error) {
      addToast({
        title: "ไม่พบข้อมูล",
        description: "error",
        variant: "flat",
        color: "danger",
      });
    }
  };

  const [hnInputHusband, setHnInputHusband] = useState("");

  const handleSearchHnHusband = async () => {
    if (!hnInputHusband) {
      addToast({
        title: "กรุณากรอก HN Wife ก่อน",
        description: "คุณยังไม่ได้กรอกค่า HN Wife",
        variant: "flat",
        color: "warning",
      });
      return;
    }
    await patHusbandData(hnInputHusband); // รอ fetch เสร็จก่อน
  };

  useEffect(() => {
    // สมมติอยากโหลดคนแรกตอน mount
    // patData(); // value เป็น hn หรือ citizen
  }, []);

  const formatName = (pat) => {
    if (!pat) return "";

    let fullName = "";

    if (pat.prename) fullName += pat.prename; // ต่อชิดกับชื่อจริง
    if (pat.firstname) fullName += pat.firstname; // ต่อชื่อจริงต่อท้าย
    if (pat.lastname) fullName += " " + pat.lastname; // คั่นด้วยเว้นวรรคก่อนนามสกุล

    return fullName;
  };

  const formatNameHusband = (patHusband) => {
    if (!patHusband) return "";

    let fullName = "";

    if (patHusband.prename) fullName += patHusband.prename; // ต่อชิดกับชื่อจริง
    if (patHusband.firstname) fullName += patHusband.firstname; // ต่อชื่อจริงต่อท้าย
    if (patHusband.lastname) fullName += " " + patHusband.lastname; // คั่นด้วยเว้นวรรคก่อนนามสกุล

    return fullName;
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // ถ้ายังไม่ถึงวันเกิดของปีนี้ ให้ลบ 1
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return `${age} ปี`;
  };

  const formatAddress = (pat_address) => {
    if (!pat_address) return "";

    let address = "";

    if (pat_address.house) address += pat_address.house;
    if (pat_address.moo) address += `หมู่.${pat_address.moo}`;
    if (pat_address.soy) address += ` ซอย ${pat_address.soy}`;
    if (pat_address.road) address += ` ถนน ${pat_address.road}`;
    if (pat_address.tambon_detail?.detailtext)
      address += ` ตำบล${pat_address.tambon_detail.detailtext}`;
    if (pat_address.amphur_detail?.detailtext)
      address += ` อำเภอ${pat_address.amphur_detail.detailtext}`;
    if (pat_address.province_detail?.detailtext)
      address += ` จังหวัด${pat_address.province_detail.detailtext}`;

    return address; // รวมเป็น string เดียว
  };

  const defaultVitals = { weight: "", height: "" };

  const [editVitalsign, setEditVitalsign] = useState(defaultVitals);

  const vitals = pat?.pat_vitalsign?.[0];
  // sync editVitalsign กับ pat หลังจาก fetch เสร็จ
  useEffect(() => {
    if (pat?.pat_vitalsign?.[0]) {
      setEditVitalsign({
        weight: pat.pat_vitalsign[0].weight || "",
        height: pat.pat_vitalsign[0].height || "",
      });
    }
  }, [pat?.pat_vitalsign]);

  // คำนวณ BMI จาก editVitalsign
  const [bmi, setBmi] = useState("");

  useEffect(() => {
    const weight = parseFloat(editVitalsign.weight);
    const heightM = parseFloat(editVitalsign.height) / 100;
    if (weight && heightM) {
      setBmi((weight / (heightM * heightM)).toFixed(2));
    } else {
      setBmi("");
    }
  }, [editVitalsign.weight, editVitalsign.height]);

  // handle change เฉพาะ state editVitalsign
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVitalsign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // ดูว่ากดแล้วได้ค่าไหม
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const steps = ["wife", "husband"];
  const [activeStep, setActiveStep] = useState("wife");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true); // เริ่มส่งข้อมูล
      const res = await fetch(`http://localhost:3000/api/anc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value), // ✅ ใช้ validated data
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error("ลงทะเบียน ANC ไม่สำเร็จ");

      addToast({
        title: "สำเร็จ",
        description: "ลงทะเบียน ANC สำเร็จ",
        variant: "flat",
        color: "success",
      });

      form.reset();

      setPat(null);
      setPatHusband(null);
      setBmi("");
      setEditVitalsign(defaultVitals);
      setHnInputWife("");
      setHnInputHusband("");
      setActiveStep("wife");

      closeModal();
    } catch (error) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "ลงทะเบียน ANC ไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false); // ส่งเสร็จแล้ว เปิดให้กดได้อีก
    }
  };

  const defaultValues = {
    hn_wife: "",
    hn_husband: "",
  };

  const validationSchema = z.object({
    hn_wife: z.coerce.number().int().min(1, { message: "กรุณากรอก HN ภรรยา" }),
    hn_husband: z.coerce
      .number()
      .int()
      .min(1, { message: "กรุณากรอก HN สามี" }),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Validate ด้วย Zod ก่อน submit
      try {
        const validatedData = validationSchema.parse(value);
        await handleSubmit(validatedData);
        console.log("Submit:", validatedData);
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    validators: {
      onSubmit: validationSchema,
    },
  });

  const makeValidator =
    (schema) =>
    ({ value }) => {
      try {
        schema.parse(value);
        return undefined; // ✅ ถ้า valid
      } catch (e) {
        return e.errors?.[0]?.message || "ไม่ถูกต้อง";
      }
    };

  //   const isCurrentStepValid = () => {
  //   if (activeStep === "wife") {
  //     const field = form.state.fields?.hn_wife;
  //     return field && field.value.trim() !== "" && field.meta.errors.length === 0;
  //   }
  //   if (activeStep === "husband") {
  //     const field = form.state.fields?.hn_husband;
  //     return field && field.value.trim() !== "" && field.meta.errors.length === 0;
  //   }
  //   return true;
  // };

  return {
    field,
    handleSearchHnWife,
    hnInputWife,
    setHnInputWife,
    handleSearchHnHusband,
    hnInputHusband,
    setHnInputHusband,
    pat,
    patHusband,
    formatAddress,
    formatName,
    formatNameHusband,
    calculateAge,
    editVitalsign,
    handleEditChange,
    vitals,
    bmi,
    setField,
    handleChange,
    handleSubmit,
    steps,
    activeStep,
    setActiveStep,
    form,
    validationSchema,
    makeValidator,
    isSubmitting,
    // isCurrentStepValid,
  };
}
