"use client";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import useHook from "../useHook";

export default function page({
  selectedAnc,
  field,
  setField,
  handleChange,
  validationSchema,
  form,
}) {
  const { data, calculateAge, formatName } = useHook();
  return (
    <div className="overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1>ส่วนที่ 4</h1>
      <div className="grid grid-cols-4 gap-[10px] px-[30px] mt-[10px]">
        <Input
          size="sm"
          className="col-span-2"
          label="HN สามี"
          value={selectedAnc?.hn_husband || ""}
          type="text"
        />
        <Input
          size="sm"
          className="col-span-2"
          label="ชื่อสามี"
          value={formatName(selectedAnc?.husband) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อายุ"
          value={calculateAge(selectedAnc?.husband?.birthdatetime) || ""}
          type="text"
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="บัตรประชาชน"
          type="text"
          value={selectedAnc?.husband?.citizencardno || ""}
        />
        <Input
          size="sm"
          className="col-span-2"
          label="อาชีพ"
          type="text"
          value={selectedAnc?.husband?.occupation_detail?.lookupname || ""}
          readOnly
        />
        <Input
          size="sm"
          className="col-span-2"
          label="email"
          type="email"
          value={selectedAnc?.husband?.pat_address?.email || ""}
          readOnly
        />
        <form.Field
          name="hbsag_husband"
          validators={{
            onChange: validationSchema.shape.hbsag_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="HbsAg"
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
          name="vdrl_husband"
          validators={{
            onChange: validationSchema.shape.vdrl_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="VDRL"
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
          name="anti_hiv_husband"
          validators={{
            onChange: validationSchema.shape.anti_hiv_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="Anti HIV"
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
          name="hb_typing_husband"
          validators={{
            onChange: validationSchema.shape.hb_typing_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="Hb Typing"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            />
          )}
        </form.Field>

        <div className="col-span-4 grid grid-cols-3 gap-[10px]">
          <form.Field
            name="bl_gr_husband"
            validators={{
              onChange: validationSchema.shape.bl_gr_husband,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="Bl.gr"
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
            name="rh_husband"
            validators={{
              onChange: validationSchema.shape.rh_husband,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="Rh"
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
            name="hct_husband"
            validators={{
              onChange: validationSchema.shape.hct_husband,
            }}
          >
            {(field) => (
              <Input
                size="sm"
                className="col-span-1"
                label="Hct"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </div>
        <form.Field
          name="of_husband"
          validators={{
            onChange: validationSchema.shape.of_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="OF"
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
          name="dcip_husband"
          validators={{
            onChange: validationSchema.shape.dcip_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="DCIP"
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
          name="mcv_husband"
          validators={{
            onChange: validationSchema.shape.mch_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="MCV"
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
          name="mch_husband"
          validators={{
            onChange: validationSchema.shape.mch_husband,
          }}
        >
          {(field) => (
            <Input
              size="sm"
              className="col-span-2"
              label="MCH"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <form.Field
        name="pcr_hus_id"
        validators={{
          onChange: validationSchema.shape.pcr_hus_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px] mt-[10px]"
            label="PCR"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
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
                    <form.Field
                      name="pcr_hus_text"
                      validators={{
                        onChange: validationSchema.shape.pcr_hus_text,
                      }}
                    >
                      {(subField) => (
                        <Input
                          className="w-[300px]"
                          size="sm"
                          label="ระบุ"
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
