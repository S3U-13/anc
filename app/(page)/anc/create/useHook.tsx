'use client';

import { addToast } from '@heroui/toast';
import React, { useEffect, useState } from 'react'

export default function useHook() {

    const [field, SetField] = useState({
        hn_wife: "",
        hn_husband: "",
        lmp: "",
        edc: "",
    });

    const [pat, SetPat] = useState(null); // 👈 เก็บ object คนเดียว

    const patData = async (value) => {
        try {
            const res = await fetch(`http://localhost:3000/api/pat/${value}`);
            if (!res.ok) throw new Error("ไม่พบข้อมูล");
            const json = await res.json();
            SetPat(json);
            // อัปเดต field
            SetField((prev) => ({
                ...prev,
                hn_wife: json.hn || "",
            }));
        } catch (error) {
            console.log(error);
            addToast({
                title: "ไม่พบข้อมูล",
                description: "error",
                variant: "flat",
                color: "danger"
            });
        }
    };

    useEffect(() => {
        // สมมติอยากโหลดคนแรกตอน mount
        // patData(); // value เป็น hn หรือ citizen
    }, []);

    const [hnInputWife, setHnInputWife] = useState("");

    const handleSearchHnWife = () => {
        if (hnInputWife) {
            patData(hnInputWife);
            addToast({
                title: "สำเร็จ",
                description: "ดึงข้อมูลสำเร็จ",
                variant: "flat",   // flat | solid | bordered
                color: "primary",   // default | primary | secondary | success | warning | danger
            });
        } else {
            addToast({
                title: "กรุณากรอก HN Wife ก่อน",
                description: "คุณยังไม่ได้กรอกค่า HN Wife",
                variant: "flat",   // flat | solid | bordered
                color: "warning",   // default | primary | secondary | success | warning | danger
            });
        }
    };

    const formatAddress = (pat_address) => {
        if (!pat_address) return "";

        const parts = [];

        if (pat_address.house) parts.push(pat_address.house);
        if (pat_address.moo) parts.push(`ม.${pat_address.moo}`);
        if (pat_address.soy) parts.push(`ซอย ${pat_address.soy}`);
        if (pat_address.road) parts.push(`ถนน ${pat_address.road}`);
        if (pat_address.tambon_detail?.detailtext) parts.push(`ต.${pat_address.tambon_detail.detailtext}`);
        if (pat_address.amphur_detail?.detailtext) parts.push(`อ.${pat_address.amphur_detail.detailtext}`);
        if (pat_address.province_detail?.detailtext) parts.push(`จ.${pat_address.province_detail.detailtext}`);

        return parts.join(" "); // รวมเป็น string เดียว
    };

    return {
        field, handleSearchHnWife, hnInputWife, setHnInputWife, pat, formatAddress
    }
}
