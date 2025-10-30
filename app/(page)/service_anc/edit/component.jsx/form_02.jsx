"use client";
import React from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import useHook from "../useHook";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

export default function page({
  validationSchema,
  form,
}) {
  const { data, } = useHook();
  return (
    <div className="grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)] px-[20px] py-[10px]">
      <h1 className="col-span-4">ส่วนที่ 2</h1>
      <form.Field
        name="ma_id"
        validators={{ onChange: validationSchema.shape.ma_id }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="ประวัติการแพ้ยา"
            value={field.state.value || ""}
            onValueChange={(val) => field.handleChange(val)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
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
                    <form.Field
                      name="ma_detail"
                      validators={{
                        onChange: validationSchema.shape.ma_detail,
                      }}
                    >
                      {(subField) => (
                        <Input
                          label="ชื่อยาที่เคยแพ้"
                          className="w-[300px]"
                          size="sm"
                          value={subField.state.value || ""}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          onBlur={subField.handleBlur}
                          isInvalid={subField.state.meta.errors.length > 0}
                          errorMessage={subField.state.meta.errors[0]?.message}
                        />
                      )}
                    </form.Field>
                  )}
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <form.Field
        name="hr_id"
        validators={{
          onChange: validationSchema.shape.hr_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="HIGH RISK"
            value={field.state.value || ""} // ค่าปัจจุบันของ form
            onValueChange={(val) => field.handleChange(val)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
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
                    <form.Field
                      name="hr_detail"
                      validators={{
                        onChange: validationSchema.shape.hr_detail,
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
      <form.Field
        name="am_id"
        validators={{
          onChange: validationSchema.shape.am_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="เเนะนำการเจาะน้ำคร่ำตรวจโครโมโซม"
            value={field.state.value || ""} // ค่าปัจจุบันของ form
            onValueChange={(val) => field.handleChange(val)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
          >
            {data
              .filter((am) => am.choice_type_id === 3)
              .map((am) => (
                <div
                  key={am.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
                  <Radio classNames={{ label: "pl-1" }} value={String(am.id)}>
                    {am.choice_name}
                  </Radio>
                </div>
              ))}
          </RadioGroup>
        )}
      </form.Field>
      <h1 className="col-span-4 text-[#71717A] px-[20px]">ค่า Lab</h1>
      <div className="col-span-4 px-[30px] grid grid-cols-4 gap-[10px]">
        <form.Field
          name="gct_1_wife"
          validators={{
            onChange: validationSchema.shape.gct_1_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="GCT 1"
              type="text"
              name="gct_1_wife"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            />
          )}
        </form.Field>
        <form.Field
          name="gct_2_wife"
          validators={{
            onChange: validationSchema.shape.gct_2_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="GCT 2"
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
          name="ogtt_1_wife"
          validators={{
            onChange: validationSchema.shape.ogtt_1_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="OGTT 1"
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
          name="ogtt_2_wife"
          validators={{
            onChange: validationSchema.shape.ogtt_2_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
              label="OGTT 2"
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
          name="hbsag_wife"
          validators={{
            onChange: validationSchema.shape.hbsag_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="Hbs Ag"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            >
              {data
                .filter((hbsag) => hbsag.choice_type_id === 17)
                .map((hbsag) => (
                  <SelectItem key={hbsag.id}>{hbsag.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field
          name="vdrl_wife"
          validators={{
            onChange: validationSchema.shape.vdrl_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="VDRL"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
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
        <form.Field
          name="anti_hiv_wife"
          validators={{
            onChange: validationSchema.shape.anti_hiv_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="Anti-hiv"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
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
        <form.Field
          name="hb_typing_wife"
          validators={{
            onChange: validationSchema.shape.hb_typing_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
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
      </div>
      <div className="col-span-4 px-[30px] grid grid-cols-3 gap-[10px]">
        <form.Field
          name="bl_gr_wife"
          validators={{
            onChange: validationSchema.shape.bl_gr_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              label="Bl.gr"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            >
              {data
                .filter((bl_gr) => bl_gr.choice_type_id === 20)
                .map((bl_gr) => (
                  <SelectItem key={bl_gr.id}>{bl_gr.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field
          name="rh_wife"
          validators={{
            onChange: validationSchema.shape.rh_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-1"
              label="rh"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            >
              {data
                .filter((rh) => rh.choice_type_id === 21)
                .map((rh) => (
                  <SelectItem key={rh.id}>{rh.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field
          name="hct_wife"
          validators={{
            onChange: validationSchema.shape.hct_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-1 "
              size="sm"
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
      <div className="col-span-4 grid px-[30px] grid-cols-4 gap-[10px] ">
        <form.Field
          name="of_wife"
          validators={{
            onChange: validationSchema.shape.of_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
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
          name="dcip_wife"
          validators={{
            onChange: validationSchema.shape.dcip_wife,
          }}
        >
          {(field) => (
            <Select
              size="sm"
              className="col-span-2"
              label="DCIP"
              selectedKeys={
                field.state.value ? new Set([field.state.value]) : new Set()
              }
              onSelectionChange={(key) =>
                field.handleChange(Array.from(key)[0])
              }
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors[0]?.message}
            >
              {data
                .filter((dcip) => dcip.choice_type_id === 22)
                .map((dcip) => (
                  <SelectItem key={dcip.id}>{dcip.choice_name}</SelectItem>
                ))}
            </Select>
          )}
        </form.Field>
        <form.Field
          name="mcv_wife"
          validators={{
            onChange: validationSchema.shape.mcv_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
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
          name="mch_wife"
          validators={{
            onChange: validationSchema.shape.mch_wife,
          }}
        >
          {(field) => (
            <Input
              className="col-span-2"
              size="sm"
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
        name="pcr_wife_id"
        validators={{
          onChange: validationSchema.shape.pcr_wife_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
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
                  <Radio classNames={{ label: "pl-1" }} value={String(pcr.id)}>
                    {pcr.choice_name}
                  </Radio>
                  {String(pcr.id) === "9" && field.state.value === "9" && (
                    <form.Field
                      name="pcr_wife_text"
                      validators={{
                        onChange: validationSchema.shape.pcr_wife_text,
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
      <form.Field
        name="cordo_id"
        validators={{
          onChange: validationSchema.shape.cordo_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            label="Cordo"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
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
                    <form.Field
                      name="cordo_text"
                      validators={{
                        onChange: validationSchema.shape.cordo_text,
                      }}
                    >
                      {(subField) => (
                        <Input
                          className="w-[300px]"
                          size="sm"
                          label="ผลตรวจ"
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

      <form.Field name="cordo_other_text">
        {(field) => (
          <Input
            className="col-span-4 px-[20px]"
            size="sm"
            label="อื่น"
            type="text"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <form.Field
        name="abortion_id"
        validators={{
          onChange: validationSchema.shape.abortion_id,
        }}
      >
        {(field) => (
          <RadioGroup
            className="col-span-4 px-[20px]"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
            errorMessage={field.state.meta.errors[0]?.message}
            orientation="horizontal"
          >
            {data
              .filter((abortion) => abortion.choice_type_id === 6)
              .map((abortion) => (
                <div
                  key={abortion.id}
                  className="flex gap-[10px] items-center px-[10px]"
                >
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
