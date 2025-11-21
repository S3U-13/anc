"use client";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import useHook from "../useHook";
import { Select, SelectItem } from "@heroui/select";
import { AlertOctagon } from "@deemlol/next-icons";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export default function page({ selectedAnc, form }) {
  const { data, calculateAge, formatName, Dates, handleDateChange } = useHook();
  return (
    <div className="overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1>ส่วนที่ 4</h1>
      <div className="grid grid-cols-4 gap-[10px] px-[30px] mt-[10px]">
        {!selectedAnc?.hn_husband && !selectedAnc?.husband_name && (
          <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center col-span-4">
            <AlertOctagon className="animate-pulse" size={20} />
            <span className="text-lg">ไม่พบข้อมูลสามี</span>
          </div>
        )}
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="HN สามี"
          value={selectedAnc?.hn_husband ?? ""}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="ชื่อสามี"
          value={selectedAnc?.husband_name || ""}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="อายุ"
          value={selectedAnc?.husband_age ?? ""}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="บัตรประชาชน"
          type="text"
          value={selectedAnc?.husband_citizencardno ?? ""}
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="สัญชาติ"
          type="text"
          value={selectedAnc?.husband_race ?? ""}
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="อาชีพ"
          type="text"
          value={selectedAnc?.husband?.occupation_detail?.lookupname ?? ""}
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="เบอร์โทรศัพท์"
          type="email"
          value={selectedAnc?.husband_tel ?? ""}
          readOnly
          disabled
        />
        <Input
          size="sm"
          className="col-span-4 md:col-span-2"
          label="email"
          type="email"
          value={selectedAnc?.husband?.pat_address?.email ?? ""}
          readOnly
          disabled
        />
        <form.Field name="hbsag_husband">
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
        <form.Field name="vdrl_husband">
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
                }}
                color={field.state.value === "47" ? "warning" : "default"}
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
                <div className="col-span-4 grid grid-cols-2 gap-2">
                  <form.Field name="ppr_husband">
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
                  <form.Field name="tpha_husband">
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
                  <form.Field name="treatment_detail_husband">
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
                        Dates.vac_lab_date_1_husband
                          ? parseDate(Dates.vac_lab_date_1_husband)
                          : null
                      }
                      onChange={handleDateChange("vac_lab_date_1_husband")}
                    />
                    <DatePicker
                      label="ครั้งที่ 1"
                      size="sm"
                      color="warning"
                      variant="flat"
                      value={
                        Dates.vac_lab_date_2_husband
                          ? parseDate(Dates.vac_lab_date_2_husband)
                          : null
                      }
                      onChange={handleDateChange("vac_lab_date_2_husband")}
                    />
                    <DatePicker
                      label="ครั้งที่ 1"
                      size="sm"
                      color="warning"
                      variant="flat"
                      value={
                        Dates.vac_lab_date_3_husband
                          ? parseDate(Dates.vac_lab_date_3_husband)
                          : null
                      }
                      onChange={handleDateChange("vac_lab_date_3_husband")}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </form.Field>
        <form.Field name="anti_hiv_husband">
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
        <form.Field name="hb_typing_husband">
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="Hb Typing"
              variant="bordered"
              type="text"
              value={field.state.value ?? ""} // ✅ null → ""
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <div className="col-span-4 grid grid-cols-3 gap-[10px]">
          <form.Field name="bl_gr_husband">
            {(field) => (
              <Select
                size="sm"
                className="col-span-1"
                label="Bl.gr"
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
                  .filter((bl_gr) => bl_gr.choice_type_id === 20)
                  .map((bl_gr) => (
                    <SelectItem key={bl_gr.id}>{bl_gr.choice_name}</SelectItem>
                  ))}
              </Select>
            )}
          </form.Field>
          <form.Field name="rh_husband">
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
          <form.Field name="hct_husband">
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="Hct"
                variant="bordered"
                type="text"
                value={field.state.value ?? ""} // ✅ null → ""
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>
        <div className="grid grid-cols-4 gap-2 col-span-4">
          <form.Field name="of_husband">
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
          <form.Field name="dcip_husband">
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
          <form.Field name="mcv_husband">
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="MCV"
                variant="bordered"
                type="text"
                value={field.state.value ?? ""} // ✅ null → ""
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="mch_husband">
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="MCH"
                variant="bordered"
                type="text"
                value={field.state.value ?? ""} // ✅ null → ""
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>
      </div>

      <form.Field name="pcr_hus_id">
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px] mt-[10px]"
            label="PCR"
            value={field.state.value ?? ""} // ✅ null → ""
            onChange={(e) => field.handleChange(e.target.value)}
          >
            {data
              .filter((pcr) => pcr.choice_type_id === 4)
              .map((pcr) => (
                <div
                  key={pcr.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio value={String(pcr.id)}>{pcr.choice_name}</Radio>
                  {String(pcr.id) === "9" && field.state.value === "9" && (
                    <form.Field name="pcr_hus_text">
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
    </div>
  );
}
