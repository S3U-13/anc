"use client";
import React from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import useHook from "../useHook";
import { Input } from "@heroui/input";

export default function page({ field, setField, handleChange, selectedAnc }) {
  const { data, formatThaiDateTime } = useHook();
  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 2</h1>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="ประวัติการเเพ้ยา"
        value={field.ma_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "ma_id", value: val } })
        }
      >
        {data
          .filter((ma) => ma.choice_type_id === 1)
          .map((ma) => (
            <div key={ma.id} className="flex gap-[10px] items-center px-[10px]">
              <Radio classNames={{ label: "pl-1" }} value={String(ma.id)}>
                {ma.choice_name}
              </Radio>
              {String(ma.id) === "1" && field.ma_id === "1" && (
                <Input
                  className="w-[300px]"
                  size="sm"
                  label="ชื่อยาที่เคยแพ้"
                  name="ma_detail"
                  value={field.ma_detail || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
      </RadioGroup>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="HIGH RISK"
        value={field.hr_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "hr_id", value: val } })
        }
      >
        {data
          .filter((hr) => hr.choice_type_id === 2)
          .map((hr) => (
            <div key={hr.id} className="flex gap-[10px] items-center px-[10px]">
              <Radio classNames={{ label: "pl-1" }} value={String(hr.id)}>
                {hr.choice_name}
              </Radio>
              {String(hr.id) === "4" && field.hr_id === "4" && (
                <Input
                  className="w-[300px]"
                  size="sm"
                  label="ระบุ"
                  name="hr_detail"
                  value={field.hr_detail || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
      </RadioGroup>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="เเนะนำการเจาะน้ำคร่ำตรวจโครโมโซม"
        value={field.am_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "am_id", value: val } })
        }
      >
        {data
          .filter((am) => am.choice_type_id === 3)
          .map((am) => (
            <div key={am.id} className="flex gap-[10px] items-center px-[10px]">
              <Radio classNames={{ label: "pl-1" }} value={String(am.id)}>
                {am.choice_name}
              </Radio>
            </div>
          ))}
      </RadioGroup>
      <h1 className="col-span-4 text-[#71717A] px-[20px]">ค่า Lab</h1>
      <div className="col-span-4 px-[30px] grid grid-cols-4 gap-[10px]">
        <Input
          variant="flat"
          className="col-span-2"
          size="sm"
          label="WARD"
          value={selectedAnc?.wife?.pat_reg?.[0]?.Location?.detailtext ?? ""}
          type="text"
          readOnly
          disabled
        />
        <Input
          variant="flat"
          className="col-span-2"
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
          className="col-span-2"
          size="sm"
          label="GCT 1"
          type="text"
          name="gct_1_wife"
          value={field.gct_1_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="GCT 2"
          type="text"
          name="gct_2_wife"
          value={field.gct_2_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="OGTT 1"
          type="text"
          name="ogtt_1_wife"
          value={field.ogtt_1_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="OGTT 2"
          type="text"
          name="ogtt_2_wife"
          value={field.ogtt_2_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="HbsAg"
          type="text"
          name="hbsag_wife"
          value={field.hbsag_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="VDRL"
          type="text"
          name="vdrl_wife"
          value={field.vdrl_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="Anti HIV"
          type="text"
          name="anti_hiv_wife"
          value={field.anti_hiv_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="Hb Typing"
          type="text"
          name="hb_typing_wife"
          value={field.hb_typing_wife}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 px-[30px] grid grid-cols-3 gap-[10px]">
        <Input
          className="col-span-1 "
          size="sm"
          label="Bl.gr"
          type="text"
          name="bl_gr_wife"
          value={field.bl_gr_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-1 "
          size="sm"
          label="Rh"
          type="text"
          name="rh_wife"
          value={field.rh_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-1 "
          size="sm"
          label="Hct"
          type="text"
          name="hct_wife"
          value={field.hct_wife}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 grid px-[30px] grid-cols-4 gap-[10px] ">
        <Input
          className="col-span-2"
          size="sm"
          label="OF"
          type="text"
          name="of_wife"
          value={field.of_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="DCIP"
          type="text"
          name="dcip_wife"
          value={field.dcip_wife}
          onChange={handleChange}
        />
        <Input
          className="col-span-2"
          size="sm"
          label="MCV"
          type="text"
          name="mcv_wife"
          value={field.mcv_wife || ""}
          onValueChange={(val) =>
            setField((prev) => ({ ...prev, mcv_wife: val }))
          }
        />

        <Input
          className="col-span-2"
          size="sm"
          label="MCH"
          type="text"
          name="mch_wife"
          value={field.mch_wife || ""}
          onValueChange={(val) =>
            setField((prev) => ({ ...prev, mch_wife: val }))
          }
        />
      </div>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="PCR"
        value={field.pcr_wife_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "pcr_wife_id", value: val } })
        }
      >
        {data
          .filter((pcr) => pcr.choice_type_id === 4)
          .map((pcr) => (
            <div
              key={pcr.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio classNames={{ label: "pl-1" }} value={String(pcr.id)}>
                {pcr.choice_name}
              </Radio>
              {String(pcr.id) === "9" && field.pcr_wife_id === "9" && (
                <Input
                  className="w-[300px]"
                  size="sm"
                  label="ระบุ"
                  name="pcr_wife_text"
                  value={field.pcr_wife_text || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
      </RadioGroup>
      <RadioGroup
        className="col-span-4 px-[20px]"
        label="Cordo"
        value={field.cordo_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "cordo_id", value: val } })
        }
      >
        {data
          .filter((cordo) => cordo.choice_type_id === 5)
          .map((cordo) => (
            <div
              key={cordo.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio classNames={{ label: "pl-1" }} value={String(cordo.id)}>
                {cordo.choice_name}
              </Radio>
              {String(cordo.id) === "11" && field.cordo_id === "11" && (
                <Input
                  className="w-[300px]"
                  size="sm"
                  label="ผลตรวจ"
                  name="cordo_text"
                  value={field.cordo_text || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
      </RadioGroup>
      <Input
        className="col-span-4 px-[20px]"
        size="sm"
        label="อื่น"
        type="text"
        name="cordo_other_text"
        value={field?.cordo_other_text || ""}
        onChange={handleChange}
      />
      <RadioGroup
        className="col-span-4 px-[20px]"
        // label="เเนะนำการเจาะน้ำคร่ำตรวจโครโมโซม"
        value={field.abortion_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "abortion_id", value: val } })
        }
        orientation="horizontal"
      >
        {data
          .filter((abortion) => abortion.choice_type_id === 6)
          .map((abortion) => (
            <div
              key={abortion.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio classNames={{ label: "pl-1" }} value={String(abortion.id)}>
                {abortion.choice_name}
              </Radio>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
}
