"use client";
import React from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import useHook from "../useHook";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export default function page({
  validationSchema,
  Dates,
  form,
  handleDateChange,
  setDates,
  handleMaChange,
  handleHrChange,
  handlePcrWifeChange,
  handleCordoChange,
  handleAmChange,
}) {
  const { data, formatThaiDateTime } = useHook();
  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 2</h1>
      <form.Field name="patient_drug_allergy">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ประวัติการแพ้ยา"
            value={field.state.value || ""}
            onChange={(e) => handleMaChange(e, field)}
          >
            {data
              .filter((ma) => ma.choice_type_id === 1)
              .map((ma) => (
                <div
                  key={ma.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio classNames={{ label: "pl-1" }} value={String(ma.id)}>
                    {ma.choice_name}
                  </Radio>

                  {/* แสดง Input ถ้าเลือก "แพ้ยา" */}
                  {String(ma.id) === "1" && field.state.value === "1" && (
                    <form.Field name="patient_drug_allergy_detail">
                      {(subField) => (
                        <Input
                          label="ชื่อยาที่เคยแพ้"
                          className="w-[300px]"
                          size="sm"
                          variant="bordered"
                          value={subField.state.value || ""}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
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
      <form.Field name="high_risk">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="HIGH RISK"
            value={field.state.value || ""} // ค่าปัจจุบันของ form
            onChange={(e) => handleHrChange(e, field)}
          >
            {data
              .filter((hr) => hr.choice_type_id === 2)
              .map((hr) => (
                <div
                  key={hr.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio classNames={{ label: "pl-1" }} value={String(hr.id)}>
                    {hr.choice_name}
                  </Radio>
                  {String(hr.id) === "4" && field.state.value === "4" && (
                    <form.Field name="high_risk_detail">
                      {(subField) => (
                        <Input
                          className="w-[300px]"
                          size="sm"
                          label="ระบุ"
                          variant="bordered"
                          value={subField.state.value || ""} // ค่าปัจจุบันของ form
                          onValueChange={(val) => subField.handleChange(val)}
                        />
                      )}
                    </form.Field>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>

      <h1 className="col-span-4 text-[#71717A] px-[20px]">ค่า Lab</h1>
      <div className="col-span-4 px-[30px] grid grid-cols-4 gap-[10px]">
        <form.Field name="gct_1">
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="GCT 1"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="gct_2">
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="GCT 2"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="ogtt_1">
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="OGTT 1"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="ogtt_2">
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="OGTT 2"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="wife_hbsag_result">
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="Hbs Ag"
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
                .filter((hbsag) => hbsag.choice_type_id === 17)
                .map((hbsag) => (
                  <SelectItem key={hbsag.id}>{hbsag.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_vdrl_result">
          {(field) => (
            <>
              <Select
                size="sm"
                className="col-span-2"
                label="VDRL"
                variant="bordered"
                selectedKeys={
                  field.state.value ? new Set([field.state.value]) : new Set()
                }
                onSelectionChange={(key) => {
                  const selected = Array.from(key)[0];
                  field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
                  if (String(selected) === "46") {
                    form.setFieldValue("wife_ppr_result", "");
                    form.setFieldValue("wife_tpha_result", "");
                    form.setFieldValue("wife_treatment_detail", "");
                    form.setFieldValue("wife_treatment_date_1", null);
                    form.setFieldValue("wife_treatment_date_2", null);
                    form.setFieldValue("wife_treatment_date_3", null);
                    setDates((prev) => ({
                      ...prev,
                      wife_treatment_date_1: null,
                      wife_treatment_date_2: null,
                      wife_treatment_date_3: null,
                    }));
                  }
                }}
                color={field.state.value === "47" ? "warning" : "default"}
              >
                {data
                  .filter((item) => item.choice_type_id === 18)
                  .map((item) => (
                    <SelectItem key={item.id}>{item.choice_name}</SelectItem>
                  ))}
              </Select>

              {String(field.state.value) === "47" && (
                <div className="col-span-4 grid grid-cols-2 gap-2">
                  <form.Field name="wife_ppr_result">
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
                  <form.Field name="wife_tpha_result">
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
                  <form.Field name="wife_treatment_detail">
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
                        Dates.wife_treatment_date_1
                          ? parseDate(Dates.wife_treatment_date_1)
                          : null
                      }
                      onChange={handleDateChange("wife_treatment_date_1")}
                    />

                    <DatePicker
                      label="ครั้งที่ 2"
                      size="sm"
                      color="warning"
                      variant="flat"
                      value={
                        Dates.wife_treatment_date_2
                          ? parseDate(Dates.wife_treatment_date_2)
                          : null
                      }
                      onChange={handleDateChange("wife_treatment_date_2")}
                    />

                    <DatePicker
                      label="ครั้งที่ 3"
                      size="sm"
                      color="warning"
                      variant="flat"
                      value={
                        Dates.wife_treatment_date_3
                          ? parseDate(Dates.wife_treatment_date_3)
                          : null
                      }
                      onChange={handleDateChange("wife_treatment_date_3")}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </form.Field>

        <form.Field name="wife_anti_hiv_result">
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="Anti-hiv"
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
                .filter((anti_hiv) => anti_hiv.choice_type_id === 19)
                .map((anti_hiv) => (
                  <SelectItem key={anti_hiv.id}>
                    {anti_hiv.choice_name}
                  </SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_hb_typing">
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="Hb Typing"
              variant="bordered"
              type="text"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>
      <div className="col-span-4 px-[30px] grid grid-cols-3 gap-[10px]">
        <form.Field name="wife_abo_group">
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              variant="bordered"
              label="Bl.gr"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) => {
                const selected = Array.from(key)[0];
                field.handleChange(selected ?? null); // ถ้าไม่เลือกให้เป็น null
              }}
            >
              {data
                .filter((bl_gr) => bl_gr.choice_type_id === 20)
                .map((bl_gr) => (
                  <SelectItem key={bl_gr.id}>{bl_gr.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_rh_factor">
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              label="rh"
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
                .filter((rh) => rh.choice_type_id === 21)
                .map((rh) => (
                  <SelectItem key={rh.id}>{rh.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_hct_value">
          {(field) => (
            <Input
              className="col-span-1 "
              size="sm"
              label="Hct"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>
      <div className="col-span-4 grid px-[30px] grid-cols-4 gap-[10px] ">
        <form.Field name="wife_of_value">
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              label="OF"
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
                .filter((of) => of.choice_type_id === 22)
                .map((of) => (
                  <SelectItem key={of.id}>{of.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_dcip_result">
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              label="DCIP"
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
                .filter((dcip) => dcip.choice_type_id === 22)
                .map((dcip) => (
                  <SelectItem key={dcip.id}>{dcip.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field name="wife_mcv_value">
          {(field) => (
            <Input
              className="col-span-1"
              size="sm"
              label="MCV"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="wife_mch_value">
          {(field) => (
            <Input
              className="col-span-1"
              size="sm"
              label="MCH"
              type="text"
              variant="bordered"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>
      <form.Field name="pcr_tested">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="PCR"
            value={field.state.value}
            onChange={(e) => handlePcrWifeChange(e, field)}
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
                  {String(pcr.id) === "9" && field.state.value === "9" && (
                    <form.Field name="pcr_result">
                      {(subField) => (
                        <Input
                          className="w-[300px]"
                          size="sm"
                          label="ระบุ"
                          variant="bordered"
                          value={subField.state.value || ""} // ค่าปัจจุบันของ form
                          onValueChange={(val) => subField.handleChange(val)}
                        />
                      )}
                    </form.Field>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <form.Field name="cordocentesis_plan">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="Cordo"
            value={field.state.value}
            onChange={(e) => handleCordoChange(e, field)}
          >
            {data
              .filter((cordo) => cordo.choice_type_id === 5)
              .map((cordo) => (
                <div
                  key={cordo.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio
                    classNames={{ label: "pl-1" }}
                    value={String(cordo.id)}
                  >
                    {cordo.choice_name}
                  </Radio>
                  {String(cordo.id) === "11" && field.state.value === "11" && (
                    <form.Field name="cordocentesis_detail">
                      {(subField) => (
                        <Input
                          className="w-[300px]"
                          size="sm"
                          label="ผลตรวจ"
                          variant="bordered"
                          value={subField.state.value || ""} // ค่าปัจจุบันของ form
                          onValueChange={(val) => subField.handleChange(val)}
                        />
                      )}
                    </form.Field>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>

      <form.Field name="other">
        {(field) => (
          <Input
            className="col-span-4 px-[20px] w-full md:w-1/2"
            size="sm"
            label="อื่น"
            type="text"
            variant="bordered"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="amniocentesis_plan">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="เเนะนำการเจาะน้ำคร่ำตรวจโครโมโซม"
            value={field.state.value || ""} // ค่าปัจจุบันของ form
            onChange={(e) => handleAmChange(e, field)}
          >
            {data
              .filter((am) => am.choice_type_id === 3)
              .map((am) => (
                <div
                  key={am.id}
                  className="md:flex gap-[10px] grid grid-cols-1 items-center px-[10px]"
                >
                  <Radio classNames={{ label: "pl-1" }} value={String(am.id)}>
                    {am.choice_name}
                  </Radio>
                  {String(am.id) === "5" && field.state.value === "5" && (
                    <form.Field name="am_reason_checked">
                      {(field) => (
                        <Input
                          className="w-full md:w-1/2"
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(am.id) === "6" && field.state.value === "6" && (
                    <form.Field name="am_reason_not_checked">
                      {(field) => (
                        <Input
                          className="w-full md:w-1/2"
                          label="ระบุ"
                          size="sm"
                          variant="bordered"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  )}
                  {String(am.id) === "7" && field.state.value === "7" && (
                    <form.Field name="am_reason_consult">
                      {(field) => (
                        <Input
                          className="w-full md:w-1/2"
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

      <form.Field name="pregnancy_status">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            orientation="horizontal"
            label="การเเท้ง"
          >
            {data
              .filter((abortion) => abortion.choice_type_id === 6)
              .map((abortion) => (
                <div key={abortion.id} className="px-[10px]">
                  <Radio
                    classNames={{ label: "pl-1" }}
                    value={String(abortion.id)}
                  >
                    {abortion.choice_name}
                  </Radio>
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
    </div>
  );
}
