"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";

import AncData from "../pull_anc/page";
import ResetValue from "./component.jsx/modal_reset_value";
import Form01 from "./component.jsx/form_01";
import Form02 from "./component.jsx/form_02";
import Form03 from "./component.jsx/form_03";
import Form04 from "./component.jsx/form_04";
import Form05 from "./component.jsx/form_05";
import useHook from "./useHook";

export default function page({
  openFormService,
  closeFormService,
  setOpenFormService,
}) {
  const [pullAnc, setPullAnc] = useState(false);

  const pullHandle = () => {
    setPullAnc((prev) => !prev);
  };

  const [ModalResetValue, SetModalResetValue] = useState(false);

  const resetHandle = () => {
    SetModalResetValue((prev) => !prev);
  };

  const {
    selectedAnc,
    setSelectedAnc,
    handleReset,
    steps,
    activeStep,
    setActiveStep,
    field,
    setField,
    handleChange,
    handleLmpChange,
    handleChangeCbe,
    handleChangeBti,
    handleEditChange,
    editVitalsign,
    vitals,
    bmi,
    coverageSite,
    handleSubmit,
    handleDateChange,
    isSubmitting,
    handleChangeRefIn,
    form,
    validationSchema,
    selectedBti,
    selectedCbe,
    Dates,
    selectedRef,
    modalRef,
  } = useHook({ closeFormService });

  return (
    <div>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={openFormService}
        onOpenChange={closeFormService}
        classNames={{
          header:
            "flex justify-center border-b border-divider text-center text-2xl",
          footer: "border-t border-divider",
          body: "py-[10px]",
        }}
      >
        <ModalContent ref={modalRef}>
          {(closeFormService) => (
            <form>
              <ModalHeader className="">บริการฝากครรภ์</ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={activeStep}
                  onSelectionChange={setActiveStep}
                  size="sm"
                  classNames={{
                    tabList: "mx-auto w-full bg-[#ffffff]",
                    tabContent:
                      "group-data-[selected=true]:bg-[#AE7EDE] p-1 rounded-sm w-full bg-[#D4D4D8]",
                  }}
                  // isDisabledKeys={["from_2", "from_3", "from_4", "from_5"]}
                  keepMounted
                >
                  <Tab disabled key="from_1" title={<div className="" />}>
                    <div className="flex justify-between items-center px-[10px]">
                      <h1>ส่วนที่ 1 ทะเบียน ANC</h1>
                      <Button
                        onPress={() => setPullAnc(true)}
                        className=""
                        color="secondary"
                      >
                        ดึงข้อมูลทะเบียน ANC
                      </Button>
                      <AncData
                        openModalAnc={pullAnc}
                        closeModalAnc={() => setPullAnc(false)}
                        setSelectedAnc={setSelectedAnc}
                        setField={setField} // เพิ่มตรงนี้
                        form={form}
                      />
                    </div>
                    <Form01
                      selectedAnc={selectedAnc}
                      setSelectedAnc={setSelectedAnc}
                      field={field}
                      setField={setField}
                      handleChange={handleChange}
                      handleLmpChange={handleLmpChange}
                      handleEditChange={handleEditChange}
                      vitals={vitals}
                      editVitalsign={editVitalsign}
                      bmi={bmi}
                      validationSchema={validationSchema}
                      form={form}
                    />
                  </Tab>
                  <Tab disabled key="from_2" title={<div className="" />}>
                    <Form02
                      field={field}
                      setField={setField}
                      handleChange={handleChange}
                      validationSchema={validationSchema}
                      form={form}
                    />
                  </Tab>
                  <Tab disabled key="from_3" title={<div className="" />}>
                    <Form03
                      field={field}
                      setField={setField}
                      handleChange={handleChange}
                      handleChangeCbe={handleChangeCbe}
                      handleChangeBti={handleChangeBti}
                      handleDateChange={handleDateChange}
                      validationSchema={validationSchema}
                      form={form}
                      selectedBti={selectedBti}
                      selectedCbe={selectedCbe}
                      Dates={Dates}
                    />
                  </Tab>
                  <Tab disabled key="from_4" title={<div className="" />}>
                    <Form04
                      selectedAnc={selectedAnc}
                      setSelectedAnc={setSelectedAnc}
                      field={field}
                      setField={setField}
                      handleChange={handleChange}
                      validationSchema={validationSchema}
                      form={form}
                    />
                  </Tab>
                  <Tab disabled key="from_5" title={<div className="" />}>
                    <Form05
                      field={field}
                      setField={setField}
                      handleChange={handleChange}
                      handleChangeRefIn={handleChangeRefIn}
                      coverageSite={coverageSite}
                      validationSchema={validationSchema}
                      form={form}
                      selectedRef={selectedRef}
                    />
                  </Tab>
                </Tabs>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="light"
                  color="default"
                  onPress={() => SetModalResetValue(true)}
                >
                  reset
                </Button>
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
                  color="primary"
                  onPress={async () => {
                    const idx = steps.indexOf(activeStep);

                    if (idx < steps.length - 1) {
                      setActiveStep(steps[idx + 1]);
                    } else {
                      // Step สุดท้าย → submit form
                      try {
                        console.log("Current form value:", form.state.values);
                        await form.handleSubmit(); // จะ trigger onSubmit ใน useForm
                        console.log("Submit triggered"); // สามารถเช็คว่าถึงบรรทัดนี้หรือไม่
                      } catch (err) {
                        console.error("Validation failed:", err);
                      }
                    }
                  }}
                >
                  {activeStep === steps[steps.length - 1] ? "ยืนยัน" : "ถัดไป"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <ResetValue
        openModalReset={ModalResetValue}
        closeModalReset={() => SetModalResetValue(false)}
        onReset={handleReset}
      />
    </div>
  );
}
