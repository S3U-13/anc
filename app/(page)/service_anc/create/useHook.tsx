"use client";
import React, { useEffect, useState } from "react";

export default function useHook() {
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
  }, []);

  const [field, setField] = useState({
    hn: "",
    patvisit_id: "",
    patreg_id: "",
    para: "",
    g: "",
    p: "",
    a: "",
    last: "",
    lmp: "",
    ma_id: "",
    ma_text: "",
    hr_id: "",
    hr_text: "",
    am_id: "",
    gct_1: "",
    gct_2: "",
    hbsag: "",
    vdrl_1: "",
    anti_hiv: "",
    bl_gr: "",
    rh: "",
    hct: "",
    of: "",
    dcip: "",
    mcv: "",
    mch: "",
    hb_typing: "",
    pcr_wife_id: "",
    pcr_text: "",
    cordo_id: "",
    cordo_text: "",
    cordo_other_text: "",
    abortion_id: "",
    td_num: "",
    td_last_date: "",
    tdap_id: "",
    tdap_round_1: "",
    tdap_round_2: "",
    tdap_round_3: "",
    iip_id: "",
    iip_date: "",
    lab_2: "",
    vdrl_2: "",
    h: "",
    bti_value_1_id: "",
    bti_value_2_id: "",
    bti_value_3_id: "",
    bti_value_4_id: "",
    bti_value_5_id: "",
    bti_date: "",
    cbe_value_1_id: "",
    cbe_value_2_id: "",
    cbe_value_3_id: "",
    cbe_value_4_id: "",
    birads_id: "",
    cbe_result: "",
    per_os_id: "",
    husband_name: "",
    husband_age: "",
    husband_id_card: "",
    husband_hn: "",
    husband_tel: "",
    husband_job: "",
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
    ref_in_id: [] as string[],
    ref_out_id: [] as string[],
    ref_in_choice_id: "",
    ref_out_choice_i: "",
    hos_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // ดูว่ากดแล้วได้ค่าไหม
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const [ga, setGa] = useState("");

  useEffect(() => {
    if (field.lmp) {
      const lmp = new Date(field.lmp);
      const today = new Date();

      // คำนวณ GA
      const diffTime = today.getTime() - lmp.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;

      // คำนวณ EDC (LMP + 280 วัน)
      const edcDate = new Date(lmp);
      edcDate.setDate(edcDate.getDate() + 280);

      // ✅ เก็บ GA แค่ใน state ga
      setGa(`${weeks} สัปดาห์ ${days} วัน`);

      // ✅ เก็บ EDC ใน field
      setField((prev) => ({
        ...prev,
        edc: edcDate.toISOString().split("T")[0], // yyyy-mm-dd
      }));
    } else {
      setGa(""); // clear GA
      setField((prev) => ({
        ...prev,
        edc: null, // clear EDC
      }));
    }
  }, [field.lmp]);

  // <Input size='sm' label="PARA" type="text" />
  //                   <Input size='sm' label="G" type="text" />
  //                   <Input size='sm' label="P" type="text" />
  //                   <Input size='sm' label="A" type="text" />
  //                   <Input size='sm' label="LAST" type="text" />
  //   <div className='grid grid-cols-3 gap-[10px] mt-[10px]'>
  //                   <DatePicker
  //                     size='sm'
  //                     label="LMP"
  //                     value={field.lmp ? parseDate(new Date(field.lmp).toISOString().split("T")[0]) : null}
  //                     onChange={(calendarDate) => {
  //                       if (calendarDate) {
  //                         const jsDate = calendarDate.toDate("UTC");
  //                         setField((prev) => ({ ...prev, lmp: jsDate }));
  //                       } else {
  //                         setField((prev) => ({ ...prev, lmp: null }));
  //                       }
  //                     }}
  //                   />
  //                   <DatePicker
  //                     size='sm'
  //                     label="EDC"
  //                     isReadOnly
  //                     value={field.edc ? parseDate(field.edc) : null}
  //                   />
  //                   <Input
  //                     size="sm"
  //                     label="อายุครรภ์"
  //                     value={ga || ""}
  //                     type="text"
  //                     readOnly
  //                   />
  //                 </div>
  //               </div>
  const [selectedAnc, setSelectedAnc] = useState(null);
  console.log(selectedAnc);

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

  return {
    data,
    field,
    handleChange,
    selectedAnc,
    setSelectedAnc,
  };
}
