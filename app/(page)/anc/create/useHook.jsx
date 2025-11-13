"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import * as z from "zod";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({ closeModal }) {
  const { patWifeData, patHusbandData, submitAnc, fetchDataAnc } =
    useApiRequest();
  const [pat, setPat] = useState(null); // 👈 เก็บ object คนเดียว
  const [patHusband, setPatHusband] = useState(null);
  const [hnInputWife, setHnInputWife] = useState("");
  const [hnInputHusband, setHnInputHusband] = useState("");
  const steps = ["wife", "husband"];
  const [activeStep, setActiveStep] = useState("wife");
  const defaultVitals = { weight: "", height: "" };
  const [editVitalsign, setEditVitalsign] = useState(defaultVitals);

  const [field, setField] = useState({
    hn_wife: "",
    sex: "",
    hn_husband: null,
  });

  const handleSearchHnWife = async () => {
    if (!hnInputWife) {
      addToast({
        title: "กรุณากรอก HN ภรรยา ก่อน",
        description: "คุณยังไม่ได้กรอกค่า HN ภรรยา",
        variant: "flat",
        color: "warning",
      });
      return;
    }
    await patWifeData(hnInputWife, form, setPat); // ✅ ส่ง setter
  };

  const handleSearchHnHusband = async () => {
    if (!hnInputHusband) {
      addToast({
        title: "กรุณากรอก HN สามี ก่อน",
        description: "คุณยังไม่ได้กรอกค่า HN สามี",
        variant: "flat",
        color: "warning",
      });
      return;
    }
    await patHusbandData(hnInputHusband, form, setPatHusband); // รอ fetch เสร็จก่อน
  };

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
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    if (value.sex !== "หญิง") {
      addToast({
        title: "เพศของภรรยาไม่ถูกต้อง",
        description:
          "ไม่สามารถบันทึกข้อมูลได้ เนื่องจากเพศของภรรยาต้องเป็นหญิงเท่านั้น",
        color: "danger",
        variant: "flat",
      });
      return; // ❌ ไม่ให้ submit ต่อ
    }
    try {
      setIsSubmitting(true); // เริ่มส่งข้อมูล
      await submitAnc(value);
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
      console.error(error);
    } finally {
      setIsSubmitting(false); // ส่งเสร็จแล้ว เปิดให้กดได้อีก
    }
  };

  const defaultValues = {
    hn_wife: "",
    hn_husband: null,
    sex: "",
  };

  const validationSchema = z.object({
    hn_wife: z.coerce.number().int().min(1, { message: "กรุณากรอก HN ภรรยา" }),
    sex: z.string(),
    hn_husband: z.coerce.number().int().nullable(),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Validate ด้วย Zod ก่อน submit
      try {
        const validatedData = validationSchema.parse(value);
        await handleSubmit(validatedData);
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

  return {
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
    vitals,
    bmi,
    editVitalsign,
    handleEditChange,
    calculateAge,
    steps,
    activeStep,
    setActiveStep,
    form,
    validationSchema,
    isSubmitting,
  };
}
