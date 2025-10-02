"use client";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import React from "react";
import useHook from "../useHook";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export default function page({
  field,
  setField,
  handleChange,
  handleChangeCbe,
  handleChangeBti,
}) {
  const { data } = useHook();

  // state สำหรับเก็บค่า checkbox

  // handleChange เวลา checkbox เปลี่ยน

  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 3</h1>
      <div className="grid grid-cols-4 gap-[10px] col-span-4 px-[30px]">
        <Input
          size="sm"
          className="col-span-2"
          label="วัคซีนบาดทะยัก ก่อนตั้งครรภ์เคยฉีดกี่ครั้ง"
          type="text"
          name="td_num"
          value={field.td_num}
          onChange={handleChange}
        />
        <DatePicker
          size="sm"
          className="col-span-2"
          label="ครั้งสุดท้ายวันที่"
          locale="th-TH-u-ca-buddhist"
          value={field.td_last_date ? parseDate(field.td_last_date) : null}
        />
      </div>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="ในระหว่างตั้งครรภ์"
        value={field.tdap_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "tdap_id", value: val } })
        }
      >
        {data
          .filter((tdap) => tdap.choice_type_id === 7)
          .map((tdap) => (
            <div key={tdap.id}>
              <Radio value={String(tdap.id)}>{tdap.choice_name}</Radio>
              {String(tdap.id) === "14" && field.tdap_id === "14" && (
                <div className="grid grid-cols-1 gap-[10px] mt-[10px] w-1/4">
                  <DatePicker
                    size="sm"
                    label="ครั้งที่ 1"
                    value={
                      field.tdap_round_1 ? parseDate(field.tdap_round_1) : null
                    }
                  />
                  <DatePicker
                    size="sm"
                    label="ครั้งที่ 2"
                    value={
                      field.tdap_round_2 ? parseDate(field.tdap_round_2) : null
                    }
                    
                  />
                  <DatePicker
                    size="sm"
                    label="ครั้งที่ 3"
                    value={
                      field.tdap_round_3 ? parseDate(field.tdap_round_3) : null
                    }
                   
                  />
                </div>
              )}
            </div>
          ))}
      </RadioGroup>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="ฉีกวัคซีนกระตุ้นครรภ์นี้"
        value={field.iip_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "iip_id", value: val } })
        }
      >
        {data
          .filter((iip) => iip.choice_type_id === 8)
          .map((iip) => (
            <div
              key={iip.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio value={String(iip.id)}>{iip.choice_name}</Radio>
              {String(iip.id) === "16" && field.iip_id === "16" && (
                <DatePicker
                  size="sm"
                  className="w-1/4"
                  label="วันที่"
                  value={field.iip_date ? parseDate(field.iip_date) : null}
                 
                />
              )}
            </div>
          ))}
      </RadioGroup>
      <div className="col-span-4 grid grid-cols-4 gap-[10px] px-[20px]">
        <h1 className="text-[#71717A] col-span-4">ค่า Lab 2</h1>
        <DatePicker
          size="sm"
          className="col-span-2 pl-[10px]"
          label="Lab 2 วันที่"
          value={field.lab_2 ? parseDate(field.lab_2) : null}
    
        />
        <Input
          size="sm"
          className="col-span-2 pr-[10px]"
          label="HCT"
          type="text"
          name="hct"
          value={field.hct}
          onChange={handleChange}
        />
        <Input
          size="sm"
          className="col-span-2 pl-[10px]"
          label="VDRL"
          type="text"
          name="vdrl_2"
          value={field.vdrl_2}
          onChange={handleChange}
        />
        <Input
          size="sm"
          className="col-span-2 pr-[10px]"
          label="H"
          type="text"
          name="h"
          value={field.h}
          onChange={handleChange}
        />
      </div>
      <CheckboxGroup
        className="col-span-4 px-[20px]"
        label="กลุ่มสัมพันธ์ เเละ ฟังผลเลือด"
        value={[
          String(field.bti_value_1_id || ""),
          String(field.bti_value_2_id || ""),
          String(field.bti_value_3_id || ""),
          String(field.bti_value_4_id || ""),
          String(field.bti_value_5_id || ""),
        ].filter((v) => v)} // กรอง empty string ออก
        onValueChange={handleChangeBti}
      >
        {data
          .filter((bti) => bti.choice_type_id === 9)
          .map((bti) => (
            <div
              key={bti.id}
              className="flex gap-[15px] items-center px-[10px]"
            >
              <Checkbox value={String(bti.id)}>{bti.choice_name}</Checkbox>
              {String(bti.id) === "18" &&
                [
                  field.bti_value_1_id,
                  field.bti_value_2_id,
                  field.bti_value_3_id,
                  field.bti_value_4_id,
                  field.bti_value_5_id,
                ]
                  .map((v) => String(v))
                  .includes("18") && (
                  <DatePicker
                    size="sm"
                    className="w-1/4"
                    label="วันที่"
                    value={
                      field.bti_1_date ? parseDate(field.bti_1_date) : null
                    }
                    
                  />
                )}
              {String(bti.id) === "19" &&
                [
                  field.bti_value_1_id,
                  field.bti_value_2_id,
                  field.bti_value_3_id,
                  field.bti_value_4_id,
                  field.bti_value_5_id,
                ]
                  .map((v) => String(v))
                  .includes("19") && (
                  <DatePicker
                    size="sm"
                    className="w-1/4"
                    label="วันที่"
                    value={
                      field.bti_2_date ? parseDate(field.bti_2_date) : null
                    }
                  
                  />
                )}
            </div>
          ))}
      </CheckboxGroup>
      <CheckboxGroup
        className="col-span-4 px-[20px]"
        label="ตรวจเต้านม, หัวนม"
        value={[
          String(field.cbe_value_1_id || ""),
          String(field.cbe_value_2_id || ""),
          String(field.cbe_value_3_id || ""),
          String(field.cbe_value_4_id || ""),
        ].filter((v) => v)}
        onValueChange={handleChangeCbe}
      >
        {data
          .filter((cbe) => cbe.choice_type_id === 10)
          .map((cbe) => (
            <div key={cbe.id} className=" px-[10px]">
              <Checkbox value={String(cbe.id)}>{cbe.choice_name}</Checkbox>
              {String(cbe.id) === "24" &&
                [
                  field.cbe_value_1_id,
                  field.cbe_value_2_id,
                  field.cbe_value_3_id,
                  field.cbe_value_4_id,
                ]
                  .map((v) => String(v))
                  .includes("24") && (
                  <RadioGroup
                    className="px-[25px]"
                    label=""
                    value={field.birads_id} // state ที่เก็บค่าที่เลือก
                    onValueChange={(val) =>
                      setField((prev) => ({ ...prev, birads_id: val }))
                    }
                  >
                    {data
                      .filter((birads) => birads.choice_type_id === 11)
                      .map((birads) => (
                        <Radio key={birads.id} value={String(birads.id)}>
                          {birads.choice_name}
                        </Radio>
                      ))}
                  </RadioGroup>
                )}
              {String(cbe.id) === "26" &&
                [
                  field.cbe_value_1_id,
                  field.cbe_value_2_id,
                  field.cbe_value_3_id,
                  field.cbe_value_4_id,
                ]
                  .map((v) => String(v))
                  .includes("26") && (
                  <Input
                    className="mt-[10px] w-1/2 px-[25px]"
                    size="sm"
                    label="ผลตรวจ"
                    type="text"
                    name="cbe_result"
                    value={field.cbe_result}
                    onChange={handleChange}
                  />
                )}
            </div>
          ))}
      </CheckboxGroup>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="ได้รับยา"
        value={field.per_os_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "per_os_id", value: val } })
        }
      >
        {data
          .filter((per_os) => per_os.choice_type_id === 12)
          .map((per_os) => (
            <div
              key={per_os.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio value={String(per_os.id)}>{per_os.choice_name}</Radio>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
}
