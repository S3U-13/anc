"use client";
import React from "react";
import useHook from "../useHook";
import { Radio, RadioGroup } from "@heroui/radio";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export default function page({ field, setField, handleChange }) {
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
        value={field.ref_in_id ? [String(field.ref_in_id)] : []}
        onValueChange={(valArray) => {
          console.log("Ref In selected values:", valArray);
          setField((prev) => ({
            ...prev,
            ref_in_id: valArray.length > 0 ? valArray[0] : null,
          }));
        }}
      >
        {data
          .filter((item) => item.id === 40) // map แค่ id 40
          .map((item) => (
            <div key={item.id} className="px-[10px]">
              <Checkbox value={String(item.id)}>{item.choice_name}</Checkbox>
              <RadioGroup
                label=""
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
                            <Select
                              size="sm"
                              classNames={{ base: "w-[300px]" }}
                              label="รพช/รพสต"
                            >
                              {animals.map((animal) => (
                                <SelectItem key={animal.key}>
                                  {animal.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                    </div>
                  ))}
              </RadioGroup>
            </div>
          ))}
      </CheckboxGroup>

      {/* Ref Out */}
      <CheckboxGroup
        className="col-span-4 px-[20px] mt-[10px]"
        value={field.ref_out_id ? [String(field.ref_out_id)] : []}
        onValueChange={(valArray) => {
          console.log("Ref Out selected values:", valArray);
          setField((prev) => ({
            ...prev,
            ref_out_id: valArray.length > 0 ? valArray[0] : null,
          }));
        }}
      >
        {data
          .filter((item) => item.id === 41) // map แค่ id 41
          .map((item) => (
            <div key={item.id} className="px-[10px]">
              <Checkbox value={String(item.id)}>{item.choice_name}</Checkbox>
              <RadioGroup
                label=""
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
                            <Select
                              classNames={{ base: "w-[300px]" }}
                              label="รพช/รพสต"
                            >
                              {animals.map((animal) => (
                                <SelectItem key={animal.key}>
                                  {animal.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                    </div>
                  ))}
              </RadioGroup>
            </div>
          ))}
      </CheckboxGroup>
    </div>
  );
}
