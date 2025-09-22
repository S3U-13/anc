'use client'
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { useForm } from '@tanstack/react-form'

import AncData from "../pull_anc/page";
import ResetValue from "./component.tsx/modal_reset_value";
import Form01 from "./component.tsx/form_01"
import Form02 from "./component.tsx/form_02"
import Form03 from "./component.tsx/form_03"
import Form04 from "./component.tsx/form_04"
import Form05 from "./component.tsx/form_05"

export default function page({ openFormService, closeFormService }) {

    const [pullAnc, setPullAnc] = useState(false);

    const pullHandle = () => {
        setPullAnc(prev => !prev);
    }

    const [ModalResetValue, SetModalResetValue] = useState(false);

    console.log(ModalResetValue);

    const resetHandle = () => {
        SetModalResetValue(prev => !prev);
    }

    const steps = ["from_1", "from_2", "from_3", "from_4", "from_5"];
    const [activeStep, setActiveStep] = useState("from_1");

    const form = useForm({
        defaultValues: {
            hn: "",
            patvisit_id: "",
            patreg_id: "",
            para: "",
            g: "",
            p: "",
            a: "",
            last: "",
            lmp: "",
            ma_id: "",
            ma_text: "",
            hr_id: "",
            hr_text: "",
            am_id: "",
            gct_1: "",
            gct_2: "",
            hbsag: "",
            vdrl_1: "",
            anti_hiv: "",
            bl_gr: "",
            rh: "",
            hct: "",
            of: "",
            dcip: "",
            mcv: "",
            mch: "",
            hb_typing: "",
            pcr_wife_id: "",
            pcr_text: "",
            cordo_id: "",
            cordo_text: "",
            cordo_other_text: "",
            abortion_id: "",
            td_num: "",
            td_last_date: "",
            tdap_id: "",
            tdap_round_1: "",
            tdap_round_2: "",
            tdap_round_3: "",
            iip_id: "",
            iip_date: "",
            lab_2: "",
            vdrl_2: "",
            h: "",
            bti_value_1_id: "",
            bti_value_2_id: "",
            bti_value_3_id: "",
            bti_value_4_id: "",
            bti_value_5_id: "",
            bti_date: "",
            cbe_value_1_id: "",
            cbe_value_2_id: "",
            cbe_value_3_id: "",
            cbe_value_4_id: "",
            birads_id: "",
            cbe_result: "",
            per_os_id: "",
            husband_name: "",
            husband_age: "",
            husband_id_card: "",
            husband_hn: "",
            husband_tel: "",
            husband_job: "",
            hbsag_husband: "",
            vdrl_husband: "",
            anti_hiv_husband: "",
            bl_gr_husband: "",
            rh_husband: "",
            hct_husband: "",
            of_husband: "",
            dcip_husband: "",
            mcv_husband: "",
            mch_husband: "",
            hb_typing_husband: "",
            pcr_hus_text: "",
            pcr_hus_id: "",
            anc_id: "",
            usg_id: "",
            ref_in_id: [] as string[],
            ref_out_id: [] as string[],
            ref_in_choice_id: "",
            ref_out_choice_i: "",
            hos_name: "",
        }
    });

    return (
        <div>
            <Modal size='5xl' backdrop='blur' isOpen={openFormService} onOpenChange={closeFormService} classNames={{ header: 'flex justify-center border-b border-divider text-center text-2xl', footer: 'border-t border-divider', body: 'py-[10px]' }}>
                <ModalContent>
                    {(closeFormService) => (
                        <form>
                            <ModalHeader className="">บริการฝากครรภ์</ModalHeader>
                            <ModalBody>
                                <Tabs selectedKey={activeStep} onSelectionChange={setActiveStep} size='sm' classNames={{ tabList: "mx-auto w-full bg-[#ffffff]", tabContent: "group-data-[selected=true]:bg-[#AE7EDE] p-1 rounded-sm w-full bg-[#D4D4D8]" }}>
                                    <Tab disabled key="from_1"
                                        title={<div className="" />}>
                                        <div className='flex justify-between items-center px-[10px]'>
                                            <h1>ส่วนที่ 1 ทะเบียน ANC</h1>
                                            <Button onPress={() => setPullAnc(true)} className='' color="secondary">ดึงข้อมูลทะเบียน ANC</Button>
                                            <AncData openModalAnc={pullAnc} closeModalAnc={() => setPullAnc(false)} />
                                        </div>
                                        <Form01 />
                                    </Tab>
                                    <Tab disabled key="from_2"
                                        title={<div className="" />}>
                                        <Form02 />
                                    </Tab>
                                    <Tab disabled key="from_3"
                                        title={<div className="" />}>
                                        <Form03 />
                                    </Tab>
                                    <Tab disabled key="from_4"
                                        title={<div className="" />}>
                                        <Form04 />
                                    </Tab>
                                    <Tab disabled key="from_5"
                                        title={<div className="" />}>
                                        <Form05 />
                                    </Tab>
                                </Tabs>

                            </ModalBody>

                            <ModalFooter>
                                <Button variant="light" color='default' onPress={() => SetModalResetValue(true)} >
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
                                    color="secondary"
                                    onPress={() => {
                                        const idx = steps.indexOf(activeStep);
                                        if (idx < steps.length - 1) setActiveStep(steps[idx + 1]);
                                        else handleSubmit();
                                    }}>
                                    {activeStep === steps[steps.length - 1] ? "Submit" : "ถัดไป"}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <ResetValue openModalReset={ModalResetValue} closeModalReset={() => SetModalResetValue(false)} />
        </div>
    )
}
