'use client'
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import AncData from "../pull_anc/page";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";

export default function page({ openFormService, closeFormService }) {
    const [pullAnc, setPullAnc] = useState(false);

    const pullHandle = () => {
        setPullAnc(prev => !prev);
    }

    return (
        <div>
            <Modal size='5xl' backdrop='blur' isOpen={openFormService} onOpenChange={closeFormService} classNames={{ header: 'flex justify-center border-b border-divider mt-[10px] mb-[10px] text-center text-2xl', footer: 'border-t border-divider', body: 'my-[10px]' }}>
                <ModalContent>
                    {(closeFormService) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">บริการฝากครรภ์</ModalHeader>
                            <ModalBody>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-xl'>ทะเบียน ANC</h1>
                                    <Button onPress={() => setPullAnc(true)} className='' color="secondary">ดึงข้อมูลทะเบียน ANC</Button>
                                </div>
                                <div className='grid grid-cols-2 gap-[10px] mt-[10px]'>
                                    <Input size='sm' label="ANC NO" type="text" />
                                    <Input size='sm' label="HN" type="text" />
                                    <Input size='sm' label="ชื่อ" type="text" />
                                    <Input size='sm' label="อายุ" type="text" />
                                    <Input size='sm' label="บัตรประชาชน" type="text" />
                                    <Input size='sm' label="เบอร๋โทรศัพท์" type="text" />
                                    <Textarea className="col-span-2" label="ที่อยู่" />
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
                                    <DatePicker size='sm'
                                        label="LMP"
                                    />
                                    <DatePicker size='sm'
                                        label="EDC"
                                    />
                                    <Input size='sm' label="อายุครรภ์" type="text" />
                                </div>
                                <AncData openModalAnc={pullAnc} closeModalAnc={() => setPullAnc(false)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={closeFormService}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={closeFormService}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
