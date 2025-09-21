'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Tabs, Tab } from "@heroui/tabs";
import { Textarea } from "@heroui/input";

export default function page({ openModal, closeModal }) {
  return (
    <Modal classNames={{ header: 'flex justify-center border-b border-divider mt-[10px] mb-[10px] text-2xl', footer: 'border-t border-divider', body: 'my-[10px]' }} backdrop="blur" size='3xl' scrollBehavior='inside' isOpen={openModal} onClose={closeModal}>
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader>ลงทะเบียน ANC</ModalHeader>
            <ModalBody>
              <Tabs color='default' classNames={{ tabContent: "group-data-[selected=true]:bg-[#ffffff] p-1 px-6 rounded-lg", tabList: 'mx-auto' }} aria-label="Dynamic tabs">
                <Tab key="wife" title="ส่วนของภรรยา">
                  <div className='grid grid-cols-8 justify-between'>
                    <h1 className='col-span-5'>ส่วนของภรรยา</h1>
                    <div className='flex gap-[5px] items-center col-span-3'>
                      <Input size='sm' label="Search HN Wife" type="search" />
                      <Button isIconOnly aria-label="Search HN Wife" variant='flat'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
                    <Input size='sm' label="HN" type="text" />
                    <Input size='sm' label="ชื่อ" type="text" />
                    <Input size='sm' label="อายุ" type="text" />
                    <Input size='sm' label="บัตรประชาชน" type="text" />
                    <Textarea className="col-span-2" label="ที่อยู่" />
                    <Input size='sm' label="เบอร๋โทรศัพท์" type="text" />
                    <Input size='sm' label="อาชีพ" type="text" />
                    <Input size='sm' label="email" type="email" />
                    <Input size='sm' label="น้ำหนัก" type="text" />
                    <Input size='sm' label="ส่วนสูง" type="text" />
                    <Input size='sm' label="BMI" type="text" />
                    <Input size='sm' label="ความดันโลหิต" type="text" />
                    <Input size='sm' label="PARA" type="text" />
                    <Input size='sm' label="G" type="text" />
                    <Input size='sm' label="P" type="text" />
                    <Input size='sm' label="A" type="text" />
                    <Input size='sm' label="LAST" type="text" />
                  </div>
                  <div className='grid grid-cols-3 gap-[10px] mt-[10px]'>
                    <DatePicker size='sm'
                      label="LMP"
                    />
                    <DatePicker size='sm'
                      label="EDC"
                    />
                    <Input size='sm' label="อายุครรภ์" type="text" />
                  </div>
                </Tab>
                <Tab key="husband" title="ส่วนของสามี">
                  <div className='grid grid-cols-8 justify-between'>
                    <h1 className='col-span-5'>ส่วนของสามี</h1>
                    <div className='flex gap-[5px] items-center col-span-3'>
                      <Input size='sm' label="Search HN" type="search" />
                      <Button isIconOnly aria-label="Search HN" variant='flat'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
                    <Input label="HN สามี" type="text" />
                    <Input label="ชื่อ สามี" type="text" />
                    <Input label="อายุ" type="text" />
                    <Input label="บัตรประชาชน" type="text" />
                    <Input label="อาชีพ" type="text" />
                    <Input label="email" type="email" />
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                ปิด
              </Button>
              <Button color="primary" onPress={closeModal}>
                ลงทะเบียน
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
