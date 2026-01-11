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

  //
  const initialField = () => ({
    //anc_service
    anc_no: "",
    patvisit_id: "",
    patreg_id: "",
    pat_vitalsign_id: "",
    gravida: "",
    //obstetric_history
    prep_weight: "",
    bmi: "",
    para: "",
    p: "",
    a: "",
    last: "",
    lmp: null,
    edc: null,
    ga: "",
    verified_by: null,
    //patient_risk_factors
    patient_drug_allergy: null,
    patient_drug_allergy_detail: "",
    high_risk: null,
    high_risk_detail: "",
    amniocentesis_plan: null,
    am_reason_checked: "",
    am_reason_not_checked: "",
    am_reason_consult: "",
    pcr_tested: null,
    pcr_result: "",
    cordocentesis_plan: null,
    cordocentesis_detail: "",
    other: "",
    pregnancy_status: null,
    //pregnancy_vaccinations
    vaccination_his: "",
    forget_or_remember_date_vaccination: null,
    last_vaccination_date: null,
    forget_last_vaccination_date: "",
    vaccine_type: null,
    influenza_reason: "",
    influenza_appointment_date: null,
    ap_reason: "",
    ap_appointment_date: null,
    t_dap_reason: "",
    t_dap_appointment_date: null,
    received_during_preg: null,
    first_appointment: null,
    second_appointment: null,
    third_appointment: null,
    booster_during_preg: null,
    booster_during_preg_date: null,
    //antenatal_screenings
    blood_group_result: [],
    field_key_choice_blood_group_result: "",
    field_value_choice_blood_group_result: "",
    breast_exam_result: "",
    bi_rads_id: null,
    bi_rads_left_detail: "",
    bi_rads_right_detail: "",
    bi_rads_both_sides_detail: "",
    anc_pap_smear_detail: "",
    received_medicine: null,
    iodine_reason: "",
    iron_reason: "",
    folic_reason: "",
    amoxicillin_reason: "",
    utrogestan_reason: "",
    //wife_lab_result
    wife_hn: null,
    //glucose_test_wife
    gct_1: "",
    gct_2: "",
    ogtt_1: "",
    ogtt_2: "",
    //maternal_infectious_screenings_wife
    wife_hbsag_result: null,
    wife_anti_hiv_result: null,
    wife_vdrl_result: null,
    wife_ppr_result: "",
    wife_tpha_result: "",
    //maternal_infectious_treatment_wife
    wife_treatment_detail: "",
    wife_treatment_date_1: null,
    wife_treatment_date_2: null,
    wife_treatment_date_3: null,
    //maternal_blood_group_wife
    wife_abo_group: null,
    wife_rh_factor: null,
    //maternal_hematology_results_wife
    wife_hct_value: "",
    wife_of_value: null,
    wife_dcip_result: null,
    wife_mcv_value: "",
    wife_mch_value: "",
    wife_hb_typing: "",
    //wife_lab_2_result
    wife_hn_lab_2: null,
    lab_2_date: null,
    wife_hct_lab_2: "",
    wife_vdrl_lab_2: null,
    wife_ppr_result_lab_2: "",
    wife_tpha_result_lab_2: "",
    wife_anti_hiv_lab_2: null,
    //maternal_infectious_treatment_wife_lab_2
    wife_lab_2_treatment_detail: "",
    wife_lab_2_treatment_date_1: null,
    wife_lab_2_treatment_date_2: null,
    wife_lab_2_treatment_date_3: null,
    //husband_lab_result
    husband_hn: null,
    husband_pcr_tested: null,
    husband_pcr_result: "",
    //maternal_infectious_screenings_husband
    husband_hbsag_result: null,
    husband_anti_hiv_result: null,
    husband_vdrl_result: null,
    husband_tpha_result: "",
    husband_ppr_result: "",
    //maternal_infectious_treatment_husband
    husband_treatment_detail: "",
    husband_treatment_date_1: null,
    husband_treatment_date_2: null,
    husband_treatment_date_3: null,
    //maternal_blood_group_husband
    husband_abo_group: null,
    husband_rh_factor: null,
    //maternal_hematology_results_husband
    husband_hct_value: "",
    husband_of_value: null,
    husband_dcip_result: null,
    husband_mcv_value: "",
    husband_mch_value: "",
    husband_hb_typing: "",
    //anc_refer
    refer: "",
    //anc_refer_detail
    field_refer_key: "",
    field_refer_value: "",
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
    last_vaccination_date: field.last_vaccination_date || null,
    first_appointment: field.first_appointment || null,
    second_appointment: field.second_appointment || null,
    third_appointment: field.third_appointment || null,
    booster_during_preg_date: field.booster_during_preg_date || null,
    lab_2_date: field.lab_2_date || null,
    wife_treatment_date_1: field.wife_treatment_date_1 || null,
    wife_treatment_date_2: field.wife_treatment_date_2 || null,
    wife_treatment_date_3: field.wife_treatment_date_3 || null,
    influenza_appointment_date: field.influenza_appointment_date || null,
    ap_appointment_date: field.ap_appointment_date || null,
    t_dap_appointment_date: field.t_dap_appointment_date || null,
    wife_lab_2_treatment_date_1: field.wife_lab_2_treatment_date_1 || null,
    wife_lab_2_treatment_date_2: field.wife_lab_2_treatment_date_2 || null,
    wife_lab_2_treatment_date_3: field.wife_lab_2_treatment_date_3 || null,
    husband_treatment_date_1: field.husband_treatment_date_1 || null,
    husband_treatment_date_2: field.husband_treatment_date_2 || null,
    husband_treatment_date_3: field.husband_treatment_date_3 || null,
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
      form.setFieldValue("bi_rads_id", null);
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
      form.setFieldValue("bmi", bmi);
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
  const [BloodTestResult, setBloodTestResult] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // ✅ อัปเดต state ปกติ (UI)
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ อัปเดตเข้า useForm ด้วย
    form.setFieldValue(name, value);
    setBloodTestResult((prev) => {
      const sorted = [...prev].sort((a, b) => a - b);
      form.setFieldValue("blood_test_result", sorted);
      return sorted;
    });
  };
  // new handle
  const handleMaChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "1") {
      form.setFieldValue("patient_drug_allergy_detail", "");
    }
  };
  const handleHrChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "4") {
      form.setFieldValue("high_risk_detail", "");
    }
  };
  const handlePcrWifeChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "9") {
      form.setFieldValue("pcr_result", "");
    }
  };
  const handleCordoChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "11") {
      form.setFieldValue("cordocentesis_detail", "");
    }
  };
  const handleAmChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "4") {
      form.setFieldValue("am_reason_checked", "");
    }

    if (newValue !== "5") {
      form.setFieldValue("am_reason_not_checked", "");
    }

    if (newValue !== "6") {
      form.setFieldValue("am_reason_consult", "");
    }
  };
  const handleVaccineChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "58") {
      form.setFieldValue("influenza_reason", "");
      form.setFieldValue("influenza_appointment_date", null);
      setDates((prev) => ({ ...prev, influenza_appointment_date: null }));
    }

    if (newValue !== "59") {
      form.setFieldValue("ap_reason", "");
      form.setFieldValue("ap_appointment_date", null);
      setDates((prev) => ({ ...prev, ap_appointment_date: null }));
    }

    if (newValue !== "60") {
      form.setFieldValue("t_dap_reason", "");
      form.setFieldValue("t_dap_appointment_date", null);
      setDates((prev) => ({ ...prev, t_dap_appointment_date: null }));
    }
  };
  const handleTdapChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "14") {
      form.setFieldValue("first_appointment", null);
      form.setFieldValue("second_appointment", null);
      form.setFieldValue("third_appointment", null);
      setDates((prev) => ({
        ...prev,
        first_appointment: null,
        second_appointment: null,
        third_appointment: null,
      }));
    }
  };
  const handleIipChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "16") {
      form.setFieldValue("booster_during_preg_date", null);

      setDates((prev) => ({
        ...prev,
        booster_during_preg_date: null,
      }));
    }
  };
  const handleBiradsChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "27") {
      form.setFieldValue("bi_rads_left_detail", "");
    }
    if (newValue !== "28") {
      form.setFieldValue("bi_rads_right_detail", "");
    }
    if (newValue !== "29") {
      form.setFieldValue("bi_rads_both_sides_detail", "");
    }
  };
  const handlePerOsChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "30") {
      form.setFieldValue("iodine_reason", "");
    }
    if (newValue !== "31") {
      form.setFieldValue("iron_reason", "");
    }
    if (newValue !== "35") {
      form.setFieldValue("folic_reason", "");
    }
    if (newValue !== "63") {
      form.setFieldValue("amoxicillin_reason", "");
    }
    if (newValue !== "64") {
      form.setFieldValue("utrogestan_reason", "");
    }
  };

  const handlePcrHusbandChange = (e, field) => {
    const newValue = e.target.value;

    field.handleChange(newValue);

    if (newValue !== "9") {
      form.setFieldValue("husband_pcr_result", "");
    }
  };
  // end new handle
