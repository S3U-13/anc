"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";

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
  const [selectedGravida, setSelectedGravida] = useState([]);
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
    para: "",
    gravida: "",
    p: "",
    a: "",
    last: "",
    lmp: "",
    edc: "",
    ga: "",
    ma_id: null,
    ma_detail: "",
    hr_id: null,
    hr_detail: "",
    am_id: null,
    gct_1_wife: "",
    gct_2_wife: "",
    ogtt_1_wife: "",
    ogtt_2_wife: "",
    hbsag_wife: null,
    vdrl_wife: null,
    anti_hiv_wife: null,
    bl_gr_wife: null,
    rh_wife: null,
    hct_wife: "",
    of_wife: "",
    dcip_wife: null,
    mcv_wife: "",
    mch_wife: "",
    hb_typing_wife: "",
    pcr_wife_id: "",
    pcr_wife_text: "",
    cordo_id: null,
    cordo_text: "",
    cordo_other_text: "",
    abortion_id: null,
    td_num: null,
    td_last_date: null,
    tdap_id: null,
    tdap_round_1: null,
    tdap_round_2: null,
    tdap_round_3: null,
    iip_id: null,
    iip_date: null,
    lab_2: null,
    vdrl_2: null,
    hct: null,
    h: null,
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
    per_os_id: null,
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
    anc_no: z.coerce.string().min(1, { message: "กรุณากรอก หมายเลข ANC" }),

    patvisit_id: z.coerce.number({
      required_error: "กรุณาระบุ PAT VISIT ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    patreg_id: z.coerce.number({
      required_error: "กรุณาระบุ PAT REG ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    gravida: z.string().min(1, { message: "กรุณากรอก" }),
    p: z.string().min(1, { message: "กรุณากรอก" }),
    a: z.string().min(1, { message: "กรุณากรอก" }),
    para: z.string().min(1, { message: "กรุณากรอก" }),

    last: z
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ที่คลอดบุตรคนล่าสุด" }),
    lmp: z
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ประจำเดือนมาครั้งล่าสุด" }),
    edc: z
      .string()
      .min(1, { message: "กรุณากรอก วัน/เดือน/ปี ที่คาดว่าจะคลอดบุตร" }),
    ga: z.string().min(1, { message: "กรุณากรอก อายุครรภ์" }),

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
    anti_hiv_wife: z.coerce.number().nullable(),
    bl_gr_wife: z.coerce.number().nullable(),
    rh_wife: z.coerce.number().nullable(),
    hct_wife: z.string().optional(),
    of_wife: z.string().optional(),
    dcip_wife: z.coerce.number().nullable(),
    mcv_wife: z.string().optional(),
    mch_wife: z.string().optional(),
    hb_typing_wife: z.string().nullable(),

    // husband lab info
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

    // misc
    pcr_hus_id: z.string().nullable(),
    pcr_hus_text: z.string().optional(),
    pcr_wife_id: z.string().nullable(),
    pcr_wife_text: z.string().optional(),
    cordo_id: z.string().nullable(),
    cordo_text: z.string().optional(),
    cordo_other_text: z.string().optional(),
    abortion_id: z.string().nullable(),
    td_num: z.string().nullable(),
    td_last_date: z.string().nullable(),
    tdap_id: z.string().nullable(),
    tdap_round_1: z.string().nullable(),
    tdap_round_2: z.string().nullable(),
    tdap_round_3: z.string().nullable(),
    iip_id: z.string().nullable(),
    iip_date: z.string().nullable(),
    lab_2: z.string().nullable(),
    vdrl_2: z.string().nullable(),
    hct: z.string().nullable(),
    h: z.string().nullable(),
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
    per_os_id: z.string().nullable(),
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

      // ให้แน่ใจว่า roundOptions เป็น array ของ object {id, round}
      const formattedRounds = rounds.map((r) => ({
        id: r.id,
        round: r.round,
      }));

      setRoundOptions(formattedRounds);
    } catch (err) {
      console.error("Error fetching rounds:", err);
    }
  };

  const handleSelect = async (roundId) => {
    // setSelectedAncNo(AncNo);
    // setSelectedGravida(Gravida);
    // setOpenEditAncService(true);
    setIsEditLoading(true);
    setCurrentData(null);

    try {
      const data = await selectedRoundById(roundId); // ✅ ไม่ต้องส่ง token
      setCurrentData(data);
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
      if (currentData?.wife?.choices?.referral_value) {
        const ref = currentData.wife.choices.referral_value;
        const initialSelected = [ref.ref_value_1_id, ref.ref_value_2_id]
          .filter(Boolean)
          .map(String);

        setSelectedRef(initialSelected);

        const refField = mapCheckboxValues(
          "ref",
          initialSelected,
          2,
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
  }, [currentData, form]);

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

  console.log(selectedGravida);
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
    gravidaOptions,
    handleAncNoSelect,
    handleSelect,
    roundOptions,
    selectedGravida,
    handleGravidaSelect,
  };
}
