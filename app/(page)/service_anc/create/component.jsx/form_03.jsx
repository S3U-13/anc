"use client";
import { DatePicker } from "@heroui/date-picker";

import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import React from "react";
import useHook from "../useHook";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";

export default function page({
  handleChangeCbe,
  handleChangeBti,
  handleDateChange,
  validationSchema,
  form,
  selectedBti,
  selectedCbe,
  Dates,
}) {
  const { data } = useHook();

  // state สำหรับเก็บค่า checkbox

  // handleChange เวลา checkbox เปลี่ยน

  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 3</h1>
      <div className="grid grid-cols-4 gap-[10px] col-span-4 px-[30px]">
        <form.Field
          name="td_num"
          validationSchema={{ onChange: validationSchema.shape.td_num }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="วัคซีนบาดทะยัก ก่อนตั้งครรภ์เคยฉีดกี่ครั้ง"
              type="number"
              min={0}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            />
          )}
        </form.Field>

        <DatePicker
          size="sm"
          className="col-span-2"
          label="ครั้งสุดท้ายวันที่"
          locale="th-TH-u-ca-buddhist"
          value={Dates.td_last_date ? parseDate(Dates.td_last_date) : null}
          onChange={handleDateChange("td_last_date")}
        />
      </div>
      <form.Field
        name="tdap_id"
        validators={{
          onChange: validationSchema.shape.tdap_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ในระหว่างตั้งครรภ์"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
          >
            {data
              .filter((tdap) => tdap.choice_type_id === 7)
              .map((tdap) => (
                <div className="px-[10px]" key={tdap.id}>
                  <Radio value={String(tdap.id)}>{tdap.choice_name}</Radio>
                  {String(tdap.id) === "14" && field.state.value === "14" && (
                    <div className="grid grid-cols-1 gap-[10px] mt-[10px] w-1/4">
                      <DatePicker
                        size="sm"
                        label="ครั้งที่ 1"
                        value={
                          Dates.tdap_round_1
                            ? parseDate(Dates.tdap_round_1)
                            : null
                        }
                        onChange={handleDateChange("tdap_round_1")}
                      />
                      <DatePicker
                        size="sm"
                        label="ครั้งที่ 2"
                        value={
                          Dates.tdap_round_2
                            ? parseDate(Dates.tdap_round_2)
                            : null
                        }
                        onChange={handleDateChange("tdap_round_2")}
                      />
                      <DatePicker
                        size="sm"
                        label="ครั้งที่ 3"
                        value={
                          Dates.tdap_round_3
                            ? parseDate(Dates.tdap_round_3)
                            : null
                        }
                        onChange={handleDateChange("tdap_round_3")}
                      />
                    </div>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <form.Field
        name="iip_id"
        validators={{
          onChange: validationSchema.shape.iip_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ฉีกวัคซีนกระตุ้นครรภ์นี้"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
          >
            {data
              .filter((iip) => iip.choice_type_id === 8)
              .map((iip) => (
                <div
                  key={iip.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio value={String(iip.id)}>{iip.choice_name}</Radio>
                  {String(iip.id) === "16" && field.state.value === "16" && (
                    <DatePicker
                      size="sm"
                      className="w-1/4"
                      label="วันที่"
                      value={Dates.iip_date ? parseDate(Dates.iip_date) : null}
                      onChange={handleDateChange("iip_date")}
                    />
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>

      <div className="col-span-4 grid grid-cols-4 gap-[10px] px-[20px]">
        <h1 className="text-[#71717A] col-span-4">ค่า Lab 2</h1>
        <DatePicker
          size="sm"
          className="col-span-2 pl-[10px]"
          label="Lab 2 วันที่"
          value={Dates.lab_2 ? parseDate(Dates.lab_2) : null}
          onChange={handleDateChange("lab_2")}
        />
        <form.Field name="hct">
          {(field) => (
            <Input
              size="sm"
              className="col-span-2 pr-[10px]"
              label="HCT"
              type="text"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="vdrl_2">
          {(field) => (
            <Select
              size="sm"
              className="col-span-2 pl-[10px]"
              label="VDRL"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) => {
                const selected = Array.from(key)[0];
                field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
              }}
            >
              {data
                .filter((vdrl_wife) => vdrl_wife.choice_type_id === 18)
                .map((vdrl_wife) => (
                  <SelectItem key={vdrl_wife.id}>
                    {vdrl_wife.choice_name}
                  </SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="h">
          {(field) => (
            <Input
              size="sm"
              className="col-span-2 pr-[10px]"
              label="H"
              type="text"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>

      <CheckboxGroup
        className="col-span-4 px-[20px]"
        label="กลุ่มสัมพันธ์ และ ฟังผลเลือด"
        value={selectedBti}
        onValueChange={handleChangeBti}
      >
        {data
          .filter((bti) => bti.choice_type_id === 9)
          .map((bti) => {
            const isSelected = selectedBti.includes(String(bti.id));
            return (
              <div
                key={bti.id}
                className="flex gap-[15px] items-center px-[10px]"
              >
                <Checkbox value={String(bti.id)}>{bti.choice_name}</Checkbox>

                {/* DatePicker สำหรับ id 18 */}
                {bti.id === 18 && isSelected && (
                  <DatePicker
                    size="sm"
                    className="w-1/4"
                    label="วันที่"
                    value={
                      Dates.bti_1_date ? parseDate(Dates.bti_1_date) : null
                    }
                    onChange={handleDateChange("bti_1_date")}
                  />
                )}

                {/* DatePicker สำหรับ id 19 */}
                {bti.id === 19 && isSelected && (
                  <DatePicker
                    size="sm"
                    className="w-1/4"
                    label="วันที่"
                    value={
                      Dates.bti_2_date ? parseDate(Dates.bti_2_date) : null
                    }
                    onChange={handleDateChange("bti_2_date")}
                  />
                )}
              </div>
            );
          })}
      </CheckboxGroup>

      <CheckboxGroup
        className="col-span-4 px-[20px]"
        label="ตรวจเต้านม, หัวนม"
        value={selectedCbe}
        onValueChange={handleChangeCbe}
      >
        {data
          .filter((cbe) => cbe.choice_type_id === 10)
          .map((cbe) => {
            const isSelected = selectedCbe.includes(String(cbe.id));
            return (
              <div key={cbe.id} className=" px-[10px]">
                <Checkbox value={String(cbe.id)}>{cbe.choice_name}</Checkbox>
                {String(cbe.id) === "24" && isSelected && (
                  <form.Field name="birads_id">
                    {(field) => (
                      <RadioGroup
                        className="px-[25px]"
                        label=""
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                  </form.Field>
                )}
                {String(cbe.id) === "26" && isSelected && (
                  <form.Field name="cbe_result">
                    {(field) => (
                      <Input
                        className="mt-[10px] w-1/2 px-[25px]"
                        size="sm"
                        label="ผลตรวจ"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                )}
              </div>
            );
          })}
      </CheckboxGroup>
      <form.Field
        name="per_os_id"
        validators={{
          onChange: validationSchema.shape.per_os_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ได้รับยา"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
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
        )}
      </form.Field>
    </div>
  );
}
