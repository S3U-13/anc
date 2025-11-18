"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import useHook from "../useHook";

export default function page({
  handleLmpChange,
  handleEditChange,
  vitals,
  editVitalsign,
  bmi,
  validationSchema,
  form,
  currentData,
}) {
  const { calculateAge, formatAddress, formatName } = useHook();

  return (
    <div>
      <div className="grid grid-cols-2 gap-[10px] mt-[10px] overflow-y-scroll max-h-[calc(90vh-350px)] px-[20px] py-[10px]">
        <div className="col-span-1">
          <strong>ID : </strong>
          <span>{currentData?.service_info.id || ""}</span>
        </div>
        <div className="col-span-1">
          <strong>รอบที่ : </strong>
          <span>{currentData?.service_info.round || ""}</span>
        </div>
        <form.Field
          name="anc_no"
          validators={{
            onChange: validationSchema.shape.anc_no,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              label="ANC NO"
              type="text"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              readOnly
              disabled
            />
          )}
        </form.Field>
        <form.Field name="patreg_id">
          {(field) => (
            <Input
              size="sm"
              label="PAT REG ID"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              readOnly
              disabled
            />
          )}
        </form.Field>
        <form.Field name="patvisit_id">
          {(field) => (
            <Input
              size="sm"
              label="PAT VISIT ID"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              readOnly
              disabled
            />
          )}
        </form.Field>

        <Input
          size="sm"
          label="HN"
          type="text"
          value={currentData?.wife.profile.hn || ""}
          readOnly
          disabled
        />
        {/* value={`${selectedAnc?.prename}${selectedAnc?.firstname} ${selectedAnc?.lastname}` || ""} */}
        <Input
          size="sm"
          label="ชื่อ"
          value={formatName(currentData?.wife.profile) || "" || undefined}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          label="อายุ"
          value={
            calculateAge(currentData?.wife?.profile.birthdatetime) ||
            "" ||
            undefined
          }
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          label="บัตรประชาชน"
          value={currentData?.wife?.profile.citizencardno || "" || undefined}
          type="text"
          readOnly
          disabled
        />
        <Input
          size="sm"
          label="สัญชาติ"
          className="col-span-2 md:col-span-1"
          value={
            currentData?.wife?.profile?.race_text?.lookupname || "" || undefined
          }
          type="text"
          readOnly
          disabled
        />

        <Textarea
          size="sm"
          className="col-span-2"
          value={currentData?.service_info?.wife_address || "" || undefined}
          label="ที่อยู่"
          readOnly
          disabled
        />
        <div className="grid grid-cols-1 md:grid-cols-3 col-span-2 gap-2">
          <Input
            size="sm"
            label="เบอร์โทรศัพท์"
            value={currentData?.service_info?.wife_tel || "" || undefined}
            type="text"
            readOnly
            disabled
          />
          <Input
            size="sm"
            label="อาชีพ"
            value={
              currentData?.wife?.profile.occupation_detail?.lookupname ||
              "" ||
              undefined
            }
            type="text"
            readOnly
            disabled
          />
          <Input
            size="sm"
            label="email"
            value={
              currentData?.wife?.profile.pat_address?.email || "-" || undefined
            }
            type="email"
            readOnly
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 col-span-2 gap-2">
          <form.Field name="prep_weight">
            {(field) => (
              <Input
                size="sm"
                label="น้ำหนักก่อนตั้งครรภ์"
                variant="bordered"
                name="weight"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                maxLength={5}
                type="text"
              />
            )}
          </form.Field>
          <Input
            size="sm"
            label="น้ำหนัก"
            variant="bordered"
            name="weight"
            value={editVitalsign.weight}
            onValueChange={(value) => handleEditChange("weight", value)}
            type="text"
          />
          <Input
            size="sm"
            label="ส่วนสูง"
            variant="bordered"
            name="height"
            value={editVitalsign.height}
            onValueChange={(value) => handleEditChange("height", value)}
            type="text"
          />
          <Input
            size="sm"
            label="BMI"
            value={bmi || ""}
            type="text"
            readOnly
            disabled
          />
        </div>
        <div className="grid grid-cols-3 col-span-2 gap-2">
          <Input
            size="sm"
            label="ความดันโลหิต"
            value={
              vitals?.bp_systolic && vitals?.bp_diastolic
                ? `${vitals.bp_systolic}/${vitals.bp_diastolic} mmHg`
                : ""
            }
            type="text"
            readOnly
            disabled
          />
          <Input
            size="sm"
            label="ชีพจร (ครั้ง/นาที)"
            value={`${vitals?.pulse ?? "-"} ครั้ง/นาที`}
            type="text"
            readOnly
            disabled
          />

          <Input
            size="sm"
            label="อุณหภูมิ (°C)"
            value={`${vitals?.temperature ?? "-"} °C`}
            type="text"
            readOnly
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 col-span-2 gap-2">
          <form.Field
            name="para"
            validators={{
              onChange: validationSchema.shape.para,
            }}
          >
            {(field) => {
              // ฟังก์ชันจัดรูปแบบค่าให้เป็น 0-0-0-0
              const formatPara = (value) => {
                // เอาเฉพาะตัวเลข
                const digits = value.replace(/\D/g, "");

                // ใส่ - ทุกตัวหลังจากเลข 1, 2, 3 ตัว
                const parts = digits.match(/.{1,1}/g) || [];
                return parts.join("-").slice(0, 7); // จำกัดแค่รูปแบบ 0-0-0-0
              };

              const handleChange = (e) => {
                const formatted = formatPara(e.target.value);
                field.handleChange(formatted);
              };

              return (
                <Input
                  size="sm"
                  label="PARA"
                  type="text"
                  variant="bordered"
                  value={field.state.value}
                  onChange={handleChange}
                  onBlur={field.handleBlur}
                  isInvalid={field.state.meta.errors.length > 0}
                  errorMessage={field.state.meta.errors[0]?.message}
                  maxLength={7} // เช่น "0-0-0-0"
                  placeholder="0-0-0-0"
                />
              );
            }}
          </form.Field>
          <form.Field
            name="gravida"
            validators={{
              onChange: validationSchema.shape.gravida,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                label="G"
                variant="bordered"
                type="text"
                name="g"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field
            name="p"
            validators={{
              onChange: validationSchema.shape.p,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                label="P"
                variant="bordered"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field
            name="a"
            validators={{
              onChange: validationSchema.shape.a,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                label="a"
                variant="bordered"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field
            name="last"
            validators={{
              onChange: validationSchema.shape.last,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                label="LAST"
                variant="bordered"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field
            name="lmp"
            validators={{
              onChange: validationSchema.shape.lmp,
            }}
          >
            {(field) => (
              <DatePicker
                size="sm"
                label="LMP"
                variant="bordered"
                locale="th-TH-u-ca-buddhist"
                value={field.state.value ? parseDate(field.state.value) : null}
                onChange={handleLmpChange}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
                placeholder="เลือกวันที่"
                withinPortal={false}
              />
            )}
          </form.Field>

          <form.Field
            name="edc"
            validators={{
              onChange: validationSchema.shape.edc,
            }}
          >
            {(field) => (
              <DatePicker
                size="sm"
                label="EDC"
                variant="bordered"
                isReadOnly
                locale="th-TH-u-ca-buddhist"
                value={field.state.value ? parseDate(field.state.value) : null}
                onChange={() => {}} // ปิดการแก้ไข
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>

          <form.Field
            name="ga"
            validators={{
              onChange: validationSchema.shape.ga,
            }}
          >
            {(field) => (
              <Input
                type="text"
                size="sm"
                label="อายุครรภ์"
                variant="bordered"
                value={field.state.value ?? ""}
                readOnly
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
