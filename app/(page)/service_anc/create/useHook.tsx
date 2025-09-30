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

  return {
    data,
    field,
    handleChange,
    handleChangeCbe,
    handleChangeBti,
    selectedAnc,
    setSelectedAnc,
    setField,
  };
}
