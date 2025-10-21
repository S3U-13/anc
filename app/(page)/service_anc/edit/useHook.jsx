"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useRef, useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";

export default function useHook({
  openEditService,
  closeEditService,
  currentData,
  selectedEditId,
} = {}) {
  const id = selectedEditId;
  const modalRef = useRef(null);
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [coverageSite, setCoverageSite] = useState([]);
  console.log(data);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/mapAll", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoverage = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/coveragesite", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await res.json();
      setCoverageSite(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCoverage();
  }, []);

  const initialField = () => ({
    anc_no: "",
    patvisit_id: "",
    patreg_id: "",
    para: "",
    gravida: "",
    p: "",
    a: "",
    last: "",
    lmp: "",
    edc: "",
    ga: "",
    ma_id: "",
    ma_detail: "",
    hr_id: "",
    hr_detail: "",
    am_id: "",
    gct_1_wife: "",
    gct_2_wife: "",
    ogtt_1_wife: "",
    ogtt_2_wife: "",
    hbsag_wife: "",
    vdrl_wife: "",
    anti_hiv_wife: "",
    bl_gr_wife: "",
    rh_wife: "",
    hct_wife: "",
    of_wife: "",
    dcip_wife: "",
    mcv_wife: "",
    mch_wife: "",
    hb_typing_wife: "",
    pcr_wife_id: "",
    pcr_wife_text: "",
    cordo_id: "",
    cordo_text: "",
    cordo_other_text: "",
    abortion_id: "",
    td_num: "",
    td_last_date: null,
    tdap_id: "",
    tdap_round_1: null,
    tdap_round_2: null,
    tdap_round_3: null,
    iip_id: "",
    iip_date: null,
    lab_2: "",
    vdrl_2: "",
    hct: "",
    h: "",
    bti_value_1_id: null,
    bti_value_2_id: null,
    bti_value_3_id: null,
    bti_value_4_id: null,
    bti_value_5_id: null,
    bti_1_date: null,
    bti_2_date: null,
    cbe_value_1_id: null,
    cbe_value_2_id: null,
    cbe_value_3_id: null,
    cbe_value_4_id: null,
    birads_id: null,
    cbe_result: "",
    per_os_id: "",
    hbsag_husband: "",
    vdrl_husband: "",
    anti_hiv_husband: "",
    bl_gr_husband: "",
    rh_husband: "",
    hct_husband: "",
    of_husband: "",
    dcip_husband: "",
    mcv_husband: "",
    mch_husband: "",
    hb_typing_husband: "",
    pcr_hus_text: "",
    pcr_hus_id: "",
    ref_value_1_id: null,
    ref_value_2_id: null,
    receive_in_id: null,
    receive_in_detail: "",
    hos_in_id: null,
    receive_out_id: null,
    hos_out_id: null,
    receive_out_detail: "",
  });

  const [field, setField] = useState(initialField());

  const mapCheckboxValues = (prefix, vals, total, allOptions = []) => {
    const result = {};

    for (let i = 1; i <= total; i++) {
      const id = allOptions[i - 1]?.id?.toString(); // เอา id ของ checkbox ตัวที่ i
      result[`${prefix}_value_${i}_id`] = vals.includes(id) ? id : null;
    }

    return result;
  };

  // handlers

  const btiChoice = [
    { id: "18", label: "BTI 1" },
    { id: "19", label: "BTI 2" },
    { id: "20", label: "BTI 3" },
    { id: "21", label: "BTI 4" },
    { id: "22", label: "BTI 5" },
  ];

  const [selectedBti, setSelectedBti] = useState(
    [
      field.bti_value_1_id,
      field.bti_value_2_id,
      field.bti_value_3_id,
      field.bti_value_4_id,
      field.bti_value_5_id,
    ].filter(Boolean)
  );

  const cbeChoice = [
    { id: "23", label: "cbe 1" },
    { id: "24", label: "cbe 2" },
    { id: "25", label: "cbe 3" },
    { id: "26", label: "cbe 4" },
  ];

  const [selectedCbe, setSelectedCbe] = useState(
    [
      field.cbe_value_1_id,
      field.cbe_value_2_id,
      field.cbe_value_3_id,
      field.cbe_value_4_id,
    ].filter(Boolean)
  );

  const refChoice = [
    { id: "40", label: "ref 1" },
    { id: "41", label: "ref 2" },
  ];

  const [selectedRef, setSelectedRef] = useState(
    [
      field.ref_value_1_id, 
      field.ref_value_2_id
    ].filter(Boolean)
  );

  const handleChangeBti = (vals) => {
    const updatedSelected = vals.map(String);
    setSelectedBti(updatedSelected);

    const btiField = mapCheckboxValues("bti", updatedSelected, 5, btiChoice);

    Object.entries(btiField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });
  };

  const handleChangeCbe = (vals) => {
    const updatedSelected = vals.map(String);
    setSelectedCbe(updatedSelected);

    const cbeField = mapCheckboxValues("cbe", updatedSelected, 4, cbeChoice);

    Object.entries(cbeField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });
  };

  const handleChangeRefIn = (vals) => {
    const updatedSelected = vals.map(String);
    setSelectedRef(updatedSelected);

    const refField = mapCheckboxValues("ref", updatedSelected, 2, refChoice);

    Object.entries(refField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });
  };

  const [selectedAnc, setSelectedAnc] = useState(null);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} ปี`;
  };

  const formatName = (pat) => {
    if (!pat) return "";
    let fullName = "";
    if (pat.prename) fullName += pat.prename;
    if (pat.firstname) fullName += pat.firstname;
    if (pat.lastname) fullName += " " + pat.lastname;
    return fullName;
  };

  const formatAddress = (pat_address) => {
    if (!pat_address) return "";
    let address = "";
    if (pat_address.house) address += pat_address.house;
    if (pat_address.moo) address += ` หมู่.${pat_address.moo}`;
    if (pat_address.soy) address += ` ซอย ${pat_address.soy}`;
    if (pat_address.road) address += ` ถนน ${pat_address.road}`;
    if (pat_address.tambon_detail?.detailtext)
      address += ` ตำบล${pat_address.tambon_detail.detailtext}`;
    if (pat_address.amphur_detail?.detailtext)
      address += ` อำเภอ${pat_address.amphur_detail.detailtext}`;
    if (pat_address.province_detail?.detailtext)
      address += ` จังหวัด${pat_address.province_detail.detailtext}`;
    return address;
  };

  const defaultVitals = { weight: "", height: "" };

  const [editVitalsign, setEditVitalsign] = useState(defaultVitals);

  const vitals = currentData?.wife?.profile.pat_vitalsign?.[0];
  // sync editVitalsign กับ pat หลังจาก fetch เสร็จ
  useEffect(() => {
    if (currentData?.wife?.profile.pat_vitalsign?.[0]) {
      setEditVitalsign({
        weight: currentData?.wife?.profile.pat_vitalsign?.[0].weight || "",
        height: currentData?.wife?.profile.pat_vitalsign?.[0].height || "",
      });
    }
  }, [currentData]);

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
  const handleEditChange = (name, value) => {
    setEditVitalsign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [Dates, setDates] = useState({
    bti_1_date: field.bti_1_date || null,
    bti_2_date: field.bti_2_date || null,
    td_last_date: field.td_last_date || null,
    tdap_round_1: field.tdap_round_1 || null,
    tdap_round_2: field.tdap_round_2 || null,
    tdap_round_3: field.tdap_round_3 || null,
    iip_date: field.iip_date || null,
    lab_2: field.lab_2 || null,
  });

  const handleDateChange = (fieldName) => (date) => {
    const iso = date
      ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
      : null;

    // update state เพื่อให้ DatePicker แสดงผลทันที
    setDates((prev) => ({ ...prev, [fieldName]: iso }));

    // update form
    form.setFieldValue(fieldName, iso);
  };

  // แปลง CalendarDate -> "YYYY-MM-DD"

  const formatThaiDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    // แปลงเป็นปี พ.ศ.
    const buddhistYear = date.getFullYear() + 543;

    // format วันที่ เวลา ภาษาไทย
    return (
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "UTC",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date) +
      " น.".replace(`${date.getFullYear() + 543}`, buddhistYear)
    );
  };

  const steps = ["from_1", "from_2", "from_3", "from_4", "from_5"];
  const [activeStep, setActiveStep] = useState("from_1");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ✅ อัปเดต state ปกติ (UI)
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ อัปเดตเข้า useForm ด้วย
    form.setFieldValue(name, value);
  };

  const handleSubmit = async (value) => {
    console.log("submit field:", value);
    if (isSubmitting) return;
    try {
      setIsSubmitting(true); // เริ่มส่งข้อมูล
      const res = await fetch(
        `http://localhost:3000/api/user/edit-service-by-id/${id}`, // id ต้องมีค่า
        {
          method: "PUT", // ใช้ PUT ตาม backend
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(value),
        }
      );

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error("แก้ไขข้อมูลไม่สำเร็จ");

      addToast({
        title: "สำเร็จ",
        description: "เเก้ไขข้อมูลสำเร็จ",
        variant: "flat",
        color: "success",
      });
      form.reset();
      setField(initialField);
      setSelectedAnc(null);
      setActiveStep("from_1");
      setEditVitalsign(defaultVitals);
      setBmi("");
      setDates({
        bti_1_date: null,
        bti_2_date: null,
        td_last_date: null,
        tdap_round_1: null,
        tdap_round_2: null,
        tdap_round_3: null,
        iip_date: null,
        lab_2: null,
      });
      setSelectedBti([]);
      setSelectedCbe([]);
      setSelectedRef([]);
      closeEditService();
    } catch (error) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "เเก้ไขข้อมูลไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false); // ส่งเสร็จแล้ว เปิดให้กดได้อีก
    }
  };

  const defaultValues = initialField();

  const validationSchema = z.object({
    anc_no: z.coerce
      .number()
      .int()
      .min(1, { message: "กรุณากรอก หมายเลข ANC" }),
    patvisit_id: z.coerce
      .string()
      .min(1, { message: "กรุณาระบุ PAT VISIT ID" }),
    patreg_id: z.coerce.string().min(1, { message: "กรุณาระบุ PAT REG ID" }),
    para: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    gravida: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    p: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    a: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    last: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ที่คลอดบุตรคนล่าสุด" }),
    lmp: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ประจำเดือนมาครั้งล่าสุด" }),
    edc: z.coerce
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ที่คาดว่าจะคลอดบุตร" }),
    ga: z.coerce.string().min(1, { message: "กรุณากรอก อายุครรภ์" }),
    ma_id: z.coerce
      .string()
      .min(1, { message: "กรุณาเลือก ระบุประวัติการแพ้ยา" }),
    ma_detail: z.string().optional(),
    hr_id: z.coerce.string().min(1, { message: "กรุณาเลือก ระบุโรคประจำตัว" }),
    hr_detail: z.string().optional(),
    am_id: z.coerce
      .string()
      .min(1, { message: "กรุณาเลือก ระบุการเจาะน้ำคร่ำตรวจโครโมโซม" }),
    gct_1_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ GCT ครั้งที่ 1" })
      .max(30),
    gct_2_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ GCT ครั้งที่ 2" })
      .max(30),
    ogtt_1_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ OGTT ครั้งที่ 1" })
      .max(30),
    ogtt_2_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ OGTT ครั้งที่ 2" })
      .max(30),
    hbsag_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ HBsAg" })
    ),
    vdrl_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ VDRL" })
    ),
    anti_hiv_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ Anti-HIV" })
    ),
    bl_gr_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกหมู่เลือด" })
    ),
    rh_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ" })
    ),
    hct_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ HCT" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    of_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ OF" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    dcip_wife: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ DCIP" })
    ),
    mcv_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ MCV" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    mch_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ MCH" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    hb_typing_wife: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ Hb Typing" })
      .max(30),
    pcr_wife_id: z.coerce.string().min(1, { message: "กรุณาระบุ PCR" }),
    pcr_wife_text: z.string().optional(),
    cordo_id: z.coerce
      .string()
      .min(1, { message: "กรุณาระบุ การตรวจคัดกรองความเสี่ยงโรคทางพันธุกรรม" }),
    cordo_text: z.string().optional(),
    cordo_other_text: z.string().optional(),
    abortion_id: z.coerce
      .string()
      .min(1, { message: "กรุณาระบุ ประวัติการแท้ง" }),
    td_num: z.coerce
      .number()
      .min(1, { message: "กรุณากรอก จำนวนครั้งวัคซีนบาดทะยัก" }),
    td_last_date: z.string().min(1, {
      message: "กรุณาระบุ วัน/เดือน/ปี ที่ได้รับวัคซีนบาดทะยักครั้งสุดท้าย",
    }),
    tdap_id: z.coerce.string().min(1, { message: "กรุณาระบุ การให้วัคซีน" }),
    tdap_round_1: z.string().nullable(),
    tdap_round_2: z.string().nullable(),
    tdap_round_3: z.string().nullable(),
    iip_id: z.coerce
      .string()
      .min(1, { message: "กรุณาระบุ การฉีดวัคซีนไข้หวัดใหญ่" }),
    iip_date: z.string().nullable(),
    lab_2: z.string().optional(),
    vdrl_2: z.string().optional(),
    hct: z.string().optional(),
    h: z.string().optional(),
    bti_value_1_id: z.string().nullable(),
    bti_value_2_id: z.string().nullable(),
    bti_value_3_id: z.string().nullable(),
    bti_value_4_id: z.string().nullable(),
    bti_value_5_id: z.string().nullable(),
    bti_1_date: z.string().nullable(),
    bti_2_date: z.string().nullable(),
    cbe_value_1_id: z.string().nullable(),
    cbe_value_2_id: z.string().nullable(),
    cbe_value_3_id: z.string().nullable(),
    cbe_value_4_id: z.string().nullable(),
    cbe_result: z.string().optional(),
    per_os_id: z.coerce
      .string()
      .min(1, { message: "กรุณาระบุ การใช้ยาผ่านปาก" }),
    hbsag_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ HBsAg" })
    ),
    vdrl_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ VDRL" })
    ),
    anti_hiv_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ Anti-HIV" })
    ),
    bl_gr_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกหมู่เลือด" })
    ),
    rh_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ" })
    ),
    hct_husband: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ HCT สามี" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    of_husband: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ OF สามี" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    dcip_husband: z.preprocess(
      (val) => {
        // ถ้าเป็น Set (จาก Select ของ HeroUI/NextUI) ให้ดึงค่าตัวแรกออกมา
        if (val instanceof Set) {
          const first = Array.from(val)[0];
          return first || "";
        }
        return val ?? "";
      },
      z.string().min(1, { message: "กรุณาเลือกผลตรวจ DCIP" })
    ),
    mcv_husband: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ MCV สามี" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    mch_husband: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ MCH สามี" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    hb_typing_husband: z
      .string()
      .min(1, { message: "กรุณากรอก ผลตรวจ Hb Typing สามี" })
      .max(30, { message: "กรุณากรอกไม่เกิน 30 ตัวอักษร" }),
    pcr_hus_id: z.coerce.string().min(1, { message: "กรุณาระบุ PCR" }),
    pcr_hus_text: z.string().optional(),
    ref_value_1_id: z.string().nullable(),
    ref_value_2_id: z.string().nullable(),
    receive_in_id: z.string().nullable(),
    receive_in_detail: z.string().nullable(),
    hos_in_id: z.string().nullable(),
    receive_out_id: z.string().nullable(),
    receive_out_detail: z.string().nullable(),
    hos_out_id: z.string().nullable(),
    birads_id: z.string().nullable(),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      console.log("onSubmit triggered", value);
      try {
        const validatedData = validationSchema.parse(value);
        console.log("validatedData:", validatedData);
        await handleSubmit(validatedData);
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    validators: {
      onSubmit: validationSchema,
    },
  });

  useEffect(() => {
    if (openEditService && currentData) {
      // 1️⃣ รวมข้อมูลทั้งหมด
      const info = {
        ...currentData.service_info,
        ...currentData.wife?.text_values,
        ...currentData.wife?.choices,
        ...currentData.wife?.text_values?.lab_wife,
        ...currentData.wife?.choices?.bti,
        ...currentData.wife?.choices?.cbe,
        ...currentData.wife?.profile,
        ...currentData.husband?.profile,
        ...currentData.husband?.choices,
        ...currentData.husband?.choices?.lab_husband,
      };

      // 2️⃣ ฟิลด์วันที่ทั้งหมดในระบบ
      const dateFields = [
        "lmp",
        "edc",
        "td_last_date",
        "tdap_round_1",
        "tdap_round_2",
        "tdap_round_3",
        "iip_date",
        "lab_2",
        "bti_1_date",
        "bti_2_date",
      ];

      // 4️⃣ วนทุก field เพื่อเซ็ตค่า form
      Object.entries(info).forEach(([key, value]) => {
        if (value == null) return;

        if (dateFields.includes(key)) {
          form.setFieldValue(
            key,
            value.includes("T") ? value.split("T")[0] : value
          );
        } else if (typeof value === "object" && value.choice_name) {
          form.setFieldValue(key, value.choice_name);
        } else if (typeof value === "object" && value.detailtext) {
          form.setFieldValue(key, value.detailtext);
        } else if (
          [
            // Radio / select fields
            "ma_id",
            "hr_id",
            "am_id",
            "pcr_wife_id",
            "cordo_id",
            "abortion_id",
            "tdap_id",
            "iip_id",
            "bti_id",
            "bti_value_1_id",
            "bti_value_2_id",
            "bti_value_3_id",
            "bti_value_4_id",
            "bti_value_5_id",
            "cbe_id",
            "cbe_value_1_id",
            "cbe_value_2_id",
            "cbe_value_3_id",
            "cbe_value_4_id",
            "birads_id",
            "per_os_id",
            "pcr_hus_id",
            "ref_value_1_id",
            "ref_value_2_id",
            "ref_in_choice_id",
            "receive_in_id",
            "hos_in_id",
            "ref_out_choice_id",
            "receive_out_id",
            "hos_out_id",
            "hbsag_wife",
            "vdrl_wife",
            "anti_hiv_wife",
            "bl_gr_wife",
            "rh_wife",
            "dcip_wife",
            "hbsag_husband",
            "vdrl_husband",
            "anti_hiv_husband",
            "bl_gr_husband",
            "rh_husband",
            "dcip_husband",
          ].includes(key)
        ) {
          form.setFieldValue(key, String(value));
        } else {
          form.setFieldValue(key, value ?? "");
        }
      });

      // 5️⃣ เซ็ต selected state ของ BTI
      if (currentData.wife?.choices?.bti) {
        const bti = currentData.wife.choices.bti;
        setSelectedBti(
          [
            bti.bti_value_1_id,
            bti.bti_value_2_id,
            bti.bti_value_3_id,
            bti.bti_value_4_id,
            bti.bti_value_5_id,
          ]
            .filter(Boolean)
            .map(String)
        );
      }

      // 6️⃣ เซ็ต selected state ของ CBE
      if (currentData.wife?.choices?.cbe) {
        const cbe = currentData.wife.choices.cbe;
        setSelectedCbe(
          [
            cbe.cbe_value_1_id,
            cbe.cbe_value_2_id,
            cbe.cbe_value_3_id,
            cbe.cbe_value_4_id,
          ]
            .filter(Boolean)
            .map(String)
        );
      }

      // 7️⃣ เซ็ต selected state ของ Referral
      if (currentData.wife?.choices?.referral_value) {
        const ref = currentData.wife.choices.referral_value;
        setSelectedRef(
          [ref.ref_value_1_id, ref.ref_value_2_id].filter(Boolean).map(String)
        );
      }

      // 8️⃣ เซ็ต Dates สำหรับ DatePicker (HeroUI parseDate)
      setDates({
        td_last_date: info.td_last_date
          ? info.td_last_date.split("T")[0]
          : null,
        tdap_round_1: info.tdap_round_1
          ? info.tdap_round_1.split("T")[0]
          : null,
        tdap_round_2: info.tdap_round_2
          ? info.tdap_round_2.split("T")[0]
          : null,
        tdap_round_3: info.tdap_round_3
          ? info.tdap_round_3.split("T")[0]
          : null,
        iip_date: info.iip_date ? info.iip_date.split("T")[0] : null,
        lab_2: info.lab_2 ? info.lab_2.split("T")[0] : null,
        bti_1_date: info.bti_1_date ? info.bti_1_date.split("T")[0] : null,
        bti_2_date: info.bti_2_date ? info.bti_2_date.split("T")[0] : null,
        lmp: info.lmp ? info.lmp.split("T")[0] : null,
        edc: info.edc ? info.edc.split("T")[0] : null,
      });

      // 9️⃣ เซ็ตค่า ref_in_choice / ref_out_choice
      if (currentData.wife?.choices?.ref_in_choice) {
        const refIn = currentData.wife.choices.ref_in_choice;
        form.setFieldValue("receive_in_id", String(refIn.receive_in_id ?? ""));
        form.setFieldValue("hos_in_id", String(refIn.hos_in_id ?? ""));
        form.setFieldValue("receive_in_detail", refIn.receive_in_detail ?? "");
      }

      if (currentData.wife?.choices?.ref_out_choice) {
        const refOut = currentData.wife.choices.ref_out_choice;
        form.setFieldValue(
          "receive_out_id",
          String(refOut.receive_out_id ?? "")
        );
        form.setFieldValue("hos_out_id", String(refOut.hos_out_id ?? ""));
        form.setFieldValue(
          "receive_out_detail",
          refOut.receive_out_detail ?? ""
        );
      }
    }
  }, [openEditService, currentData, form]);

  const handleLmpChange = (calendarDate) => {
    if (!calendarDate) {
      form.setFieldValue("lmp", null);
      form.setFieldValue("edc", null);
      form.setFieldValue("ga", "");
      return;
    }

    const iso = `${calendarDate.year}-${String(calendarDate.month).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;
    form.setFieldValue("lmp", iso);

    // ✅ คำนวณตรงนี้เลย
    const lmpDate = new Date(iso + "T00:00:00");
    const today = new Date();
    const diffMs = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    const edcDate = new Date(lmpDate);
    edcDate.setDate(edcDate.getDate() + 280);
    const edcIso = edcDate.toISOString().split("T")[0];

    form.setFieldValue("edc", edcIso);
    form.setFieldValue("ga", `${weeks} สัปดาห์ ${days} วัน`);
  };

  const handleReset = () => {
    form.reset();
    setField(initialField);
    setSelectedAnc(null);
    setActiveStep("from_1");
    setEditVitalsign(defaultVitals);
    setBmi("");
    setDates({
      bti_1_date: null,
      bti_2_date: null,
      td_last_date: null,
      tdap_round_1: null,
      tdap_round_2: null,
      tdap_round_3: null,
      iip_date: null,
      lab_2: null,
    });
    setSelectedBti([]);
    setSelectedCbe([]);
    setSelectedRef([]);
  };

  const formatThaiDate = (date) => {
    if (!date) return "";
    const jsDate = date instanceof Date ? date : date.toDate("UTC");
    return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(jsDate);
  };

  return {
    data,
    field,
    handleChange,
    handleReset,
    handleChangeCbe,
    handleChangeBti,
    selectedAnc,
    setSelectedAnc,
    setField,
    steps,
    activeStep,
    setActiveStep,
    calculateAge,
    bmi,
    editVitalsign,
    formatAddress,
    formatName,
    formatThaiDate,
    formatThaiDateTime,
    handleEditChange,
    vitals,
    handleLmpChange,
    handleDateChange,
    coverageSite,
    handleSubmit,
    isSubmitting,
    handleChangeRefIn,
    form,
    validationSchema,
    selectedBti,
    selectedCbe,
    Dates,
    selectedRef,
    modalRef,
  };
}
