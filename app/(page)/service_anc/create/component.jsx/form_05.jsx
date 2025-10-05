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

export default function page({ field, setField, handleChange, coverageSite }) {
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
 
      <RadioGroup
        className="col-span-4 px-[20px] mt-[10px]"
        label="การ Refer"
        value={field.ref_in_id ?? null}
        onValueChange={(val) =>
          handleChange({ target: { name: "ref_in_id", value: val } })
        }
      >
        {(() => {
          const item = data.find((i) => i.id === 40);
          if (!item) return null;
          return (
            <div key={item.id} className="px-[10px]">
              <Radio value={String(item.id)}>{item.choice_name}</Radio>
              <RadioGroup
                className="col-span-4 px-[20px] mt-[10px]"
                value={field.receive_in_id}
                onValueChange={(val) =>
                  handleChange({
                    target: { name: "receive_in_id", value: val },
                  })
                }
              >
                {data
                  .filter(
                    (ref_in_choice) => ref_in_choice.choice_type_id === 16
                  )
                  .map((ref_in_choice) => (
                    <div
                      key={ref_in_choice.id}
                      className="flex gap-[10px] items-center px-[10px]"
                    >
                      <Radio value={String(ref_in_choice.id)}>
                        {ref_in_choice.choice_name}
                      </Radio>
                      {String(ref_in_choice.id) === "42" &&
                        field.receive_in_id === "42" && (
                          <div>
                            <Autocomplete
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
                          </div>
                        )}
                    </div>
                  ))}
              </RadioGroup>
            </div>
          );
        })()}
      </RadioGroup>

      <RadioGroup
        className="col-span-4 px-[20px] mt-[10px]"
        value={field.ref_out_id || null}
        onValueChange={(val) =>
          handleChange({ target: { name: "ref_out_id", value: val } })
        }
      >
        {(() => {
          const item = data.find((i) => i.id === 41);
          if (!item) return null;
          return (
            <div key={item.id} className="px-[10px]">
              <Radio value={String(item.id)}>{item.choice_name}</Radio>
              <RadioGroup
                className="col-span-4 px-[20px] mt-[10px]"
                value={field.receive_out_id}
                onValueChange={(val) =>
                  handleChange({
                    target: { name: "receive_out_id", value: val },
                  })
                }
              >
                {data
                  .filter(
                    (ref_out_choice) => ref_out_choice.choice_type_id === 16
                  )
                  .map((ref_out_choice) => (
                    <div
                      key={ref_out_choice.id}
                      className="flex gap-[10px] items-center px-[10px]"
                    >
                      <Radio value={String(ref_out_choice.id)}>
                        {ref_out_choice.choice_name}
                      </Radio>
                      {String(ref_out_choice.id) === "42" &&
                        field.receive_out_id === "42" && (
                          <div>
                            <Autocomplete
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
                          </div>
                        )}
                    </div>
                  ))}
              </RadioGroup>
            </div>
          );
        })()}
      </RadioGroup>

      <RadioGroup></RadioGroup>
    </div>
  );
}