<<<<<<< Updated upstream
  const handleSubmit = async (value) => {
=======
  const [loading, setLoading] = useState(true);
  const submitAncService = async (value) => {
>>>>>>> Stashed changes
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
<<<<<<< Updated upstream
      await submitCreateAncService(value);
=======
      const data = await submitCreateAncService(value);

      // reset form & state
>>>>>>> Stashed changes
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
        bti_1_date: field.bti_1_date || null,
        bti_2_date: field.bti_2_date || null,
        td_last_date: field.td_last_date || null,
        tdap_round_1: field.tdap_round_1 || null,
        tdap_round_2: field.tdap_round_2 || null,
        tdap_round_3: field.tdap_round_3 || null,
        iip_date: field.iip_date || null,
        lab_2: field.lab_2 || null,
        treatment_date_1_wife: field.treatment_date_1_wife || null,
        treatment_date_2_wife: field.treatment_date_2_wife || null,
        treatment_date_3_wife: field.treatment_date_3_wife || null,
        influenza_date: field.influenza_date || null,
        ap_date: field.ap_date || null,
        tdap_date: field.tdap_date || null,
        treatment_date_1_lab_2: field.treatment_date_1_lab_2 || null,
        treatment_date_2_lab_2: field.treatment_date_2_lab_2 || null,
        treatment_date_3_lab_2: field.treatment_date_3_lab_2 || null,
        treatment_date_1_husband: field.treatment_date_1_husband || null,
        treatment_date_2_husband: field.treatment_date_2_husband || null,
        treatment_date_3_husband: field.treatment_date_3_husband || null,
      });

      setSelectedBti([]);
      setSelectedCbe([]);
      setSelectedRef([]);
      closeFormService();
