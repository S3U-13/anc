import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import useHook from "../useHook";

export default function page({ selectedAnc }) {
  const { data, field, handleChange } = useHook();
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
  return (
    <div className="overflow-y-scroll max-h-[calc(90vh-300px)]">
      <h1>ส่วนที่ 4</h1>
      <div className="grid grid-cols-4 gap-[10px] px-[30px] mt-[10px]">
        <Input
          size="sm"
          className="col-span-2"
          label="HN สามี"
          value={selectedAnc?.hn_husband || ""}
          type="text"
        />
        <Input
          size="sm"
          className="col-span-2"
          label="ชื่อสามี"
          value={formatName(selectedAnc?.husband) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อายุ"
          value={calculateAge(selectedAnc?.husband?.birthdatetime) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="บัตรประชาชน"
          type="text"
          value={selectedAnc?.husband?.citizencardno || ""}
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อาชีพ"
          type="text"
          value={selectedAnc?.husband?.occupation_detail.lookupname || ""}
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="email"
          type="email"
          value={selectedAnc?.husband?.pat_address.email || ""}
          readOnly
        />
        <Input size="sm" className="col-span-2" label="HbsAg" type="text" />
        <Input size="sm" className="col-span-2" label="VDRL" type="text" />
        <Input size="sm" className="col-span-2" label="Anti HIV" type="text" />
        <Input size="sm" className="col-span-2" label="Hb Typing" type="text" />
        <div className="col-span-4 grid grid-cols-3 gap-[10px]">
          <Input size="sm" className="col-span-1" label="Bl.gr" type="text" />
          <Input size="sm" className="col-span-1" label="Rh" type="text" />
          <Input size="sm" className="col-span-1" label="Hct" type="text" />
        </div>
        <Input size="sm" className="col-span-2" label="OF" type="text" />
        <Input size="sm" className="col-span-2" label="DCIP" type="text" />
        <Input size="sm" className="col-span-2" label="MCV" type="text" />
        <Input size="sm" className="col-span-2" label="MCH" type="text" />
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
