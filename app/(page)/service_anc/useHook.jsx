"use client"; // ✅

import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useEffect, useState, useMemo } from "react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function useHook() {
  const auth = useAuth();
  const [dataAnc, setDataAnc] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openFormService, setOpenFormService] = useState(false);
  const [openViewAncService, setOpenViewAncService] = useState(false);

  useEffect(() => {
    fetchDataAnc();
  }, []);

  const fetchDataAnc = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/ancservice", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await res.json().catch(() => []);

      setDataAnc(json);
    } catch (error) {
      console.log(error);
    }
  };

  const openModalForm = () => {
    setOpenFormService((prev) => !prev);
  };

  const openModalView = () => {
    setOpenViewAncService((prev) => !prev);
  };

  // ✅ filter data
  const filteredItems = useMemo(() => {
    let filtered = [...dataAnc];

    if (filterValue) {
      filtered = filtered.filter(
        (item) =>
          String(item.wife?.hn_wife || "")
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          String(item.wife?.firstname || "")
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          String(item.husband?.firstname || "")
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [dataAnc, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // reset กลับไปหน้าแรก
  };

  const columns = [
    { uid: "anc_no", name: "ANC NO" },
    { uid: "hn_wife", name: "HN (ภรรยา)" },
    { uid: "wife_name", name: "ชื่อ (ภรรยา)" },
    { uid: "address", name: "ที่อยู่" },
    { uid: "phone", name: "โทรศัพท์" },
    { uid: "hn_husband", name: "HN (สามี)" },
    { uid: "husband_name", name: "ชื่อ (สามี)" },
    { uid: "gravida", name: "ท้องที่" },
  ];

  // ✅ sort
  const [sortDescriptor, setSortDescriptor] = useState({
    column: null, // ยังไม่ sort
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    if (!sortDescriptor.column) {
      // ยังไม่ได้กด column -> เรียงตาม anc_no
      return [...items].sort((a, b) => a.anc_no - b.anc_no);
    }

    return [...items].sort((a, b) => {
      const first = `${a.wife?.prename || ""}${a.wife?.firstname || ""} ${a.wife?.lastname || ""}`;
      const second = `${b.wife?.prename || ""}${b.wife?.firstname || ""} ${b.wife?.lastname || ""}`;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const onSortChange = (column) => {
    if (sortDescriptor.column === column) {
      setSortDescriptor({
        column,
        direction:
          sortDescriptor.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setSortDescriptor({ column, direction: "ascending" });
    }
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  // ค่าเริ่มต้นเลือกทุกคอลัมน์
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(["anc_no", "hn_wife", "wife_name", "address", "phone", "gravida"])
  );

  const onClear = () => setFilterValue("");

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

  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [roundData, setRoundData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRound = async (roundId) => {
    console.log("id ที่เลือก", selectedRoundId);
    console.log("ข้อมูลในรอบนั้น", roundData);
    setSelectedRoundId(roundId);
    setOpenViewAncService(true);
    setIsLoading(true);
    setRoundData(null);

    try {
      const res = await fetch(
        `http://localhost:3000/api/user/show-service-by-id/${roundId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await res.json();
      setRoundData(data);
    } catch (err) {
      console.error("Error fetching round data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatThaiDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    // แปลงเป็นปี พ.ศ.
    const buddhistYear = date.getFullYear() + 543;

    // format วันที่ เวลา ภาษาไทย
    return (
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
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

  const btiData = [
    {
      value: roundData?.wife?.choices?.bti?.bti_value_1?.choice_name || "",
      date: roundData?.wife?.text_values?.bti_1_date || "",
    },
    {
      value: roundData?.wife?.choices?.bti?.bti_value_2?.choice_name || "",
      date: roundData?.wife?.text_values?.bti_2_date || "",
    },
    {
      value: roundData?.wife?.choices?.bti?.bti_value_3?.choice_name || "",
    },
    {
      value: roundData?.wife?.choices?.bti?.bti_value_4?.choice_name || "",
    },
    {
      value: roundData?.wife?.choices?.bti?.bti_value_5?.choice_name || "",
    },
  ].filter((item) => item.value); // กรองตัวว่างออก
  const cbeData = [
    {
      value: roundData?.wife?.choices?.cbe?.cbe_value_1?.choice_name || "",
    },
    {
      value: roundData?.wife?.choices?.cbe?.cbe_value_2?.choice_name || "",
      data: roundData?.wife?.choices?.birads?.choice_name || "",
    },
    {
      value: roundData?.wife?.choices?.cbe?.cbe_value_3?.choice_name || "",
    },
    {
      value: roundData?.wife?.choices?.cbe?.cbe_value_4?.choice_name || "",
      data: roundData?.wife?.text_values?.cbe_result || "",
    },
  ].filter((item) => item.value); // กรองตัวว่างออก
  const ReferralValue = [
    {
      value:
        roundData?.wife?.choices?.referral_value?.ref_in?.choice_name || "",
      data:
        roundData?.wife?.choices?.ref_in_choice?.receive_in?.choice_name || "",
      hos: roundData?.wife?.referral?.ref_in?.[0].sitedesc || "",
      prov: roundData?.wife?.referral?.ref_in?.[0].provdesc || "",
    },
    {
      value:
        roundData?.wife?.choices?.referral_value?.ref_out?.choice_name || "",
      data:
        roundData?.wife?.choices?.ref_out_choice?.receive_out?.choice_name ||
        "",
      hos: roundData?.wife?.referral?.ref_out?.[0].sitedesc || "",
      prov: roundData?.wife?.referral?.ref_out?.[0].provdesc || "",
    },
  ].filter((item) => item.value); // กรองตัวว่างออก

  const formatThaiDateNoTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return {
    dataAnc,
    openModalForm,
    openFormService,
    setOpenFormService,
    openModalView,
    openViewAncService,
    setOpenViewAncService,
    setSelectedKeys,
    selectedKeys,
    selectedValue,
    sortedItems,
    page,
    setPage,
    pages,
    onClear,
    filterValue,
    setFilterValue,
    // ✅ เพิ่มอันนี้ให้ UI ใช้งาน
    columns,
    visibleColumns,
    setVisibleColumns,
    capitalize,
    filteredItems,
    onRowsPerPageChange,
    rowsPerPage,
    onSortChange,
    sortDescriptor,
    fetchDataAnc,
    formatAddress,
    handleSelectRound,
    roundData,
    isLoading,
    formatThaiDateTime,
    btiData,
    cbeData,
    ReferralValue,
    formatThaiDateNoTime,
  };
}
