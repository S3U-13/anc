"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";

import Form01 from "./component.jsx/form_01";
import Form02 from "./component.jsx/form_02";
import Form03 from "./component.jsx/form_03";
import Form04 from "./component.jsx/form_04";
import Form05 from "./component.jsx/form_05";
import useHook from "./useHook";

export default function page({
  openEditService,
  closeEditService,
  currentData,
  isEditLoading,
  selectedEditId,
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
    handleDateChange,
    handleChangeRefIn,
    form,
    validationSchema,
    selectedBti,
    selectedCbe,
    Dates,
    selectedRef,
    modalRef,
  } = useHook({
    openEditService,
    closeEditService,
    currentData,
    selectedEditId,
  });

  return (
    <div>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={openEditService}
        onOpenChange={closeEditService}
        classNames={{
          header:
            "flex justify-center border-b border-divider  text-center text-2xl",
          footer: "border-t border-divider",
          body: "py-[10px]",
        }}
        className="dark:border dark:border-divider"
        placement="center"
      >
        <ModalContent ref={modalRef}>
          {(closeEditService) => (
            <form>
              <ModalHeader className="">บริการฝากครรภ์</ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={activeStep}
                  onSelectionChange={setActiveStep}
                  size="sm"
                  classNames={{
                    tabList: "mx-auto w-full bg-[#ffffff] dark:bg-[#18181b]",
                    tabContent:
                      "group-data-[selected=true]:bg-[#AE7EDE] p-1 rounded-sm w-full bg-[#D4D4D8]",
                  }}
                  // isDisabledKeys={["from_2", "from_3", "from_4", "from_5"]}
                  keepMounted
                >
                  <Tab disabled key="from_1" title={<div className="" />}>
                    <div className="flex justify-between items-center px-[10px]">
                      <h1>ส่วนที่ 1 ทะเบียน ANC</h1>
                    </div>
                    <Form01
                      handleLmpChange={handleLmpChange}
                      handleEditChange={handleEditChange}
                      vitals={vitals}
                      editVitalsign={editVitalsign}
                      bmi={bmi}
                      validationSchema={validationSchema}
                      form={form}
                      currentData={currentData}
                    />
                  </Tab>
                  <Tab disabled key="from_2" title={<div className="" />}>
                    <Form02 validationSchema={validationSchema} form={form} />
                  </Tab>
                  <Tab disabled key="from_3" title={<div className="" />}>
                    <Form03
                      handleChangeCbe={handleChangeCbe}
                      handleChangeBti={handleChangeBti}
                      handleDateChange={handleDateChange}
                      validationSchema={validationSchema}
                      form={form}
                      selectedBti={selectedBti}
                      selectedCbe={selectedCbe}
                      Dates={Dates}
                      currentData={currentData}
                      isEditLoading={isEditLoading}
                    />
                  </Tab>
                  <Tab disabled key="from_4" title={<div className="" />}>
                    <Form04 form={form} currentData={currentData} />
                  </Tab>
                  <Tab disabled key="from_5" title={<div className="" />}>
                    <Form05
                      handleChangeRefIn={handleChangeRefIn}
                      coverageSite={coverageSite}
                      form={form}
                      selectedRef={selectedRef}
                    />
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
                  color="primary"
                  onPress={async () => {
                    const idx = steps.indexOf(activeStep);

                    if (idx < steps.length - 1) {
                      setActiveStep(steps[idx + 1]);
                    } else {
                      // Step สุดท้าย → submit form
                      try {  
                        await form.handleSubmit(); // จะ trigger onSubmit ใน useForm
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
    </div>
  );
}
