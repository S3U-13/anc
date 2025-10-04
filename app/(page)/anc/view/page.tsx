import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";
import useHook from "./useHook";
import { Tab, Tabs } from "@heroui/tabs";

export default function page({ openModalView, closeModalView }) {
  const { activeStep, setActiveStep, steps } = useHook();
  return (
    <div>
      <Modal size="5xl" isOpen={openModalView} onOpenChange={closeModalView}>
        <ModalContent>
          {(closeModalView) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                หน้าดูข้อมูล
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={activeStep}
                  onSelectionChange={setActiveStep}
                  classNames={{
                    tabContent: " p-1 px-6 rounded-lg",
                    tabList: "mx-auto",
                  }}
                  aria-label="Dynamic tabs"
                >
                  <Tab disabled key="wife" title="ส่วนของภรรยา">
                    <div className="overflow-y-scroll max-h-[calc(90vh-300px)]">
                      <div className="grid grid-cols-8 justify-between">
                        <h1 className="col-span-5">ส่วนของภรรยา</h1>
                      </div>
                      <div className="grid grid-cols-2 gap-[10px] mt-[15px] p-2">
                        <Input size="sm" label="HN" />

                        <Input size="sm" label="ชื่อ" readOnly />
                        <Input size="sm" label="อายุ" readOnly />
                        <Input size="sm" label="บัตรประชาชน" readOnly />
                        <Textarea
                          className="col-span-2"
                          label="ที่อยู่"
                          readOnly
                        />
                        <Input size="sm" label="เบอร์โทรศัพท์" />
                        <Input size="sm" label="อาชีพ" />
                        <Input size="sm" label="email" />
                        <Input size="sm" label="น้ำหนัก" />
                        <Input size="sm" label="ส่วนสูง" />
                        <Input size="sm" label="BMI" readOnly />
                        <Input size="sm" label="ความดันโลหิต" readOnly />
                      </div>
                    </div>
                  </Tab>
                  <Tab disabled key="husband" title="ส่วนของสามี">
                    <div className="grid grid-cols-8 justify-between">
                      <h1 className="col-span-5">ส่วนของสามี</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-[10px] mt-[15px] p-2">
                      <Input label="HN สามี" size="sm" />
                      <Input label="ชื่อ สามี" size="sm" />
                      <Input label="อายุ" size="sm" />
                      <Input label="บัตรประชาชน" size="sm" />
                      <Input label="อาชีพ" size="sm" />
                      <Input label="email" />
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
                  color="primary"
                  onPress={async () => {
                    const idx = steps.indexOf(activeStep);
                    if (idx < steps.length - 1) {
                      // ถ้ายังไม่ถึง step สุดท้าย
                      setActiveStep(steps[idx + 1]);
                    }
                  }}
                >
                  ถัดไป
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
