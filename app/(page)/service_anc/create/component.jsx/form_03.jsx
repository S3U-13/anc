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
  setDates,
  handleVaccineChange,
  handleTdapChange,
  handleIipChange,
  handleBiradsChange,
  handlePerOsChange,
}) {
  const { data } = useHook();

  // state สำหรับเก็บค่า checkbox

  // handleChange เวลา checkbox เปลี่ยน

  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 3</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] col-span-4 px-[30px]">
        <form.Field name="vaccination_his">
          {(field) => (
            <Input
              size="sm"
              className="col-span-1"
              label="วัคซีนบาดทะยัก ก่อนตั้งครรภ์เคยฉีดกี่ครั้ง"
              type="text"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="forget_or_remember_date_vaccination">
          {(field) => (
            <>
              <Select
                label="คนไข้จำวันฉีดได้/จำไม่ได้"
                size="sm"
                variant="bordered"
                selectedKeys={
                  field.state.value ? new Set([field.state.value]) : new Set()
                }
                onSelectionChange={(key) => {
                  const selected = Array.from(key)[0];
                  field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
                  if (String(selected) === "65") {
                    setDates((prev) => ({
                      ...prev,
                      td_last_date: null,
                    }));
                  }
                  if (String(selected) === "66") {
                    form.setFieldValue("td_forget_date", "");
                  }
                }}
              >
                {data
                  .filter((rm) => rm.choice_type_id === 25)
                  .map((rm) => (
                    <SelectItem key={rm.id}>{rm.choice_name}</SelectItem>
                  ))}
              </Select>
              {String(field.state.value) === "65" && (
                <DatePicker
                  size="sm"
                  className="col-span-1 "
                  label="ครั้งสุดท้ายวันที่"
                  locale="th-TH-u-ca-buddhist"
                  variant="bordered"
                  value={
                    Dates.last_vaccination_date
                      ? parseDate(Dates.last_vaccination_date)
                      : null
                  }
                  onChange={handleDateChange("last_vaccination_date")}
                />
              )}
              {String(field.state.value) === "66" && (
                <form.Field name="forget_last_vaccination_date">
                  {(field) => (
                    <Input
                      label="ระบุ"
                      size="sm"
                      variant="bordered"
                      placeholder="ประมาณ เช่น มากกว่า 10 ปี หรือ > 10 ปี"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
              )}
            </>
          )}
        </form.Field>
      </div>
      <form.Field name="vaccine_type">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="วัคซีน"
            value={field.state.value ?? ""}
            onChange={(e) => handleVaccineChange(e, field)}
          >
            {data
              .filter((vaccine) => vaccine.choice_type_id === 23)
              .map((vaccine) => (
                <div
                  key={vaccine.id}
                  className="grid grid-cols-1 md:flex gap-2 items-center px-[10px]"
                >
                  <Radio className="w-40" value={String(vaccine.id)}>
                    <p className="pl-1">{vaccine.choice_name}</p>
                  </Radio>
                  {String(vaccine.id) === "58" &&
                    field.state.value === "58" && (
                      <div className="grid grid-col-1 md:flex gap-2 item-center w-full">
                        <form.Field name="influenza_reason">
                          {(field) => (
                            <Input
                              label="ระบุเหตุผล"
                              size="sm"
                              variant="bordered"
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          )}
                        </form.Field>

                        <DatePicker
                          className="w-full md:w-1/3"
                          label="ระบุวัน"
                          size="sm"
                          variant="bordered"
                          value={
                            Dates.influenza_appointment_date
                              ? parseDate(Dates.influenza_appointment_date)
                              : null
                          }
                          onChange={handleDateChange(
                            "influenza_appointment_date"
                          )}
                        />
                      </div>
                    )}
                  {String(vaccine.id) === "59" &&
                    field.state.value === "59" && (
                      <div className="grid grid-col-1 md:flex gap-2 item-center w-full">
                        <form.Field name="ap_reason">
                          {(field) => (
                            <Input
                              label="ระบุเหตุผล"
                              size="sm"
                              variant="bordered"
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          )}
                        </form.Field>

                        <DatePicker
                          className="w-full md:w-1/3"
                          label="ระบุวัน"
                          size="sm"
                          variant="bordered"
                          value={
                            Dates.ap_appointment_date
                              ? parseDate(Dates.ap_appointment_date)
                              : null
                          }
                          onChange={handleDateChange("ap_appointment_date")}
                        />
                      </div>
                    )}
                  {String(vaccine.id) === "60" &&
                    field.state.value === "60" && (
                      <div className="grid grid-col-1 md:flex gap-2 item-center w-full">
                        <form.Field name="t_dap_reason">
                          {(field) => (
                            <Input
                              label="ระบุเหตุผล"
                              size="sm"
                              variant="bordered"
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          )}
                        </form.Field>

                        <DatePicker
                          className="w-full md:w-1/3"
                          label="ระบุวัน"
                          size="sm"
                          variant="bordered"
                          value={
                            Dates.t_dap_appointment_date
                              ? parseDate(Dates.t_dap_appointment_date)
                              : null
                          }
                          onChange={handleDateChange("t_dap_appointment_date")}
                        />
                      </div>
                    )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <form.Field name="received_during_preg">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ในระหว่างตั้งครรภ์"
            value={field.state.value}
            onChange={(e) => handleTdapChange(e, field)}
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
                        variant="bordered"
                        value={
                          Dates.first_appointment
                            ? parseDate(Dates.first_appointment)
                            : null
                        }
                        onChange={handleDateChange("first_appointment")}
                      />
                      <DatePicker
                        size="sm"
                        label="ครั้งที่ 2"
                        variant="bordered"
                        value={
                          Dates.second_appointment
                            ? parseDate(Dates.second_appointment)
                            : null
                        }
                        onChange={handleDateChange("second_appointment")}
                      />
                      <DatePicker
                        size="sm"
                        label="ครั้งที่ 3"
                        variant="bordered"
                        value={
                          Dates.third_appointment
                            ? parseDate(Dates.third_appointment)
                            : null
                        }
                        onChange={handleDateChange("third_appointment")}
                      />
                    </div>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <form.Field name="booster_during_preg">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ฉีกวัคซีนกระตุ้นครรภ์นี้"
            value={field.state.value}
            onChange={(e) => handleIipChange(e, field)}
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
                      variant="bordered"
                      value={
                        Dates.booster_during_preg_date
                          ? parseDate(Dates.booster_during_preg_date)
                          : null
                      }
                      onChange={handleDateChange("booster_during_preg_date")}
                    />
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>

      <div className="col-span-4 px-[20px]">
        <h1 className="text-[#71717A]">ค่า Lab 2</h1>
        <div className="grid grid-cols-4 gap-[10px] p-2">
          <DatePicker
            size="sm"
            className="col-span-2"
            label="Lab 2 วันที่"
            variant="bordered"
            value={Dates.lab_2_date ? parseDate(Dates.lab_2_date) : null}
            onChange={handleDateChange("lab_2_date")}
          />
          <form.Field name="wife_hct_lab_2">
            {(field) => (
              <Input
                size="sm"
                className="col-span-2 "
                label="HCT"
                variant="bordered"
                type="text"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="wife_vdrl_lab_2">
            {(field) => (
              <>
                <Select
                  size="sm"
                  className="col-span-2 "
                  label="VDRL"
                  variant="bordered"
                  selectedKeys={
                    field.state.value ? new Set([field.state.value]) : new Set()
                  }
                  onSelectionChange={(key) => {
                    const selected = Array.from(key)[0];
                    field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
                    if (String(selected) === "46") {
                      form.setFieldValue("wife_ppr_result_lab_2", "");
                      form.setFieldValue("wife_tpha_result_lab_2", "");
                      form.setFieldValue("wife_lab_2_treatment_detail", "");
                      form.setFieldValue("wife_lab_2_treatment_date_1", null);
                      form.setFieldValue("wife_lab_2_treatment_date_2", null);
                      form.setFieldValue("wife_lab_2_treatment_date_3", null);
                      setDates((prev) => ({
                        ...prev,
                        wife_lab_2_treatment_date_1: null,
                        wife_lab_2_treatment_date_2: null,
                        wife_lab_2_treatment_date_3: null,
                      }));
                    }
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
                {String(field.state.value) === "47" && (
                  <>
                    <form.Field name="wife_ppr_result_lab_2">
                      {(field) => (
                        <Input
                          label="PPR*"
                          size="sm"
                          color="warning"
                          variant="flat"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <form.Field name="wife_tpha_result_lab_2">
                      {(field) => (
                        <Input
                          label="TPHA*"
                          size="sm"
                          color="warning"
                          variant="flat"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <div className="grid grid-cols-1 col-span-4 gap-2">
                      <form.Field name="wife_lab_2_treatment_detail">
                        {(field) => (
                          <Input
                            className="col-span-2"
                            label="การรักษา*"
                            size="sm"
                            color="warning"
                            variant="flat"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>

                      <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <DatePicker
                          label="ครั้งที่ 1"
                          size="sm"
                          color="warning"
                          variant="flat"
                          value={
                            Dates.wife_lab_2_treatment_date_1
                              ? parseDate(Dates.wife_lab_2_treatment_date_1)
                              : null
                          }
                          onChange={handleDateChange(
                            "wife_lab_2_treatment_date_1"
                          )}
                        />
                        <DatePicker
                          label="ครั้งที่ 2"
                          size="sm"
                          color="warning"
                          variant="flat"
                          value={
                            Dates.wife_lab_2_treatment_date_2
                              ? parseDate(Dates.wife_lab_2_treatment_date_2)
                              : null
                          }
                          onChange={handleDateChange(
                            "wife_lab_2_treatment_date_2"
                          )}
                        />
                        <DatePicker
                          label="ครั้งที่ 3"
                          size="sm"
                          color="warning"
                          variant="flat"
                          value={
                            Dates.wife_lab_2_treatment_date_3
                              ? parseDate(Dates.wife_lab_2_treatment_date_3)
                              : null
                          }
                          onChange={handleDateChange(
                            "wife_lab_2_treatment_date_3"
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </form.Field>
          <form.Field name="wife_anti_hiv_lab_2">
            {(field) => (
              <Select
                size="sm"
                className="col-span-2 "
                label="HIV"
                variant="bordered"
                selectedKeys={
                  field.state.value ? new Set([field.state.value]) : new Set()
                }
                onSelectionChange={(key) => {
                  const selected = Array.from(key)[0];
                  field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
                }}
              >
                {data
                  .filter((hiv_wife_2) => hiv_wife_2.choice_type_id === 19)
                  .map((hiv_wife_2) => (
                    <SelectItem key={hiv_wife_2.id}>
                      {hiv_wife_2.choice_name}
                    </SelectItem>
                  ))}
              </Select>
            )}
          </form.Field>
        </div>
      </div>
      <form.Field name="blood_test_result">
        {(field) => (
          <CheckboxGroup
            className="col-span-4 px-[20px]"
            label="กลุ่มสัมพันธ์ และ ฟังผลเลือด"
            value={field.state.value || []}
            onValueChange={(values) => {
              field.handleChange(values);
              form.setFieldValue("blood_test_result", values);
            }}
          >
            {data
              .filter((bti) => bti.choice_type_id === 9)
              .map((bti) => (
                <div
                  key={bti.id}
                  className="flex gap-[15px] items-center px-[10px]"
                >
                  <Checkbox value={String(bti.id)}>{bti.choice_name}</Checkbox>

                  {/* DatePicker สำหรับ id 18 */}
                  {bti.id === 18 && field.state.value?.includes(18) && (
                    <DatePicker
                      size="sm"
                      className="w-full md:w-1/4"
                      label="วันที่"
                      variant="bordered"
                      value={
                        Dates.bti_1_date ? parseDate(Dates.bti_1_date) : null
                      }
                      onChange={handleDateChange("bti_1_date")}
                    />
                  )}

                  {/* DatePicker สำหรับ id 19 */}
                  {bti.id === 19 && field.state.value?.includes(19) && (
                    <DatePicker
                      size="sm"
                      className="w-full md:w-1/4"
                      label="วันที่"
                      variant="bordered"
                      value={
                        Dates.bti_2_date ? parseDate(Dates.bti_2_date) : null
                      }
                      onChange={handleDateChange("bti_2_date")}
                    />
                  )}
                </div>
              ))}
          </CheckboxGroup>
        )}
      </form.Field>
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
                  <form.Field name="bi_rads_id">
                    {(field) => (
                      <RadioGroup
                        className="px-[25px]"
                        label=""
                        value={field.state.value}
                        onChange={(e) => handleBiradsChange(e, field)}
                      >
                        {data
                          .filter((birads) => birads.choice_type_id === 11)
                          .map((birads) => (
                            <div
                              key={birads.id}
                              className="grid grid-cols-1 md:flex items-center gap-2"
                            >
                              <Radio className="w-40" value={String(birads.id)}>
                                <p className="pl-1">{birads.choice_name}</p>
                              </Radio>
                              {String(birads.id) === "27" &&
                                field.state.value === "27" && (
                                  <form.Field name="bi_rads_left_detail">
                                    {(field) => (
                                      <Input
                                        label="ระบุ"
                                        size="sm"
                                        variant="bordered"
                                        value={field.state.value || ""}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                      />
                                    )}
                                  </form.Field>
                                )}
                              {String(birads.id) === "28" &&
                                field.state.value === "28" && (
                                  <form.Field name="bi_rads_right_detail">
                                    {(field) => (
                                      <Input
                                        label="ระบุ"
                                        size="sm"
                                        variant="bordered"
                                        value={field.state.value || ""}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                      />
                                    )}
                                  </form.Field>
                                )}
                              {String(birads.id) === "29" &&
                                field.state.value === "29" && (
                                  <form.Field name="bi_rads_both_sides_detail">
                                    {(field) => (
                                      <Input
                                        label="ระบุ"
                                        size="sm"
                                        variant="bordered"
                                        value={field.state.value || ""}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                      />
                                    )}
                                  </form.Field>
                                )}
                            </div>
                          ))}
                      </RadioGroup>
                    )}
                  </form.Field>
                )}
                {String(cbe.id) === "26" && isSelected && (
                  <form.Field name="anc_pap_smear_detail">
                    {(field) => (
                      <Input
                        className="mt-[10px] w-full md:w-1/2 px-[25px]"
                        size="sm"
                        label="ผลตรวจ"
                        variant="bordered"
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
      <form.Field name="received_medicine">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ได้รับยา"
            value={field.state.value}
            onChange={(e) => handlePerOsChange(e, field)}
          >
            {data
              .filter((per_os) => per_os.choice_type_id === 12)
              .map((per_os) => (
                <div
                  key={per_os.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio className="w-40" value={String(per_os.id)}>
                    <p className="pl-1">{per_os.choice_name}</p>
                  </Radio>
                  {String(per_os.id) === "30" && field.state.value === "30" && (
                    <form.Field name="iodine_reason">
                      {(field) => (
                        <Input
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(per_os.id) === "31" && field.state.value === "31" && (
                    <form.Field name="iron_reason">
                      {(field) => (
                        <Input
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(per_os.id) === "32" && field.state.value === "32" && (
                    <form.Field name="folic_reason">
                      {(field) => (
                        <Input
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(per_os.id) === "63" && field.state.value === "63" && (
                    <form.Field name="amoxicillin_reason">
                      {(field) => (
                        <Input
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(per_os.id) === "64" && field.state.value === "64" && (
                    <form.Field name="utrogestan_reason">
                      {(field) => (
                        <Input
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
    </div>
  );
}
