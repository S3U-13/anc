'use client'
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import AncData from "../pull_anc/page";
import From01 from "./component.tsx/from_01"
import From02 from "./component.tsx/from_02"
import From03 from "./component.tsx/from_03"
import From04 from "./component.tsx/from_04"
import From05 from "./component.tsx/from_05"

export default function page({ openFormService, closeFormService }) {

    const [pullAnc, setPullAnc] = useState(false);

    const pullHandle = () => {
        setPullAnc(prev => !prev);
    }

    return (
        <div>
            <Modal size='5xl' backdrop='blur' isOpen={openFormService} onOpenChange={closeFormService} classNames={{ header: 'flex justify-center border-b border-divider text-center text-2xl', footer: 'border-t border-divider', body: 'py-[10px]' }}>
                <ModalContent>
                    {(closeFormService) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">บริการฝากครรภ์</ModalHeader>
                            <ModalBody>

                                <Tabs size='sm' classNames={{ tabList: "mx-auto w-full bg-[#ffffff]", tabContent: "group-data-[selected=true]:bg-[#AE7EDE] p-1 rounded-md w-full bg-[#D4D4D8]" }}>
                                    <Tab key="from_1"
                                        title={<div className="" />}>
                                        <div className='flex justify-between items-center px-[10px]'>
                                            <h1>ส่วนที่ 1 ทะเบียน ANC</h1>
                                            <Button onPress={() => setPullAnc(true)} className='' color="secondary">ดึงข้อมูลทะเบียน ANC</Button>
                                        </div>
                                        <From01 />
                                        <AncData openModalAnc={pullAnc} closeModalAnc={() => setPullAnc(false)} />
                                    </Tab>
                                    <Tab key="from_2"
                                        title={<div className="" />}>
                                        <From02 />
                                    </Tab>
                                    <Tab key="from_3"
                                        title={<div className="" />}>
                                        <From03 />
                                    </Tab>
                                    <Tab key="from_4"
                                        title={<div className="" />}>
                                        <From04 />
                                    </Tab>
                                    <Tab key="from_5"
                                        title={<div className="" />}>
                                        <From05 />
                                    </Tab>
                                </Tabs>


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
