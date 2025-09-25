'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Tabs, Tab } from "@heroui/tabs";
import { Textarea } from "@heroui/input";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import useHook from './useHook';

export default function page({ openModal, closeModal }) {
  const { field, handleSearchHnWife, hnInputWife, setHnInputWife, handleSearchHnHusband, hnInputHusband, setHnInputHusband, pat, patHusband, formatAddress, formatName, formatNameHusband, vitals, bmi, editVitalsign, handleEditChange, calculateAge, handleChange, handleSubmit, steps, activeStep, setActiveStep } = useHook();
  return (
    <Modal classNames={{ header: 'flex justify-center border-b border-divider mt-[10px] mb-[10px] text-2xl', footer: 'border-t border-divider', body: 'my-[10px]' }} backdrop="blur" size='3xl' scrollBehavior='inside' isOpen={openModal} onClose={closeModal}>
      <ModalContent>
        {(closeModal) => (
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>ลงทะเบียน ANC</ModalHeader>
            <ModalBody>
              <Tabs selectedKey={activeStep} onSelectionChange={setActiveStep} classNames={{ tabContent: " p-1 px-6 rounded-lg", tabList: 'mx-auto' }} aria-label="Dynamic tabs">
                <Tab disabled key="wife" title="ส่วนของภรรยา">
                  <div className='overflow-y-scroll max-h-[calc(90vh-300px)]'>
                    <div className='grid grid-cols-8 justify-between'>
                      <h1 className='col-span-5'>ส่วนของภรรยา</h1>
                      <div className='flex gap-[5px] items-center col-span-3'>
                        <Input value={hnInputWife} onChange={(e) => setHnInputWife(e.target.value)} size='sm' label="Search HN Wife" type="search" />
                        <Button isIconOnly aria-label="Search HN Wife" variant='flat' onClick={handleSearchHnWife} type='button'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
                      <Input size='sm' label="HN" value={field.hn_wife} onChange={handleChange} type="text" />
                      <Input size='sm' label="ชื่อ" value={formatName(pat)} type="text" readOnly />
                      <Input size='sm' label="อายุ" type="text" value={calculateAge(pat?.birthdatetime)} readOnly />
                      <Input size='sm' label="บัตรประชาชน" value={pat?.citizencardno} type="text" readOnly />
                      <Textarea className="col-span-2" label="ที่อยู่" value={formatAddress(pat?.pat_address)} readOnly />
                      <Input size='sm' label="เบอร์โทรศัพท์" value={pat?.pat_address.phone} type="text" />
                      <Input size='sm' label="อาชีพ" value={pat?.occupation_detail.lookupname} type="text" />
                      <Input size='sm' label="email" value={pat?.pat_address.email || ""} type="email" />
                      <Input
                        size="sm"
                        label="น้ำหนัก"
                        name="weight"
                        value={editVitalsign.weight}
                        type="text"
                        onChange={handleEditChange}
                      />
                      <Input
                        size="sm"
                        label="ส่วนสูง"
                        name="height"
                        value={editVitalsign.height}
                        type="text"
                        onChange={handleEditChange}
                      />
                      <Input
                        size="sm"
                        label="BMI"
                        value={bmi}
                        type="text"
                        readOnly
                      />
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
                      />
                    </div>
                  </div>
                </Tab>
                <Tab disabled key="husband" title="ส่วนของสามี">
                  <div className='grid grid-cols-8 justify-between'>
                    <h1 className='col-span-5'>ส่วนของสามี</h1>
                    <div className='flex gap-[5px] items-center col-span-3'>
                      <Input size='sm' label="Search HN" type="search" value={hnInputHusband} onChange={(e) => setHnInputHusband(e.target.value)} />
                      <Button isIconOnly aria-label="Search HN" variant='flat' onClick={handleSearchHnHusband}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
                    <Input label="HN สามี" value={field.hn_husband} onChange={handleChange} type="text" />
                    <Input label="ชื่อ สามี" value={formatNameHusband(patHusband)} type="text" />
                    <Input label="อายุ" value={calculateAge(patHusband?.birthdatetime)} type="text" />
                    <Input label="บัตรประชาชน" value={patHusband?.citizencardno} type="text" />
                    <Input label="อาชีพ" value={patHusband?.occupation_detail.lookupname} type="text" />
                    <Input label="email" value={patHusband?.pat_address.email || ""} type="email" />
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
                onPress={() => {
                  const idx = steps.indexOf(activeStep);
                  if (idx < steps.length - 1) setActiveStep(steps[idx + 1]);
                  else handleSubmit(e);
                }}>
                {activeStep === steps[steps.length - 1] ? "ยืนยัน" : "ถัดไป"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
