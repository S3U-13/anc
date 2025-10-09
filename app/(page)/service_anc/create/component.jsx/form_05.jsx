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
import { DatePicker } from "@heroui/date-picker";

export default function page({
  field,
  setField,
  handleChange,
  coverageSite,
  handleChangeRefIn,
  selectedRef,
  form,
}) {
  const { data } = useHook();
  return (
    <div className="grid grid-cols-4 overflow-y-scrol px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 5</h1>
      <CheckboxGroup
        className="col-span-4 px-[20px] mt-[10px] min-h-[calc(80vh-400px)]"
        label="การ Refer"
        value={selectedRef}
        onValueChange={handleChangeRefIn} // 👈 ใช้ฟังก์ชันเฉพาะ
      >
        {data
          .filter((ref) => ref.choice_type_id === 15)
          .map((ref) => {
            const isSelected = selectedRef.includes(String(ref.id));
            return (
              <div key={ref.id} className="px-[10px]">
                <Checkbox value={String(ref.id)}>{ref.choice_name}</Checkbox>

                {String(ref.id) === "40" && isSelected && (
                  <form.Field name="receive_in_id">
                    {(field) => (
                      <RadioGroup
                        className="px-[25px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        {data
                          .filter((rec) => rec.choice_type_id === 16)
                          .map((rec) => (
                            <div
                              key={rec.id}
                              className="flex gap-[20px] items-center"
                            >
                              <Radio value={String(rec.id)}>
                                {rec.choice_name}
                              </Radio>
                              {String(rec.id) === "42" &&
                                field.state.value === "42" && (
                                  <form.Field name="hos_in_id">
                                    {(field) => (
                                      <Autocomplete
                                        size="sm"
                                        className="w-[470px]"
                                        defaultItems={coverageSite}
                                        label="รพช/รพสต"
                                        placeholder="ค้นหา.."
                                        scrollShadowProps={{ isEnabled: false }}
                                        onSelectionChange={(key) =>
                                          field.handleChange(key)
                                        }
                                      >
                                        {coverageSite?.map((hos) => (
                                          <AutocompleteItem key={hos.siteid}>
                                            {hos.sitedesc}
                                          </AutocompleteItem>
                                        ))}
                                      </Autocomplete>
                                    )}
                                  </form.Field>
                                )}
                            </div>
                          ))}
                      </RadioGroup>
                    )}
                  </form.Field>
                )}
                {String(ref.id) === "41" && isSelected && (
                  <form.Field name="receive_out_id">
                    {(field) => (
                      <RadioGroup
                        className="px-[25px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        {data
                          .filter((rec) => rec.choice_type_id === 16)
                          .map((rec) => (
                            <div
                              key={rec.id}
                              className="flex gap-[20px] items-center"
                            >
                              <Radio value={String(rec.id)}>
                                {rec.choice_name}
                              </Radio>
                              {String(rec.id) === "42" &&
                                field.state.value === "42" && (
                                  <form.Field name="hos_out_id">
                                    {(field) => (
                                      <Autocomplete
                                        size="sm"
                                        className="w-[470px]"
                                        defaultItems={coverageSite}
                                        label="รพช/รพสต"
                                        placeholder="ค้นหา.."
                                        scrollShadowProps={{ isEnabled: false }}
                                        onSelectionChange={(key) =>
                                          field.handleChange(key)
                                        }
                                      >
                                        {coverageSite?.map((hos) => (
                                          <AutocompleteItem key={hos.siteid}>
                                            {hos.sitedesc}
                                          </AutocompleteItem>
                                        ))}
                                      </Autocomplete>
                                    )}
                                  </form.Field>
                                )}
                            </div>
                          ))}
                      </RadioGroup>
                    )}
                  </form.Field>
                )}
              </div>
            );
          })}
      </CheckboxGroup>
    </div>
  );
}
