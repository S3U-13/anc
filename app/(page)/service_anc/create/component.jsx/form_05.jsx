"use client";
import React from "react";
import useHook from "../useHook";
import { Radio, RadioGroup } from "@heroui/radio";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";

export default function page({
  field,
  setField,
  handleChange,
  coverageSite,
  handleChangeRefIn,
}) {
  const { data } = useHook();
  return (
    <div className="grid grid-cols-4 overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1>ส่วนที่ 5</h1>
      <RadioGroup
        className="col-span-4 px-[20px] mt-[10px]"
        label="ฝากครรภ์ครบตามเกนฑ์"
        value={field.anc_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "anc_id", value: val } })
        }
      >
        {data
          .filter((anc) => anc.choice_type_id === 13)
          .map((anc) => (
            <div
              key={anc.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio value={String(anc.id)}>{anc.choice_name}</Radio>
            </div>
          ))}
      </RadioGroup>
      <RadioGroup
        className="col-span-4 px-[20px] mt-[10px]"
        label="ตรวจสอบความครบถ้วนของบริการ ตามช่วงอายุครรภ์"
        value={field.usg_id}
        onValueChange={(val) =>
          handleChange({ target: { name: "usg_id", value: val } })
        }
      >
        {data
          .filter((usg) => usg.choice_type_id === 14)
          .map((usg) => (
            <div
              key={usg.id}
              className="flex gap-[10px] items-center px-[10px]"
            >
              <Radio value={String(usg.id)}>{usg.choice_name}</Radio>
            </div>
          ))}
      </RadioGroup>
      <CheckboxGroup
        className="col-span-4 px-[20px] mt-[10px]"
        label="การ Refer"
        value={[
          String(field.ref_1_id || ""),
          String(field.ref_2_id || ""),
        ].filter((v) => v)}
        onValueChange={handleChangeRefIn} // 👈 ใช้ฟังก์ชันเฉพาะ
      >
        {data
          .filter((ref_in) => ref_in.choice_type_id === 15)
          .map((ref_in) => (
            <div key={ref_in.id} className="px-[10px]">
              <Checkbox value={String(ref_in.id)}>
                {ref_in.choice_name}
              </Checkbox>

              {String(ref_in.id) === "40" &&
                [field.ref_1_id, field.ref_2_id].map(String).includes("40") && (
                  <RadioGroup
                    className="px-[25px]"
                    value={String(field.receive_in_id || "")}
                    onValueChange={(val) =>
                      handleChange({
                        target: { name: "receive_in_id", value: val },
                      })
                    }
                  >
                    {data
                      .filter((rec) => rec.choice_type_id === 17)
                      .map((rec) => (
                        <div key={rec.id} className="flex gap-[20px] items-center">
                          <Radio value={String(rec.id)}>
                            {rec.choice_name}
                          </Radio>
                          {String(rec.id) === "42" &&
                            field.receive_in_id === "42" && (
                              <Autocomplete
                                size="sm"
                                className="w-[470px]"
                                defaultItems={coverageSite}
                                label="รพช/รพสต"
                                placeholder="ค้นหา.."
                                scrollShadowProps={{ isEnabled: false }}
                                onSelectionChange={(key) =>
                                  handleChange({
                                    target: { name: "hos_in_id", value: key },
                                  })
                                }
                              >
                                {coverageSite?.map((hos) => (
                                  <AutocompleteItem key={hos.siteid}>
                                    {hos.sitedesc}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            )}
                        </div>
                      ))}
                  </RadioGroup>
                )}
              {String(ref_in.id) === "41" &&
                [field.ref_1_id, field.ref_2_id].map(String).includes("41") && (
                  <RadioGroup
                    className="px-[25px]"
                    value={String(field.receive_out_id || "")}
                    onValueChange={(val) =>
                      handleChange({
                        target: { name: "receive_out_id", value: val },
                      })
                    }
                  >
                    {data
                      .filter((rec) => rec.choice_type_id === 17)
                      .map((rec) => (
                        <div key={rec.id} className="flex gap-[20px] items-center">
                          <Radio value={String(rec.id)}>
                          {rec.choice_name}
                        </Radio>
                          {String(rec.id) === "42" &&
                            field.receive_out_id === "42" && (
                              <Autocomplete
                                size="sm"
                                className="w-[470px]"
                                defaultItems={coverageSite}
                                label="รพช/รพสต"
                                placeholder="ค้นหา.."
                                scrollShadowProps={{ isEnabled: false }}
                                onSelectionChange={(key) =>
                                  handleChange({
                                    target: { name: "hos_out_id", value: key },
                                  })
                                }
                              >
                                {coverageSite?.map((hos) => (
                                  <AutocompleteItem key={hos.siteid}>
                                    {hos.sitedesc}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            )}
                        </div>
                        
                      ))}
                  </RadioGroup>
                )}
            </div>
          ))}
      </CheckboxGroup>
    </div>
  );
}
