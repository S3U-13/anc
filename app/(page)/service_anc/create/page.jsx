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
import { Select, SelectItem } from "@heroui/select";

export default function page({ openFormService, closeFormService }) {
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
    handleDateChange,
    handleChangeRefIn,
    form,
    validationSchema,
    selectedBti,
    selectedCbe,
    Dates,
    selectedRef,
    modalRef,
    gravidaOptions,
    handleAncNoSelect,
    roundOptions,
    handleGravidaSelect,
    selectedGravida,
    selectedRound,
    setSelectedRound,
    handleRoundSelect,
    setGaManual,
    setEdcManual,
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
        className="dark:border dark:border-divider"
        placement="center"
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
                    tabList: "mx-auto w-full bg-[#ffffff] dark:bg-[#18181b]",
                    tabContent:
                      "group-data-[selected=true]:bg-[#AE7EDE] p-1 rounded-sm w-full bg-[#D4D4D8]",
                  }}
                  // isDisabledKeys={["from_2", "from_3", "from_4", "from_5"]}
                  keepMounted
                >
                  <Tab disabled key="from_1" title={<div className="" />}>
                    <div className="grid grid-cols-1 md:flex md:justify-between gap-2 md:items-center px-[10px]">
                      <h1>ส่วนที่ 1 ทะเบียน ANC</h1>
                      <div className="grid grid-cols-2 md:flex md:justify-end md:items-center gap-2 w-full  md:w-3/5">
                        {selectedAnc && (
                          <Select
                            label="เลือก GA (ท้องที่)"
                            className="w-full md:w-37 "
                            size="sm"
                            radius="lg"
                            color="default"
                            variant="flat"
                            selectedKeys={
                              selectedGravida
                                ? new Set([selectedGravida])
                                : new Set()
                            }
                            onSelectionChange={(keys) => {
                              const selectedValue = Array.from(keys)[0];
                              handleGravidaSelect(selectedValue); // ส่ง value ไปดึง rounds
                            }}
                          >
                            {gravidaOptions.map((g) => (
                              <SelectItem key={g.value} value={g.value}>
                                {g.label}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                        {selectedGravida && (
                          <Select
                            label="เลือกรอบบริการ"
                            className="w-full md:w-35"
                            size="sm"
                            radius="lg"
                            color="default"
                            variant="flat"
                            selectedKeys={
                              selectedRound
                                ? new Set([selectedRound])
                                : new Set()
                            }
                            onSelectionChange={(keys) => {
                              const roundId = Array.from(keys)[0];
                              setSelectedRound(roundId);
                              handleRoundSelect(roundId);
                            }}
                          >
                            {roundOptions.map((r) => (
                              <SelectItem key={r.id} value={String(r.id)}>
                                {r.round}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                        <Button
                          size="md"
                          onPress={() => setPullAnc(true)}
                          className="w-40"
                          color="secondary"
                        >
                          ดึงข้อมูลทะเบียน ANC
                        </Button>
                      </div>

                      <AncData
                        openModalAnc={pullAnc}
                        closeModalAnc={() => setPullAnc(false)}
                        setSelectedAnc={setSelectedAnc}
                        setField={setField} // เพิ่มตรงนี้
                        form={form}
                        handleAncNoSelect={handleAncNoSelect} // ✅ ส่งเพิ่ม
                      />
                    </div>
                    <Form01
                      selectedAnc={selectedAnc}
                      handleLmpChange={handleLmpChange}
                      handleEditChange={handleEditChange}
                      vitals={vitals}
                      editVitalsign={editVitalsign}
                      bmi={bmi}
                      validationSchema={validationSchema}
                      form={form}
                      setGaManual={setGaManual}
                      setEdcManual={setEdcManual}
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
                    />
                  </Tab>
                  <Tab disabled key="from_4" title={<div className="" />}>
                    <Form04 selectedAnc={selectedAnc} form={form} />
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
      <ResetValue
        openModalReset={ModalResetValue}
        closeModalReset={() => SetModalResetValue(false)}
        onReset={handleReset}
      />
    </div>
  );
}
