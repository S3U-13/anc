"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import useHook from "../useHook";

export default function page({
  field,
  setField,
  handleLmpChange,
  selectedAnc,
  handleEditChange,
  vitals,
  editVitalsign,
  bmi,
  handleChange,
}) {
  const { calculateAge, formatAddress, formatName } = useHook();

  return (
    <div>
      <div className="grid grid-cols-2 gap-[10px] mt-[10px] overflow-y-scroll max-h-[calc(90vh-350px)] px-[20px] py-[10px]">
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
          value={formatName(selectedAnc?.wife) || "" || undefined}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="อายุ"
          value={
            calculateAge(selectedAnc?.wife?.birthdatetime) || "" || undefined
          }
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="บัตรประชาชน"
          value={selectedAnc?.wife?.citizencardno || "" || undefined}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="เบอร์โทรศัพท์"
          value={selectedAnc?.wife?.pat_address?.phone || "" || undefined}
          type="text"
          readOnly
        />
        <Textarea
          size="sm"
          className="col-span-2"
          value={
            formatAddress(selectedAnc?.wife?.pat_address) || "" || undefined
          }
          label="ที่อยู่"
          readOnly
        />
        <Input
          size="sm"
          label="อาชีพ"
          value={
            selectedAnc?.wife?.occupation_detail?.lookupname || "" || undefined
          }
          type="text"
          readOnly
        />
        <Input
          size="sm"
          label="email"
          value={selectedAnc?.wife?.pat_address?.email || "" || undefined}
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
        <Input size="sm" label="BMI" value={bmi || ""} type="text" isReadOnly />
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
        <Input
          size="sm"
          label="PARA"
          type="text"
          name="para"
          value={field.para}
          onChange={handleChange}
        />
        <Input
          size="sm"
          label="G"
          type="text"
          name="g"
          value={field.g}
          onChange={handleChange}
        />
        <Input
          size="sm"
          label="P"
          type="text"
          name="p"
          value={field.p}
          onChange={handleChange}
        />
        <Input
          size="sm"
          label="A"
          type="text"
          name="a"
          value={field.a}
          onChange={handleChange}
        />
        <Input
          size="sm"
          label="LAST"
          type="text"
          name="last"
          value={field.last}
          onChange={handleChange}
        />
        <DatePicker
          size="sm"
          label="LMP"
          locale="th-TH-u-ca-buddhist"
          value={field.lmp ? parseDate(field.lmp) : null} // ถ้า null จะได้ null จริง ๆ
          onChange={handleLmpChange}
          placeholder="เลือกวันที่"
        />

        <DatePicker
          size="sm"
          label="EDC"
          isReadOnly
          locale="th-TH-u-ca-buddhist"
          value={field.edc ? parseDate(field.edc) : null}
          onChange={handleLmpChange}
        />

        <Input
          type="text"
          size="sm"
          label="อายุครรภ์"
          name="ga"
          value={field.ga ?? ""} // ปลอดภัยกว่า ใช้ ?? กัน null
          onChange={handleChange}
          readOnly
        />
      </div>
    </div>
  );
}
