'use client';
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import useHook from "../useHook";

export default function page({ selectedAnc, field, setField, handleChange }) {
  const { data, calculateAge, formatName } = useHook();
  return (
    <div className="overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1>ส่วนที่ 4</h1>
      <div className="grid grid-cols-4 gap-[10px] px-[30px] mt-[10px]">
        <Input
          size="sm"
          className="col-span-2"
          label="HN สามี"
          value={selectedAnc?.hn_husband || "" || undefined || null}
          type="text"
        />
        <Input
          size="sm"
          className="col-span-2"
          label="ชื่อสามี"
          value={formatName(selectedAnc?.husband) || "" || undefined || null}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อายุ"
          value={calculateAge(selectedAnc?.husband?.birthdatetime) || "" || undefined || null}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="บัตรประชาชน"
          type="text"
          value={selectedAnc?.husband?.citizencardno || "" || undefined || null}
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อาชีพ"
          type="text"
          value={selectedAnc?.husband?.occupation_detail?.lookupname || "" || undefined || null}
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="email"
          type="email"
          value={selectedAnc?.husband?.pat_address?.email || "" || undefined || null}
          readOnly
        />
        <Input size="sm" className="col-span-2" label="HbsAg" type="text" name="hbsag_husband" value={field.hbsag_husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="VDRL" type="text" name="vdrl__husband" value={field.vdrl__husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="Anti HIV" type="text" name="anti_hiv_husband" value={field.anti_hiv_husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="Hb Typing" type="text" name="hb_typing_husband" value={field.hb_typing_husband} onChange={handleChange}/>
        <div className="col-span-4 grid grid-cols-3 gap-[10px]">
          <Input size="sm" className="col-span-1" label="Bl.gr" type="text" name="bl_gr_husband" value={field.bl_gr_husband} onChange={handleChange}/>
          <Input size="sm" className="col-span-1" label="Rh" type="text" name="rh_husband" value={field.rh_husband} onChange={handleChange}/>
          <Input size="sm" className="col-span-1" label="Hct" type="text" name="hct_husband" value={field.hct_husband} onChange={handleChange}/>
        </div>
        <Input size="sm" className="col-span-2" label="OF" type="text" name="of_husband" value={field.of_husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="DCIP" type="text" name="dcip_husband" value={field.dcip_husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="MCV" type="text" name="mcv_husband" value={field.mcv_husband} onChange={handleChange}/>
        <Input size="sm" className="col-span-2" label="MCH" type="text" name="mch_husband" value={field.mch_husband} onChange={handleChange}/>
      </div>

      <RadioGroup
        className="col-span-4 px-[20px] mt-[10px]"
        label="PCR"
        value={field.pcr_hus_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "pcr_hus_id", value: val } })
        }
      >
        {data
          .filter((pcr) => pcr.choice_type_id === 4)
          .map((pcr) => (
            <div
              key={pcr.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio value={String(pcr.id)}>{pcr.choice_name}</Radio>
              {String(pcr.id) === "9" && field.pcr_hus_id === "9" && (
                <Input
                  className="w-[300px]"
                  size="sm"
                  label="ระบุ"
                  name="pcr_hus_text"
                  value={field.pcr_hus_text || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
      </RadioGroup>
    </div>
  );
}