<<<<<<< Updated upstream
    } catch (error) {
      console.log(error);
=======

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
      } else {
        addToast({
          title: "ผิดพลาด",
          description: "ไม่สามารถบันทึกข้อมูลได้",
          color: "danger",
          variant: "flat",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      addToast({
        title: "error",
        description: "error",
        color: "danger",
        variant: "flat",
      });
>>>>>>> Stashed changes
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultValues = initialField();

  const validationSchema = z.object({
    //anc_service
    anc_no: z.coerce.string().min(1, { message: "กรุณากรอก หมายเลข ANC" }),

    patvisit_id: z.coerce.string({
      required_error: "กรุณาระบุ PAT VISIT ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    patreg_id: z.coerce.string({
      required_error: "กรุณาระบุ PAT REG ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    pat_vitalsign_id: z.coerce.string({
      required_error: "กรุณาระบุ PAT VITALSIGN ID",
      invalid_type_error: "กรุณาระบุเป็นตัวเลข",
    }),

    gravida: z.string().min(1, { message: "กรุณากรอก" }),
    //obstetric_history
    prep_weight: z.string().optional(),
    bmi: z.string().optional(),
    p: z.string().min(1, { message: "กรุณากรอก" }),
    a: z.string().min(1, { message: "กรุณากรอก" }),
    para: z.string().min(1, { message: "กรุณากรอก" }),
    last: z.string().optional(),
    lmp: z.string().nullable(),
    edc: z.string().nullable(),
    ga: z.string().optional(),
    verified_by: z.string().nullable(),
    //patient_risk_factors
    patient_drug_allergy: z.string().nullable(),
    patient_drug_allergy_detail: z.string().optional(),
    high_risk: z.string().nullable(),
    high_risk_detail: z.string().nullable(),
    amniocentesis_plan: z.string().nullable(),
    am_reason_checked: z.string().optional(),
    am_reason_not_checked: z.string().optional(),
    am_reason_consult: z.string().optional(),
    pcr_tested: z.string().nullable(),
    pcr_result: z.string().optional(),
    cordocentesis_plan: z.string().nullable(),
    cordocentesis_detail: z.string().optional(),
    other: z.string().optional(),
    pregnancy_status: z.string().nullable(),
    //pregnancy_vaccinations
    vaccination_his: z.string().optional(),
    forget_last_vaccination_date: z.coerce.number().nullable(),
    last_vaccination_date: z.string().nullable(),
    forget_last_vaccination_date: z.string().optional(),
    vaccine_type: z.coerce.number().nullable(),
    influenza_reason: z.string().optional(),
    influenza_appointment_date: z.string().nullable(),
    ap_reason: z.string().optional(),
    ap_appointment_date: z.string().nullable(),
    t_dap_reason: z.string().optional(),
    t_dap_appointment_date: z.string().nullable(),
    received_during_preg: z.string().nullable(),
    first_appointment: z.string().nullable(),
    second_appointment: z.string().nullable(),
    third_appointment: z.string().nullable(),
    booster_during_preg: z.string().nullable(),
    booster_during_preg_date: z.string().nullable(),
    //antenatal_screenings
    blood_group_result: z.array(z.coerce.number()).nullable(),
    field_key_choice_blood_group_result: z.string().nullable(),
    field_value_choice_blood_group_result: z.string().nullable(),
    breast_exam_result: z.string().nullable(),
    bi_rads_id: z.string().nullable(),
    bi_rads_left_detail: z.string().optional(),
    bi_rads_right_detail: z.string().optional(),
    bi_rads_both_sides_detail: z.string().optional(),
    anc_pap_smear_detail: z.string().optional(),
    received_medicine: z.string().nullable(),
    iodine_reason: z.string().optional(),
    iron_reason: z.string().optional(),
    folic_reason: z.string().optional(),
    amoxicillin_reason: z.string().optional(),
    utrogestan_reason: z.string().optional(),
    //wife_lab_result
    wife_hn: z.string().nullable(),
    //glucose_test_wife
    gct_1_wife: z.string().optional(),
    gct_2_wife: z.string().optional(),
    ogtt_1_wife: z.string().optional(),
    ogtt_2_wife: z.string().optional(),
    //maternal_infectious_screenings_wife
    wife_hbsag_result: z.coerce.number().nullable(),
    wife_anti_hiv_result: z.coerce.number().nullable(),
    wife_vdrl_result: z.coerce.number().nullable(),
    wife_ppr_result: z.string().optional(),
    wife_tpha_result: z.string().optional(),
    //maternal_infectious_treatment_wife
    wife_treatment_detail: z.string().optional(),
    wife_treatment_date_1: z.string().nullable(),
    wife_treatment_date_2: z.string().nullable(),
    wife_treatment_date_3: z.string().nullable(),
    //maternal_blood_group_wife
    wife_abo_group: z.coerce.number().nullable(),
    wife_rh_factor: z.coerce.number().nullable(),
    //maternal_hematology_results_wife
    wife_hct_value: z.string().optional(),
    wife_of_value: z.coerce.number().nullable(),
    wife_dcip_result: z.coerce.number().nullable(),
    wife_mcv_value: z.string().optional(),
    wife_mch_value: z.string().optional(),
    wife_hb_typing: z.string().nullable(),
    //wife_lab_2_result
    wife_hn_lab_2: z.string().nullable(),
    lab_2_date: z.string().nullable(),
    wife_hct_lab_2: z.string().nullable(),
    wife_vdrl_lab_2: z.string().nullable(),
    wife_ppr_result_lab_2: z.string().optional(),
    wife_tpha_result_lab_2: z.string().optional(),
    wife_anti_hiv_lab_2: z.string().nullable(),
    //maternal_infectious_treatment_wife_lab_2
    wife_lab_2_treatment_detail: z.string().optional(),
    wife_lab_2_treatment_date_1: z.string().nullable(),
    wife_lab_2_treatment_date_2: z.string().nullable(),
    wife_lab_2_treatment_date_3: z.string().nullable(),
    //husband_lab_result
    husband_hn: z.string().nullable(),
    husband_pcr_tested: z.string().nullable(),
    husband_pcr_result: z.string().optional(),
    //maternal_infectious_screenings_husband
    husband_hbsag_result: z.coerce.number().nullable(),
    husband_vdrl_result: z.coerce.number().nullable(),
    husband_ppr_result: z.string().optional(),
    husband_tpha_result: z.string().optional(),
    husband_anti_hiv_result: z.coerce.number().nullable(),
    //maternal_infectious_treatment_husband
    husband_treatment_detail: z.string().optional(),
    husband_treatment_date_1: z.string().nullable(),
    husband_treatment_date_2: z.string().nullable(),
    husband_treatment_date_3: z.string().nullable(),
    //maternal_blood_group_husband
    husband_abo_group: z.coerce.number().nullable(),
    husband_rh_factor: z.coerce.number().nullable(),
    //maternal_hematology_results_husband
    husband_hct_value: z.string().nullable(),
    husband_of_value: z.coerce.number().nullable(),
    husband_dcip_result: z.coerce.number().nullable(),
    husband_mcv_value: z.string().nullable(),
    husband_mch_value: z.string().nullable(),
    husband_hb_typing: z.string().nullable(),
    //anc_refer
    refer: z.string().nullable(),
    // //anc_refer_detail
    field_refer_key: z.string().nullable(),
    field_refer_value: z.string().nullable(),
  });

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: validationSchema, // ✅ Zod อยู่ที่เดียว
    },

    onSubmit: async ({ value }) => {
      console.log("✅ submit value:", value);
      await submitAncService(value); // value = ผ่าน Zod แล้ว
    },

    onSubmitInvalid: ({ formApi }) => {
      console.log("❌ validation ไม่ผ่าน");
      console.dir(formApi.state.errors, { depth: null });
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
        ...currentData.service_info?.wife?.anc_service_his?.obstetric_history,
        ...currentData.service_info?.wife?.anc_service_his
          ?.patient_risk_factors,
        ...currentData.service_info?.wife?.anc_service_his
          ?.pregnancy_vaccinations,
        ...currentData.service_info?.wife?.anc_service_his
          ?.antenatal_screenings,
        ...currentData.service_info?.wife?.anc_service_his?.lab?.GlucoseLabWife,
        ...currentData.service_info?.wife?.anc_service_his?.lab
          ?.InfectiousScreeningsWife,
        ...currentData.service_info?.wife?.anc_service_his?.lab
          ?.InfectiousTreatmentWife,
        ...currentData.service_info?.wife?.anc_service_his?.lab?.BloodGroupWife,
        ...currentData.service_info?.wife?.anc_service_his?.lab
          ?.HematologyResultWife,
        ...currentData.service_info?.wife?.anc_service_his?.lab2,
        ...currentData.service_info?.wife?.anc_service_his?.lab2
          ?.InfectiousTreatmentWifeLab2,
        ...currentData.service_info?.husband?.lab,
        ...currentData.service_info?.husband?.lab?.InfectiousScreeningsHusband,
        ...currentData.service_info?.husband?.lab?.InfectiousTreatmentHusband,
        ...currentData.service_info?.husband?.lab?.BloodGroupHusband,
        ...currentData.service_info?.husband?.lab?.HematologyResultHusband,
        ...currentData.service_info?.refer,
        ...currentData.service_info?.refer?.ReferDetail,
      };

      // 2️⃣ ฟิลด์วันที่ทั้งหมดในระบบ
      const dateFields = [
        "lmp",
        "edc",
        "last_vaccination_date",
        "first_appointment",
        "second_appointment",
        "third_appointment",
        "booster_during_preg_date",
        "lab_2_date",
        "bti_1_date",
        "bti_2_date",
        "wife_treatment_date_1",
        "wife_treatment_date_2",
        "wife_treatment_date_3",
        "wife_lab_2_treatment_date_1",
        "wife_lab_2_treatment_date_2",
        "wife_lab_2_treatment_date_3",
        "husband_treatment_date_1",
        "husband_treatment_date_2",
        "husband_treatment_date_3",
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
            "patient_drug_allergy",
            "high_risk",
            "amniocentesis_plan",
            "pcr_tested",
            "cordocentesis_plan",
            "pregnancy_status",
            "forget_or_remember_date_vaccination",
            "vaccine_type",
            "tdap_id",
            "received_during_preg",
            "booster_during_preg",
            "bi_rads_id",
            "received_medicine",
            "husband_pcr_tested",
            "hbsag_wife",
            "wife_vdrl_result",
            "wife_anti_hiv_result",
            "wife_abo_group",
            "wife_rh_factor",
            "wife_dcip_result",
            "wife_of_value",
            "wife_vdrl_lab_2",
            "wife_anti_hiv_lab_2",
            "husband_hbsag_result",
            "husband_vdrl_result",
            "husband_anti_hiv_result",
            "husband_abo_group",
            "husband_rh_factor",
            "husband_dcip_result",
            "husband_of_value",
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
        last_vaccination_date: info.last_vaccination_date
          ? info.last_vaccination_date.split("T")[0]
          : null,
        first_appointment: info.first_appointment
          ? info.first_appointment.split("T")[0]
          : null,
        second_appointment: info.second_appointment
          ? info.second_appointment.split("T")[0]
          : null,
        third_appointment: info.third_appointment
          ? info.third_appointment.split("T")[0]
          : null,
        booster_during_preg_date: info.booster_during_preg_date
          ? info.booster_during_preg_date.split("T")[0]
          : null,
        lab_2_date: info.lab_2_date ? info.lab_2_date.split("T")[0] : null,
        bti_1_date: info.bti_1_date ? info.bti_1_date.split("T")[0] : null,
        bti_2_date: info.bti_2_date ? info.bti_2_date.split("T")[0] : null,
        lmp: info.lmp ? info.lmp.split("T")[0] : null,
        edc: info.edc ? info.edc.split("T")[0] : null,

        // wife lab
        wife_treatment_date: info.wife_treatment_date
          ? info.wife_treatment_date.split("T")[0]
          : null,
        wife_treatment_date: info.wife_treatment_date
          ? info.wife_treatment_date.split("T")[0]
          : null,
        wife_treatment_date: info.wife_treatment_date
          ? info.wife_treatment_date.split("T")[0]
          : null,

        // wife lab 2
        wife_lab_2_treatment_date_1: info.wife_lab_2_treatment_date_1
          ? info.wife_lab_2_treatment_date_1.split("T")[0]
          : null,
        wife_lab_2_treatment_date_2: info.wife_lab_2_treatment_date_2
          ? info.wife_lab_2_treatment_date_2.split("T")[0]
          : null,
        wife_lab_2_treatment_date_3: info.wife_lab_2_treatment_date_3
          ? info.wife_lab_2_treatment_date_3.split("T")[0]
          : null,

        // husband
        husband_treatment_date_1: info.husband_treatment_date_1
          ? info.husband_treatment_date_1.split("T")[0]
          : null,
        husband_treatment_date_2: info.husband_treatment_date_2
          ? info.husband_treatment_date_2.split("T")[0]
          : null,
        husband_treatment_date_3: info.husband_treatment_date_3
          ? info.husband_treatment_date_3.split("T")[0]
          : null,

        // vaccine
        influenza_appointment_date: info.influenza_appointment_date
          ? info.influenza_appointment_date.split("T")[0]
          : null,
        ap_appointment_date: info.ap_appointment_date
          ? info.ap_appointment_date.split("T")[0]
          : null,
        t_dap_appointment_date: info.t_dap_appointment_date
          ? info.t_dap_appointment_date.split("T")[0]
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
