"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export default function useHook({ closeFormService } = {}) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/mapAll");
      const json = await res.json();
      setData(json);
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
    g: "",
    p: "",
    a: "",
    last: "",
    lmp: null,
    edc: null,
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
    bti_value_1_id: "",
    bti_value_2_id: "",
    bti_value_3_id: "",
    bti_value_4_id: "",
    bti_value_5_id: "",
    bti_1_date: null,
    bti_2_date: null,
    cbe_value_1_id: "",
    cbe_value_2_id: "",
    cbe_value_3_id: "",
    cbe_value_4_id: "",
    birads_id: "",
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
    anc_id: "",
    usg_id: "",
    ref_in_id: null,
    ref_out_id: null,
    receive_in_id: null,
    hos_in_id: null,
    receive_out_id: null,
    hos_out_id: null,
  });

  const [field, setField] = useState(initialField);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // ดูว่ากดแล้วได้ค่าไหม
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const mapCheckboxValues = (prefix, vals, count) => {
    const obj = {};
    for (let i = 0; i < count; i++) {
      obj[`${prefix}_value_${i + 1}_id`] = vals[i] ?? null; // เก็บเป็น string หรือ null
    }
    return obj;
  };

  // handlers
  const handleChangeBti = (vals) => {
    // vals เป็น array ของค่าที่เลือก เช่น ["18", "20"]
    const btiField = mapCheckboxValues("bti", vals, 5); // bti_value_1_id ... bti_value_5_id
    setField((prev) => ({ ...prev, ...btiField }));
  };

  const handleChangeCbe = (vals) => {
    const cbeField = mapCheckboxValues("cbe", vals, 4); // cbe_value_1_id ... cbe_value_4_id
    setField((prev) => ({ ...prev, ...cbeField }));
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
    console.log(
      `[${fieldName}] as JS Date:`,
      date ? date.toDate(getLocalTimeZone()) : null
    );

    setField((prev) => ({
      ...prev,
      [fieldName]: date ? date.toString() : null,
    }));
  };

  // แปลง CalendarDate -> "YYYY-MM-DD"
  const handleLmpChange = (calendarDate) => {
    if (!calendarDate) {
      setField((prev) => ({ ...prev, lmp: null, edc: null, ga: "" }));
      return;
    }

    const iso = `${calendarDate.year}-${String(calendarDate.month).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;
    setField((prev) => ({ ...prev, lmp: iso }));
  };

  // คำนวณ GA และ EDC ทุกครั้งที่ field.lmp เปลี่ยน (เก็บผลใน field.edc และ field.ga)
  useEffect(() => {
    if (!field.lmp) {
      setField((prev) => ({ ...prev, edc: null, ga: "" }));
      return;
    }

    // สร้าง JS Date จาก ISO (ให้เวลาเป็นเที่ยงเพื่อเลี่ยง timezone ปัญหา)
    const lmpDate = new Date(field.lmp + "T00:00:00");
    const today = new Date();

    const diffMs = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    // EDC = LMP + 280 วัน
    const edcDate = new Date(lmpDate);
    edcDate.setDate(edcDate.getDate() + 280);
    const edcIso = edcDate.toISOString().split("T")[0];

    setField((prev) => ({
      ...prev,
      edc: edcIso,
      ga: `${weeks} สัปดาห์ ${days} วัน`,
    }));
  }, [field.lmp]);

  const formatThaiDate = (date) => {
    if (!date) return "";
    const jsDate = date instanceof Date ? date : date.toDate("UTC");
    return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(jsDate);
  };

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

  const handleReset = () => {
    setField(initialField);
    setSelectedAnc(null);
    setActiveStep("from_1");
    setEditVitalsign(defaultVitals);
    setBmi("");
  };

  const [coverageSite, setCoverageSite] = useState([]);

  const fetchCoverage = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/coveragesite");
      const json = await res.json();
      setCoverageSite(json);
    } catch (error) {
      console.log(error);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    console.log("submit field:", field);
    if (isSubmitting) return;
    try {
      setIsSubmitting(true); // เริ่มส่งข้อมูล
      const res = await fetch(`http://localhost:3000/api/ancservice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(field), // ✅ ใช้ validated data
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error("ลงทะเบียน ANC ไม่สำเร็จ");

      addToast({
        title: "สำเร็จ",
        description: "เพิ่มข้อมูลสำเร็จ",
        variant: "flat",
        color: "success",
      });
      // form.reset();

      setSelectedAnc(null);
      setActiveStep("from_1");
      setEditVitalsign(defaultVitals);
      setBmi("");
      closeFormService();
    } catch (error) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "เพิ่มข้อมูลไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false); // ส่งเสร็จแล้ว เปิดให้กดได้อีก
    }
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
  };
}
