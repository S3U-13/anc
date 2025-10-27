"use client"; // ✅
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";
import React, { useRef } from "react";
import { useEffect, useState, useMemo } from "react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function useHook() {
  const auth = useAuth();
  const { fetchSelectDataAnc } = useApiRequest();
  const didFetch = useRef(false);
  const modalRef = useRef(null);
  const [dataAnc, setDataAnc] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!auth.token || didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchSelectDataAnc()
      .then((data) => setDataAnc(data))
      .catch(console.error);
  }, []);

  const openModalForm = () => {
    setOpenModal((prev) => !prev);
  };

  // ✅ filter data
  const filteredItems = useMemo(() => {
    // ✅ ตรวจสอบก่อนเสมอว่าข้อมูลเป็น array
    if (!Array.isArray(dataAnc)) return [];

    let filtered = [...dataAnc];

    if (filterValue) {
      const keyword = filterValue.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          String(item.hn_wife || "")
            .toLowerCase()
            .includes(keyword) ||
          String(item.wife?.firstname || "")
            .toLowerCase()
            .includes(keyword) ||
          String(item.hn_husband || "")
            .toLowerCase()
            .includes(keyword) ||
          String(item.husband?.firstname || "")
            .toLowerCase()
            .includes(keyword)
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
    { uid: "hn_husband", name: "HN (สามี)" },
    { uid: "husband_name", name: "ชื่อ (สามี)" },
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
    new Set(["anc_no", "hn_wife", "wife_name"])
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => visibleColumns.has(col.uid));
  }, [visibleColumns, columns]);

  const handleSelectionChange = (keys) => {
    // HeroUI ส่งค่าเป็น Set หรือ "all"
    if (keys === "all") return; // กันกรณี select all

    // บังคับเลือกได้แค่ 1 key
    const firstKey = Array.from(keys)[0];
    setSelectedKeys(new Set(firstKey ? [firstKey] : []));
  };

  const onClear = () => setFilterValue("");

  return {
    dataAnc,
    openModal,
    openModalForm,
    setOpenModal,
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
    handleSelectionChange,
    capitalize,
    filteredItems,
    onRowsPerPageChange,
    rowsPerPage,
    onSortChange,
    sortDescriptor,
    headerColumns,
    modalRef,
  };
}
