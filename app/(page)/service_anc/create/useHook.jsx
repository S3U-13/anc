"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ closeFormService } = {}) {
  const modalRef = useRef(null);
  const auth = useAuth();
  const {
    fetchChoice,
    fetchCoverage,
    selectedRoundById,
    selectedGravidaByAncNo,
    selectedDataByAncNoAndGravida,
    submitCreateAncService,
  } = useApiRequest();
  const didFetch = useRef(false);
  const [selectedAncNo, setSelectedAncNo] = useState(null);
  const [gravidaOptions, setGravidaOptions] = useState([]);
  const [selectedGravida, setSelectedGravida] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [roundOptions, setRoundOptions] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataAnc, setDataAnc] = useState([]);
  const [coverageSite, setCoverageSite] = useState([]);

  // const anc_no = selectedAncNo;
  // const gravida = selectedGravida;

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

  useEffect(() => {
    if (!auth.token || didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    selectedDataByAncNoAndGravida()
      .then((data) => setDataAnc(data || []))
      .catch(console.error);
  });

  const initialField = () => ({
    anc_no: "",
    patvisit_id: "",
    patreg_id: "",
    pat_vitalsign_id: "",
    para: "",
    prep_weight: "",
    bmi: "",
    forget_or_remember: null,
    gravida: "",
    p: "",
    a: "",
    last: "",
    lmp: null,
    edc: null,
    ga: "",
    verified_by: null,
    ma_id: null,
    ma_detail: "",
    hr_id: null,
    hr_detail: "",
    am_id: null,
    am_detail_1: "",
    am_detail_2: "",
    am_detail_3: "",
    vaccine: null,
    vaccine_detail_1: "",
    vaccine_detail_2: "",
    vaccine_detail_3: "",
    vaccine_date_1: null,
    vaccine_date_2: null,
    vaccine_date_3: null,
    gct_1_wife: "",
    gct_2_wife: "",
    ogtt_1_wife: "",
    ogtt_2_wife: "",
    hbsag_wife: null,
    vdrl_wife: null,
    ppr_wife: "",
    tpha_wife: "",
    treatment_detail_wife: "",
    vac_lab_date_1_wife: null,
    vac_lab_date_2_wife: null,
    vac_lab_date_3_wife: null,
    anti_hiv_wife: null,
    bl_gr_wife: null,
    rh_wife: null,
    hct_wife: "",
    of_wife: null,
    dcip_wife: null,
    mcv_wife: "",
    mch_wife: "",
    hb_typing_wife: "",
    pcr_wife_id: null,
    pcr_wife_text: "",
    cordo_id: null,
    cordo_text: "",
    cordo_other_text: "",
    abortion_id: null,
    td_num: "",
    td_last_date: null,
    td_forget_date: "",
    tdap_id: null,
    tdap_round_1: null,
    tdap_round_2: null,
    tdap_round_3: null,
    iip_id: null,
    iip_date: null,
    lab_2: null,
    vdrl_2: null,
    ppr_wife_2: "",
    tpha_wife_2: "",
    treatment_detail_wife_2: "",
    vac_lab_date_1_wife_2: null,
    vac_lab_date_2_wife_2: null,
    vac_lab_date_3_wife_2: null,
    hct: null,
    hiv: null,
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
    birads_detail_1: "",
    birads_detail_2: "",
    birads_detail_3: "",
    cbe_result: "",
    per_os_id: null,
    per_os_detail_1: "",
    per_os_detail_2: "",
    per_os_detail_3: "",
    per_os_detail_4: "",
    per_os_detail_5: "",
    hbsag_husband: null,
    vdrl_husband: null,
    ppr_husband: "",
    tpha_husband: "",
    treatment_detail_husband: "",
    vac_lab_date_1_husband: null,
    vac_lab_date_2_husband: null,
    vac_lab_date_3_husband: null,
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
    ref_value_3_id: "",
    receive_in_id: null,
    hos_in_id: null,
    receive_in_detail: "",
    ref_in_detail: "",
    receive_out_id: null,
    hos_out_id: null,
    receive_out_detail: "",
    ref_out_detail: "",
    ref_other_detail: "",
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
    { id: "67", label: "ref 3" },
  ];

  const [selectedRef, setSelectedRef] = useState(
    [field.ref_value_1_id, field.ref_value_2_id, field.ref_value_3_id].filter(
      Boolean
    )
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
    vac_lab_date_1_wife: field.vac_lab_date_1_wife || null,
    vac_lab_date_2_wife: field.vac_lab_date_2_wife || null,
    vac_lab_date_3_wife: field.vac_lab_date_3_wife || null,
    vaccine_date_1: field.vaccine_date_1 || null,
    vaccine_date_2: field.vaccine_date_2 || null,
    vaccine_date_3: field.vaccine_date_3 || null,
    vac_lab_date_1_wife_2: field.vac_lab_date_1_wife_2 || null,
    vac_lab_date_2_wife_2: field.vac_lab_date_2_wife_2 || null,
    vac_lab_date_3_wife_2: field.vac_lab_date_3_wife_2 || null,
    vac_lab_date_1_husband: field.vac_lab_date_1_husband || null,
    vac_lab_date_2_husband: field.vac_lab_date_2_husband || null,
    vac_lab_date_3_husband: field.vac_lab_date_3_husband || null,
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
    const refField = mapCheckboxValues("ref", updatedSelected, 3, refChoice);

    Object.entries(refField).forEach(([key, value]) => {
      // value ที่ได้ ถ้าเป็น undefined ให้เป็น null (หรือ "" แล้วแต่ convention ของคุณ)
      form.setFieldValue(key, value ?? null);
    });

    // ถ้ามีการ uncheck "ส่งใน" (id 40) ให้ล้างฟิลด์ที่เกี่ยวข้อง
    if (removed.includes("40")) {
      form.setFieldValue("receive_in_id", null);
      form.setFieldValue("hos_in_id", null);
      form.setFieldValue("receive_in_detail", "");
      form.setFieldValue("ref_in_detail", "");
    }

    // ถ้ามีการ uncheck "ส่งนอก" (id 41) ให้ล้างฟิลด์ที่เกี่ยวข้อง
    if (removed.includes("41")) {
      form.setFieldValue("receive_out_id", null);
      form.setFieldValue("hos_out_id", null);
      form.setFieldValue("receive_out_detail", "");
      form.setFieldValue("ref_out_detail", "");
    }
    if (removed.includes("67")) {
      form.setFieldValue("ref_other_detail", "");
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
    console.log(fieldName, iso);
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
  // new handle
  const handleMaChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "1") {
      form.setFieldValue("ma_detail", "");
    }
  };
  const handleHrChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "4") {
      form.setFieldValue("hr_detail", "");
    }
  };
  const handlePcrWifeChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "9") {
      form.setFieldValue("pcr_wife_text", "");
    }
  };
  const handleCordoChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "11") {
      form.setFieldValue("cordo_text", "");
    }
  };
  const handleAmChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "4") {
      form.setFieldValue("am_detail_1", "");
    }

    if (newValue !== "5") {
      form.setFieldValue("am_detail_2", "");
    }

    if (newValue !== "6") {
      form.setFieldValue("am_detail_3", "");
    }
  };
  const handleVaccineChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "58") {
      form.setFieldValue("vaccine_detail_1", "");
      form.setFieldValue("vaccine_date_1", null);
      setDates((prev) => ({ ...prev, vaccine_date_1: null }));
    }

    if (newValue !== "59") {
      form.setFieldValue("vaccine_detail_2", "");
      form.setFieldValue("vaccine_date_2", null);
      setDates((prev) => ({ ...prev, vaccine_date_2: null }));
    }

    if (newValue !== "60") {
      form.setFieldValue("vaccine_detail_3", "");
      form.setFieldValue("vaccine_date_3", null);
      setDates((prev) => ({ ...prev, vaccine_date_3: null }));
    }
  };
  const handleTdapChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "14") {
      form.setFieldValue("tdap_round_1", null);
      form.setFieldValue("tdap_round_2", null);
      form.setFieldValue("tdap_round_3", null);
      setDates((prev) => ({
        ...prev,
        tdap_round_1: null,
        tdap_round_2: null,
        tdap_round_3: null,
      }));
    }
  };
  const handleIipChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "16") {
      form.setFieldValue("iip_date", null);

      setDates((prev) => ({
        ...prev,
        iip_date: null,
      }));
    }
  };
  const handleBiradsChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "27") {
      form.setFieldValue("birads_detail_1", "");
    }
    if (newValue !== "28") {
      form.setFieldValue("birads_detail_2", "");
    }
    if (newValue !== "29") {
      form.setFieldValue("birads_detail_3", "");
    }
  };
  const handlePerOsChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "30") {
      form.setFieldValue("per_os_detail_1", "");
    }
    if (newValue !== "31") {
      form.setFieldValue("per_os_detail_2", "");
    }
    if (newValue !== "35") {
      form.setFieldValue("per_os_detail_3", "");
    }
    if (newValue !== "63") {
      form.setFieldValue("per_os_detail_4", "");
    }
    if (newValue !== "64") {
      form.setFieldValue("per_os_detail_5", "");
    }
  };
  const handlePcrHusbandChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "9") {
      form.setFieldValue("pcr_hus_text", "");
    }
  };
  // end new handle
  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    try {
      await submitCreateAncService(value);
      form.reset();
      setGravidaOptions([]);
      setSelectedGravida("");
      setRoundOptions([]);
      setSelectedRound("");
      setCurrentData(null);
      setField(initialField);
      setSelectedAnc(null);
      setActiveStep("from_1");
      setEditVitalsign(defaultVitals);
      setBmi("");
      setDates({
        vac_lab_date_1_wife: field.vac_lab_date_1_wife || null,
        vac_lab_date_2_wife: field.vac_lab_date_2_wife || null,
        vac_lab_date_3_wife: field.vac_lab_date_3_wife || null,
        bti_1_date: field.bti_1_date || null,
        bti_2_date: field.bti_2_date || null,
        td_last_date: field.td_last_date || null,
        vaccine_date_1: field.vaccine_date_1 || null,
        vaccine_date_2: field.vaccine_date_2 || null,
        vaccine_date_3: field.vaccine_date_3 || null,
        tdap_round_1: field.tdap_round_1 || null,
        tdap_round_2: field.tdap_round_2 || null,
        tdap_round_3: field.tdap_round_3 || null,
        iip_date: field.iip_date || null,
        lab_2: field.lab_2 || null,
        vac_lab_date_1_wife_2: field.vac_lab_date_1_wife_2 || null,
        vac_lab_date_2_wife_2: field.vac_lab_date_2_wife_2 || null,
        vac_lab_date_3_wife_2: field.vac_lab_date_3_wife_2 || null,
        vac_lab_date_1_husband: field.vac_lab_date_1_husband || null,
        vac_lab_date_2_husband: field.vac_lab_date_2_husband || null,
        vac_lab_date_3_husband: field.vac_lab_date_3_husband || null,
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
    anc_no: z.coerce.string().min(1, { message: "กรุณากรอก หมายเลข ANC" }),

    patvisit_id: z.coerce.number({
      required_error: "กรุณาระบุ PAT VISIT ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    patreg_id: z.coerce.number({
      required_error: "กรุณาระบุ PAT REG ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    pat_vitalsign_id: z.coerce.number({
      required_error: "กรุณาระบุ PAT VITALSIGN ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    gravida: z.string().min(1, { message: "กรุณากรอก" }),
    p: z.string().min(1, { message: "กรุณากรอก" }),
    a: z.string().min(1, { message: "กรุณากรอก" }),
    para: z.string().min(1, { message: "กรุณากรอก" }),
    prep_weight: z.string().optional(),
    bmi: z.string().optional(),

    last: z.string().nullable(),
    lmp: z.string().nullable(),
    edc: z.string().nullable(),
    ga: z.string().nullable(),

    verified_by: z.string().nullable(),
    ma_id: z.string().nullable(),
    ma_detail: z.string().optional(),
    hr_id: z.string().nullable(),
    hr_detail: z.string().nullable(),
    am_id: z.string().nullable(),

    // wife lab info
    gct_1_wife: z.string().optional(),
    gct_2_wife: z.string().optional(),
    ogtt_1_wife: z.string().optional(),
    ogtt_2_wife: z.string().optional(),
    hbsag_wife: z.coerce.number().nullable(),
    vdrl_wife: z.coerce.number().nullable(),
    ppr_wife: z.string().optional(),
    tpha_wife: z.string().optional(),
    treatment_detail_wife: z.string().optional(),
    vac_lab_date_1_wife: z.string().nullable(),
    vac_lab_date_2_wife: z.string().nullable(),
    vac_lab_date_3_wife: z.string().nullable(),
    anti_hiv_wife: z.coerce.number().nullable(),
    bl_gr_wife: z.coerce.number().nullable(),
    rh_wife: z.coerce.number().nullable(),
    hct_wife: z.string().optional(),
    of_wife: z.coerce.number().nullable(),
    dcip_wife: z.coerce.number().nullable(),
    mcv_wife: z.string().optional(),
    mch_wife: z.string().optional(),
    hb_typing_wife: z.string().nullable(),

    // husband lab info
    hbsag_husband: z.coerce.number().nullable(),
    vdrl_husband: z.coerce.number().nullable(),
    ppr_husband: z.string().optional(),
    tpha_husband: z.string().optional(),
    treatment_detail_husband: z.string().optional(),
    vac_lab_date_1_husband: z.string().nullable(),
    vac_lab_date_2_husband: z.string().nullable(),
    vac_lab_date_3_husband: z.string().nullable(),
    anti_hiv_husband: z.coerce.number().nullable(),
    bl_gr_husband: z.coerce.number().nullable(),
    rh_husband: z.coerce.number().nullable(),
    hct_husband: z.string().nullable(),
    of_husband: z.coerce.number().nullable(),
    dcip_husband: z.coerce.number().nullable(),
    mcv_husband: z.string().nullable(),
    mch_husband: z.string().nullable(),
    hb_typing_husband: z.string().nullable(),

    //
    forget_or_remember: z.coerce.number().nullable(),
    //

    // misc
    pcr_hus_id: z.string().nullable(),
    pcr_hus_text: z.string().optional(),
    pcr_wife_id: z.string().nullable(),
    pcr_wife_text: z.string().optional(),
    cordo_id: z.string().nullable(),
    cordo_text: z.string().optional(),
    cordo_other_text: z.string().optional(),
    am_detail_1: z.string().optional(),
    am_detail_2: z.string().optional(),
    am_detail_3: z.string().optional(),
    abortion_id: z.string().nullable(),
    td_num: z.string().optional(),
    td_last_date: z.string().nullable(),
    td_forget_date: z.string().optional(),
    vaccine: z.coerce.number().nullable(),
    vaccine_detail_1: z.string().optional(),
    vaccine_detail_2: z.string().optional(),
    vaccine_detail_3: z.string().optional(),
    vaccine_date_1: z.string().nullable(),
    vaccine_date_2: z.string().nullable(),
    vaccine_date_3: z.string().nullable(),
    tdap_id: z.string().nullable(),
    tdap_round_1: z.string().nullable(),
    tdap_round_2: z.string().nullable(),
    tdap_round_3: z.string().nullable(),
    iip_id: z.string().nullable(),
    iip_date: z.string().nullable(),
    lab_2: z.string().nullable(),
    vdrl_2: z.string().nullable(),
    ppr_wife_2: z.string().optional(),
    tpha_wife_2: z.string().optional(),
    treatment_detail_wife_2: z.string().optional(),
    vac_lab_date_1_wife_2: z.string().nullable(),
    vac_lab_date_2_wife_2: z.string().nullable(),
    vac_lab_date_3_wife_2: z.string().nullable(),
    hct: z.string().nullable(),
    hiv: z.string().nullable(),
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
    birads_detail_1: z.string().optional(),
    birads_detail_2: z.string().optional(),
    birads_detail_3: z.string().optional(),
    per_os_detail_1: z.string().optional(),
    per_os_detail_2: z.string().optional(),
    per_os_detail_3: z.string().optional(),
    per_os_detail_4: z.string().optional(),
    per_os_detail_5: z.string().optional(),
    per_os_id: z.string().nullable(),
    ref_value_1_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    ref_value_2_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    ref_value_3_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    receive_in_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    hos_in_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    receive_in_detail: z.string().nullable(),
    ref_in_detail: z.string().nullable(),
    receive_out_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    hos_out_id: z
      .union([z.number(), z.string().transform((val) => Number(val))])
      .nullable(),
    receive_out_detail: z.string().nullable(),
    ref_out_detail: z.string().nullable(),
    ref_other_detail: z.string().optional(),
    birads_id: z.string().nullable(),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = validationSchema.parse(value);
        await handleSubmit(validatedData);
      } catch (error) {
        console.error("❌ Validation or Submit error:", error);

        // ถ้าเป็น validation error ของ Zod
        if (error.errors) {
          console.table(error.errors); // ดูว่า field ไหนไม่ผ่าน
        }
      }
    },
    validators: {
      onSubmit: validationSchema,
    },
  });

  const handleAncNoSelect = async (anc) => {
    setSelectedAnc(anc);

    // ดึง Gravida
    const gravidas = await selectedGravidaByAncNo(anc.anc_no);
    setGravidaOptions(gravidas);

    // เคลียร์รอบเก่า
    setRoundOptions([]);

    setSelectedGravida(null);
  };

  const handleGravidaSelect = async (gravida) => {
    setSelectedGravida(gravida);

    if (!selectedAnc?.anc_no) return;

    try {
      const rounds = await selectedDataByAncNoAndGravida(
        selectedAnc.anc_no,
        gravida
      );

      // ✅ แปลงข้อมูลให้เหลือ array ของ { id, round }
      const formattedRounds = rounds.flatMap((r) =>
        r.rounds.map((rd) => ({
          id: rd.id,
          round: rd.label, // ใช้ label เป็นชื่อรอบ เช่น "รอบที่ 1"
        }))
      );
      setRoundOptions(formattedRounds);
    } catch (err) {
      console.error("❌ Error fetching rounds:", err);
    }
  };

  const handleRoundSelect = async (roundId) => {
    setIsEditLoading(true);
    setCurrentData(null);

    form.reset();

    try {
      if (roundId) {
        const data = await selectedRoundById(roundId); // ✅ ไม่ต้องส่ง token
        setCurrentData(data);
        addToast({
          title: "สำเร็จ",
          description: "ตัวช่วยกรอกดึงข้อมูลสำเร็จ",
          color: "success",
          variant: "flat",
        });
      }
    } catch (err) {
      console.error("Error fetching round data:", err);
    } finally {
      setIsEditLoading(false);
    }
  };

  useEffect(() => {
    if (currentData) {
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
            "verified_by",
            "ma_id",
            "hr_id",
            "am_id",
            "pcr_wife_id",
            "cordo_id",
            "abortion_id",
            "forget_or_remember",
            "vaccine",
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
            "of_wife",
            "vdrl_2",
            "hiv",
            "hbsag_husband",
            "vdrl_husband",
            "anti_hiv_husband",
            "bl_gr_husband",
            "rh_husband",
            "dcip_husband",
            "of_husband",
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
      if (currentData?.wife?.choices?.referral_value) {
        const ref = currentData.wife.choices.referral_value;
        const initialSelected = [
          ref.ref_value_1_id,
          ref.ref_value_2_id,
          ref.ref_value_3_id,
        ]
          .filter(Boolean)
          .map(String);

        setSelectedRef(initialSelected);

        const refField = mapCheckboxValues(
          "ref",
          initialSelected,
          3,
          refChoice
        );
        Object.entries(refField).forEach(([key, value]) => {
          form.setFieldValue(key, value ?? null);
        });
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

        // wife lab
        vac_lab_date_1_wife: info.vac_lab_date_1_wife
          ? info.vac_lab_date_1_wife.split("T")[0]
          : null,
        vac_lab_date_2_wife: info.vac_lab_date_2_wife
          ? info.vac_lab_date_2_wife.split("T")[0]
          : null,
        vac_lab_date_3_wife: info.vac_lab_date_3_wife
          ? info.vac_lab_date_3_wife.split("T")[0]
          : null,

        // wife lab 2
        vac_lab_date_1_wife_2: info.vac_lab_date_1_wife_2
          ? info.vac_lab_date_1_wife_2.split("T")[0]
          : null,
        vac_lab_date_2_wife_2: info.vac_lab_date_2_wife_2
          ? info.vac_lab_date_2_wife_2.split("T")[0]
          : null,
        vac_lab_date_3_wife_2: info.vac_lab_date_3_wife_2
          ? info.vac_lab_date_3_wife_2.split("T")[0]
          : null,

        // husband
        vac_lab_date_1_husband: info.vac_lab_date_1_husband
          ? info.vac_lab_date_1_husband.split("T")[0]
          : null,
        vac_lab_date_2_husband: info.vac_lab_date_2_husband
          ? info.vac_lab_date_2_husband.split("T")[0]
          : null,
        vac_lab_date_3_husband: info.vac_lab_date_3_husband
          ? info.vac_lab_date_3_husband.split("T")[0]
          : null,

        // vaccine
        vaccine_date_1: info.vaccine_date_1
          ? info.vaccine_date_1.split("T")[0]
          : null,
        vaccine_date_2: info.vaccine_date_2
          ? info.vaccine_date_2.split("T")[0]
          : null,
        vaccine_date_3: info.vaccine_date_3
          ? info.vaccine_date_3.split("T")[0]
          : null,
      });

      // 9️⃣ เซ็ตค่า ref_in_choice / ref_out_choice
      if (currentData.wife?.choices?.refOther) {
        const ref_other = currentData.wife.choices.refOther;
        form.setFieldValue(
          "ref_other_detail",
          String(ref_other.ref_other_detail ?? "")
        );
      }
      if (currentData.wife?.choices?.ref_in_choice) {
        const refIn = currentData.wife.choices.ref_in_choice;
        form.setFieldValue(
          "receive_in_id",
          String(refIn.receive_in_id ?? null)
        );
        form.setFieldValue("hos_in_id", String(refIn.hos_in_id ?? null));
        form.setFieldValue("receive_in_detail", refIn.receive_in_detail ?? "");
        form.setFieldValue("ref_in_detail", refIn.ref_in_detail ?? "");
      }

      if (currentData.wife?.choices?.ref_out_choice) {
        const refOut = currentData.wife.choices.ref_out_choice;
        form.setFieldValue(
          "receive_out_id",
          String(refOut.receive_out_id ?? null)
        );
        form.setFieldValue("hos_out_id", String(refOut.hos_out_id ?? null));
        form.setFieldValue(
          "receive_out_detail",
          refOut.receive_out_detail ?? ""
        );
        form.setFieldValue("ref_out_detail", refOut.ref_out_detail ?? "");
      }
    }
  }, [currentData, form]);

  const [lmpManual, setLmpManual] = useState(false);
  const [edcManual, setEdcManual] = useState(false);
  const [gaManual, setGaManual] = useState(false);

  const handleLmpChange = (calendarDate) => {
    // ถ้า user ลบค่า
    if (!calendarDate) {
      form.setFieldValue("lmp", null);
      if (!gaManual) form.setFieldValue("ga", "");
      if (!edcManual) form.setFieldValue("edc", null);
      return;
    }

    setLmpManual(true); // ผู้ใช้แก้ LMP เอง
    setEdcManual(false); // อนุญาตระบบคำนวณ EDC
    setGaManual(false); // อนุญาตระบบคำนวณ GA

    const iso = `${calendarDate.year}-${String(calendarDate.month).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;
    form.setFieldValue("lmp", iso);

    // GA
    if (!gaManual) {
      const start = new Date(iso);
      const today = new Date();
      const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      form.setFieldValue("ga", `${weeks} สัปดาห์ ${days} วัน`);
    }

    // EDC = LMP + 280 days
    if (!edcManual) {
      const edc = new Date(iso);
      edc.setDate(edc.getDate() + 280);
      form.setFieldValue("edc", edc.toISOString().split("T")[0]);
    }
  };
  const handleEdcChange = (calendarDate) => {
    if (!calendarDate) {
      form.setFieldValue("edc", null);

      if (!lmpManual) form.setFieldValue("lmp", null);
      if (!gaManual) form.setFieldValue("ga", "");

      return;
    }

    setEdcManual(true); // ผู้ใช้แก้ EDC เอง
    setLmpManual(false); // ให้ระบบคำนวณ LMP
    setGaManual(false); // ให้ระบบคำนวณ GA

    const iso = `${calendarDate.year}-${String(calendarDate.month).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;

    // set ค่า EDC
    form.setFieldValue("edc", iso);

    // LMP = EDC - 280
    const edcDate = new Date(iso);
    const lmpDate = new Date(iso);
    lmpDate.setDate(edcDate.getDate() - 280);

    if (!lmpManual) {
      form.setFieldValue("lmp", lmpDate.toISOString().split("T")[0]);
    }

    // GA
    if (!gaManual) {
      const today = new Date();
      const diffDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      form.setFieldValue("ga", `${weeks} สัปดาห์ ${days} วัน`);
    }
  };

  const handleReset = () => {
    form.reset();
    setGravidaOptions([]);
    setSelectedGravida("");
    setRoundOptions([]);
    setSelectedRound("");
    setCurrentData(null);
    setField(initialField);
    setSelectedAnc(null);
    setActiveStep("from_1");
    setEditVitalsign(defaultVitals);
    setBmi("");
    setDates({
      vac_lab_date_1_wife: field.vac_lab_date_1_wife || null,
      vac_lab_date_2_wife: field.vac_lab_date_2_wife || null,
      vac_lab_date_3_wife: field.vac_lab_date_3_wife || null,
      bti_1_date: field.bti_1_date || null,
      bti_2_date: field.bti_2_date || null,
      td_last_date: field.td_last_date || null,
      vaccine_date_1: field.vaccine_date_1 || null,
      vaccine_date_2: field.vaccine_date_2 || null,
      vaccine_date_3: field.vaccine_date_3 || null,
      tdap_round_1: field.tdap_round_1 || null,
      tdap_round_2: field.tdap_round_2 || null,
      tdap_round_3: field.tdap_round_3 || null,
      iip_date: field.iip_date || null,
      lab_2: field.lab_2 || null,
      vac_lab_date_1_wife_2: field.vac_lab_date_1_wife_2 || null,
      vac_lab_date_2_wife_2: field.vac_lab_date_2_wife_2 || null,
      vac_lab_date_3_wife_2: field.vac_lab_date_3_wife_2 || null,
      vac_lab_date_1_husband: field.vac_lab_date_1_husband || null,
      vac_lab_date_2_husband: field.vac_lab_date_2_husband || null,
      vac_lab_date_3_husband: field.vac_lab_date_3_husband || null,
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
    handleEdcChange,
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
    gravidaOptions,
    handleAncNoSelect,
    roundOptions,
    selectedGravida,
    selectedRound,
    handleGravidaSelect,
    setSelectedRound,
    handleRoundSelect,
    setGaManual,
    setEdcManual,
    setDates,
    handleVaccineChange,
    handleMaChange,
    handleHrChange,
    handlePcrWifeChange,
    handleCordoChange,
    handleAmChange,
    handleTdapChange,
    handleIipChange,
    handleBiradsChange,
    handlePerOsChange,
    handlePcrHusbandChange,
  };
}
