"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import { Textarea } from "@heroui/input";
import useHook from "./useHook";

export default function page({
  openModal,
  closeModal,
  dataAncById,
  selectedAncId,
}) {
  const {
    handleSearchHnWife,
    hnInputWife,
    setHnInputWife,
    handleSearchHnHusband,
    hnInputHusband,
    setHnInputHusband,
    pat,
    patHusband,
    formatAddress,
    formatName,
    formatNameHusband,
    vitals,
    bmi,
    editVitalsign,
    handleEditChange,
    calculateAge,
    steps,
    activeStep,
    setActiveStep,
    form,
    validationSchema,
    isSubmitting,
  } = useHook({ openModal, closeModal, dataAncById, selectedAncId });
  return (
    <Modal
      className="dark:border dark:border-divider"
      classNames={{
        header:
          "flex justify-center border-b border-divider mt-[10px] mb-[10px] text-2xl",
        footer: "border-t border-divider",
      }}
      backdrop="blur"
      placement="center"
      size="3xl"
      scrollBehavior="inside"
      isOpen={openModal}
      onClose={closeModal}
    >
      <ModalContent>
        {(closeModal) => (
          <form>
            <ModalHeader>เเก้ไขทะเบียน ANC {dataAncById?.anc_no}</ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={activeStep}
                onSelectionChange={setActiveStep}
                variant="underlined"
                classNames={{
                  tabList: "mx-auto",
                  tab: "data-[selected=true]:border-b-4 data-[selected=true]:border-[#fb7185]",
                  tabContent: "p-1 px-6 rounded-lg",
                }}
                aria-label="Dynamic tabs"
              >
                <Tab disabled key="wife" title="ส่วนของภรรยา">
                  <div className="overflow-y-scroll sm:max-h-[calc(90vh-350px)]">
                    <div className="grid grid-cols-8 justify-between">
                      <h1 className="col-span-5">ส่วนของภรรยา</h1>
                      <div className="flex gap-[5px] items-center col-span-3 px-2">
                        <Input
                          value={hnInputWife}
                          onChange={(e) => setHnInputWife(e.target.value)}
                          size="sm"
                          label="Search HN"
                          type="search"
                          variant="bordered"
                        />
                        <Button
                          isIconOnly
                          aria-label="Search HN"
                          variant="flat"
                          onPress={handleSearchHnWife}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-[10px] mt-[15px] p-2">
                      <form.Field
                        name="hn_wife"
                        validators={{
                          onChange: validationSchema.shape.hn_wife,
                        }}
                      >
                        {(field) => (
                          <Input
                            size="sm"
                            label="HN"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            isInvalid={field.state.meta.errors.length > 0}
                            errorMessage={field.state.meta.errors[0]?.message}
                            type="text"
                          />
                        )}
                      </form.Field>
                      <form.Field name="sex">
                        {(field) => (
                          <Input
                            size="sm"
                            type="hidden"
                            label="sex"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>
                      <Input
                        size="sm"
                        label="ชื่อ"
                        value={formatName(pat) ?? ""}
                        type="text"
                        readOnly
                        disabled
                      />
                      <Input
                        size="sm"
                        label="อายุ"
                        type="text"
                        value={calculateAge(pat?.birthdatetime) ?? ""}
                        readOnly
                        disabled
                      />
                      <Input
                        size="sm"
                        label="บัตรประชาชน"
                        value={pat?.citizencardno ?? ""}
                        type="text"
                        readOnly
                        disabled
                      />
                      <Input
                        size="sm"
                        label="สัญชาติ"
                        value={pat?.race_text?.lookupname ?? ""}
                        type="text"
                        readOnly
                        disabled
                      />
                      <Input
                        size="sm"
                        label="อาชีพ"
                        value={pat?.occupation_detail?.lookupname ?? ""}
                        type="text"
                        readOnly
                        disabled
                      />
                      <form.Field name="wife_address">
                        {(field) => (
                          <Textarea
                            className="col-span-2"
                            label="ที่อยู่"
                            variant="bordered"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>
                      <form.Field name="wife_tel">
                        {(field) => (
                          <Input
                            size="sm"
                            label="เบอร์โทรศัพท์"
                            variant="bordered"
                            value={field.state.value}
                            type="text"
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>
                      <Input
                        size="sm"
                        label="email"
                        value={pat?.pat_address?.email ?? ""}
                        type="email"
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </Tab>
                <Tab disabled key="husband" title="ส่วนของสามี">
                  <div className="grid grid-cols-8 justify-between">
                    <h1 className="col-span-5">ส่วนของสามี</h1>
                    <div className="flex gap-[5px] items-center col-span-3">
                      <Input
                        size="sm"
                        label="Search HN"
                        type="search"
                        value={hnInputHusband}
                        onChange={(e) => setHnInputHusband(e.target.value)}
                        variant="bordered"
                      />
                      <Button
                        isIconOnly
                        aria-label="Search HN"
                        variant="flat"
                        onPress={handleSearchHnHusband}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px] mt-[15px] p-2">
                    <form.Field name="hn_husband">
                      {(field) => (
                        <Input
                          label="HN สามี"
                          size="sm"
                          value={field.state.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.handleChange(value === "" ? null : value);
                          }}
                          type="text"
                        />
                      )}
                    </form.Field>
                    <form.Field name="husband_name">
                      {(field) => (
                        <Input
                          label="ชื่อ สามี"
                          variant="bordered"
                          size="sm"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="text"
                        />
                      )}
                    </form.Field>
                    <form.Field name="husband_age">
                      {(field) => {
                        const realValue = field.state.value || ""; // number เช่น 23
                        const displayValue =
                          realValue !== "" ? `${realValue} ปี` : "";

                        return (
                          <Input
                            label="อายุ"
                            variant="bordered"
                            size="sm"
                            value={displayValue} // แสดง "23 ปี"
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^\d]/g,
                                ""
                              ); // ตัดตัวหนังสือ
                              field.handleChange(
                                value !== "" ? Number(value) : ""
                              ); // เก็บเป็น number
                            }}
                            type="text"
                          />
                        );
                      }}
                    </form.Field>
                    <form.Field name="husband_citizencardno">
                      {(field) => (
                        <Input
                          label="บัตรประชาชน"
                          variant="bordered"
                          size="sm"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="text"
                        />
                      )}
                    </form.Field>
                    <form.Field name="husband_race">
                      {(field) => (
                        <Input
                          size="sm"
                          label="สัญชาติ"
                          variant="bordered"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="text"
                        />
                      )}
                    </form.Field>
                    <form.Field name="husband_tel">
                      {(field) => (
                        <Input
                          size="sm"
                          label="เบอร์โทรศัพท์"
                          variant="bordered"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="text"
                        />
                      )}
                    </form.Field>
                    <Input
                      label="อาชีพ"
                      size="sm"
                      value={patHusband?.occupation_detail?.lookupname ?? ""}
                      type="text"
                      readOnly
                      disabled
                    />
                    <Input
                      label="email"
                      size="sm"
                      value={patHusband?.pat_address?.email ?? ""}
                      type="email"
                      readOnly
                      disabled
                    />
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="shadow"
                onPress={() => {
                  const idx = steps.indexOf(activeStep);
                  if (idx > 0) setActiveStep(steps[idx - 1]); // ย้อนกลับไป step ก่อนหน้า
                }}
                isDisabled={steps.indexOf(activeStep) === 0} // disable ถ้าอยู่ step แรก
              >
                กลับ
              </Button>
              <Button
                color="danger"
                onPress={async () => {
                  const idx = steps.indexOf(activeStep);
                  if (idx < steps.length - 1) {
                    // ถ้ายังไม่ถึง step สุดท้าย
                    setActiveStep(steps[idx + 1]);
                  } else {
                    // Step สุดท้าย → submit form
                    await form.handleSubmit(); // เรียก handleSubmit ของ useForm
                  }
                }}
                disabled={isSubmitting} // ป้องกันกดซ้ำ
              >
                {isSubmitting
                  ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                  : activeStep === steps[steps.length - 1]
                    ? "ยืนยัน"
                    : "ถัดไป"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
