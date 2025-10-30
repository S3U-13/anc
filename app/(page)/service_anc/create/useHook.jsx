"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({ closeFormService } = {}) {
  const modalRef = useRef(null);
  const auth = useAuth();
  const { fetchChoice, fetchCoverage, submitCreateAncService } =
    useApiRequest();
  const didFetch = useRef(false);
  const [data, setData] = useState([]);
  const [coverageSite, setCoverageSite] = useState([]);

  useEffect(() => {
    if (!auth.token || didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchChoice()
      .then((data) => setData(data))
      .catch(console.error);
    fetchCoverage()
      .then((data) => setCoverageSite(data))
      .catch(console.error);
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
    hbsag_husband: null,
    vdrl_husband: null,
    anti_hiv_husband: null,
    bl_gr_husband: null,
    rh_husband: null,
    hct_husband: null,
    of_husband: null,
    dcip_husband: null,
    mcv_husband: null,
    mch_husband: null,
    hb_typing_husband: null,
    pcr_hus_text: "",
    pcr_hus_id: null,
    ref_value_1_id: "",
    ref_value_2_id: "",
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
    [field.ref_value_1_id, field.ref_value_2_id].filter(Boolean)
  );

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

  const handleChangeBti = (vals) => {
    const updatedSelected = vals.map(String);
    setSelectedBti(updatedSelected);

    const btiField = mapCheckboxValues("bti", updatedSelected, 5, btiChoice);

    Object.entries(btiField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });

    // ล้างวันที่ถ้าไม่ได้เลือก
    if (!updatedSelected.includes("18")) {
      form.setFieldValue("bti_1_date", null);
      setDates((prev) => ({ ...prev, bti_1_date: null }));
    }
    if (!updatedSelected.includes("19")) {
      form.setFieldValue("bti_2_date", null);
      setDates((prev) => ({ ...prev, bti_2_date: null }));
    }
  };

  const handleChangeCbe = (vals) => {
    const updatedSelected = vals.map(String);
    setSelectedCbe(updatedSelected);

    // Map checkbox value
    const cbeField = mapCheckboxValues("cbe", updatedSelected, 4, cbeChoice);

    Object.entries(cbeField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });

    // เช็คถ้า checkbox 24 หรือ 26 ไม่อยู่ใน selected ให้ล้างค่า
    if (!updatedSelected.includes("24")) {
      form.setFieldValue("birads_id", null);
    }
    if (!updatedSelected.includes("26")) {
      form.setFieldValue("cbe_result", "");
    }
  };

  const handleChangeRefIn = (vals) => {
    // vals มาจาก CheckboxGroup (array) — แปลงเป็น string array ให้แน่นอน
    const updatedSelected = vals.map(String);

    // หา checkbox ที่ถูกยกเลิก: ค่าเก่าที่ไม่มีใน updatedSelected
    const removed = selectedRef.filter((v) => !updatedSelected.includes(v));

    // อัปเดต state หลัก แค่ครั้งเดียว
    setSelectedRef(updatedSelected);

    // คำนวณค่า field ที่ต้องเซ็ตจาก selected ใหม่ (เหมือนเดิม)
    const refField = mapCheckboxValues("ref", updatedSelected, 2, refChoice);

    Object.entries(refField).forEach(([key, value]) => {
      // value ที่ได้ ถ้าเป็น undefined ให้เป็น null (หรือ "" แล้วแต่ convention ของคุณ)
      form.setFieldValue(key, value ?? null);
    });

    // ถ้ามีการ uncheck "ส่งใน" (id 40) ให้ล้างฟิลด์ที่เกี่ยวข้อง
    if (removed.includes("40")) {
      form.setFieldValue("receive_in_id", null);
      form.setFieldValue("hos_in_id", null);
      form.setFieldValue("receive_in_detail", "");
    }

    // ถ้ามีการ uncheck "ส่งนอก" (id 41) ให้ล้างฟิลด์ที่เกี่ยวข้อง
    if (removed.includes("41")) {
      form.setFieldValue("receive_out_id", null);
      form.setFieldValue("hos_out_id", null);
      form.setFieldValue("receive_out_detail", "");
    }
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

  const vitals = selectedAnc?.wife?.pat_vitalsign?.[0];
  // sync editVitalsign กับ pat หลังจาก fetch เสร็จ
  useEffect(() => {
    if (selectedAnc?.wife?.pat_vitalsign?.[0]) {
      setEditVitalsign({
        weight: selectedAnc.wife.pat_vitalsign[0].weight || "",
        height: selectedAnc.wife.pat_vitalsign[0].height || "",
      });
    }
  }, [selectedAnc]);

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
      await submitCreateAncService(value);
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
      closeFormService();
    } catch (error) {
      console.log(error);
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
    td_num: z
      .string()
      .nonempty({ message: "กรุณากรอกตัวเลข" })
      .regex(/^\d+$/, { message: "กรุณากรอกตัวเลขเท่านั้น" }) // ตรวจเฉพาะตัวเลข
      .transform(Number)
      .refine((val) => val >= 1, {
        message: "กรุณากรอก จำนวนครั้งวัคซีนบาดทะยัก",
      }),
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
    hbsag_husband: z.coerce.number().nullable(),
    vdrl_husband: z.coerce.number().nullable(),
    anti_hiv_husband: z.coerce.number().nullable(),
    bl_gr_husband: z.coerce.number().nullable(),
    rh_husband: z.coerce.number().nullable(),
    hct_husband: z.string().nullable(),
    of_husband: z.string().nullable(),
    dcip_husband: z.coerce.number().nullable(),
    mcv_husband: z.string().nullable(),
    mch_husband: z.string().nullable(),
    hb_typing_husband: z.string().nullable(),
    pcr_hus_id: z.coerce.string().nullable(),
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
