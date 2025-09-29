import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export default function page({ selectedAnc }) {
  const [field, setField] = useState({
    lmp: null,
    edc: null,
  });

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
    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "UTC",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(date) + " น."
      .replace(`${date.getFullYear() + 543}`, buddhistYear);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-[10px] mt-[10px] overflow-y-scroll max-h-[calc(90vh-350px)] px-[20px]">
        <Input
          size="sm"
          label="WARD"
          value={selectedAnc?.wife?.pat_reg?.[0]?.Location?.detailtext ?? ""}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          label="VISIT DATE"
          value={formatThaiDateTime(
            selectedAnc?.wife?.pat_reg?.[0]?.PatVisit?.visitdatetime
          )}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          label="ANC NO"
          type="text"
          value={selectedAnc?.anc_no || ""}
          readOnly
        />

        <Input
          size="sm"
          label="HN"
          type="text"
          value={selectedAnc?.hn_wife || ""}
        />
        {/* value={`${selectedAnc?.prename}${selectedAnc?.firstname} ${selectedAnc?.lastname}` || ""} */}
        <Input
          size="sm"
          label="ชื่อ"
          value={formatName(selectedAnc?.wife) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="อายุ"
          value={calculateAge(selectedAnc?.wife?.birthdatetime) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="บัตรประชาชน"
          value={selectedAnc?.wife?.citizencardno || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="เบอร์โทรศัพท์"
          value={selectedAnc?.wife?.pat_address.phone || ""}
          type="text"
          readOnly
        />
        <Textarea
          size="sm"
          className="col-span-2"
          value={formatAddress(selectedAnc?.wife?.pat_address) || ""}
          label="ที่อยู่"
          readOnly
        />
        <Input
          size="sm"
          label="อาชีพ"
          value={selectedAnc?.wife?.occupation_detail.lookupname || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="email"
          value={selectedAnc?.wife?.pat_address.email || ""}
          type="email"
          readOnly
        />
        <Input
          size="sm"
          label="น้ำหนัก"
          name="weight"
          value={editVitalsign.weight}
          onValueChange={(value) => handleEditChange("weight", value)}
          type="text"
        />
        <Input
          size="sm"
          label="ส่วนสูง"
          name="height"
          value={editVitalsign.height}
          onValueChange={(value) => handleEditChange("height", value)}
          type="text"
        />
        <Input size="sm" label="BMI" value={bmi} type="text" isReadOnly />
        <Input
          size="sm"
          label="ความดันโลหิต"
          value={
            vitals?.bp_systolic && vitals?.bp_diastolic
              ? `${vitals.bp_systolic}/${vitals.bp_diastolic} mmHg`
              : ""
          }
          type="text"
          readOnly
        />
        <Input size="sm" label="PARA" type="text" />
        <Input size="sm" label="G" type="text" />
        <Input size="sm" label="P" type="text" />
        <Input size="sm" label="A" type="text" />
        <Input size="sm" label="LAST" type="text" />
        <DatePicker
          size="sm"
          label="LMP"
          value={
            field.lmp
              ? parseDate(new Date(field.lmp).toISOString().split("T")[0])
              : null
          }
          onChange={(calendarDate) => {
            if (calendarDate) {
              const jsDate = calendarDate.toDate("UTC"); // ได้เป็น Date
              setField((prev) => ({ ...prev, lmp: jsDate }));
            } else {
              setField((prev) => ({ ...prev, lmp: null }));
            }
          }}
          // แสดงผลเป็นภาษาไทย + พ.ศ.
          placeholder={field.lmp ? formatThaiDate(field.lmp) : "เลือกวันที่"}
        />
        <DatePicker
          size="sm"
          label="EDC"
          locale="th-TH-u-ca-buddhist"
          isReadOnly
          value={field.edc ? parseDate(field.edc) : null}
        />
        <Input
          size="sm"
          label="อายุครรภ์"
          value={ga || ""}
          type="text"
          readOnly
        />
      </div>
    </div>
  );
}
