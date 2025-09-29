import { DatePicker } from '@heroui/date-picker'
import { Input } from '@heroui/input'
import { Radio, RadioGroup } from '@heroui/radio'
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import React from 'react'
import useHook from '../useHook'

export default function page() {
    const { data, field, handleChange } = useHook();
    return (
        <div className='grid grid-cols-4 gap-[10px] overflow-y-scroll max-h-[calc(90vh-300px)]'>
            <h1 className='col-span-4'>ส่วนที่ 3</h1>
            <div className='grid grid-cols-4 gap-[10px] col-span-4 px-[30px]'>
                <Input size='sm' className='col-span-2' label="วัคซีนบาดทะยัก ก่อนตั้งครรภ์เคยฉีดกี่ครั้ง" type="" />
                <DatePicker size='sm' className='col-span-2' label="ครั้งสุดท้ายวันที่" />
            </div>
            <RadioGroup
                className='col-span-4 px-[20px]'
                label="ในระหว่างตั้งครรภ์"
                value={field.tdap_id}
                onValueChange={(val) => handleChange({ target: { name: "tdap_id", value: val } })}
            >
                {data
                    .filter((tdap) => tdap.choice_type_id === 7)
                    .map((tdap) => (
                        <div key={tdap.id}>
                            <Radio value={String(tdap.id)}>
                                {tdap.choice_name}
                            </Radio>
                            {String(tdap.id) === "14" && field.tdap_id === "14" && (
                                <div className='grid grid-cols-1 gap-[10px] mt-[10px] w-1/4'>
                                    <DatePicker size='sm' className='' label="ครั้งที่ 1" />
                                    <DatePicker size='sm' className='' label="ครั้งที่ 2" />
                                    <DatePicker size='sm' className='' label="ครั้งที่ 3" />
                                </div>
                            )}
                        </div>
                    ))}
            </RadioGroup>
            <RadioGroup
                className='col-span-4 px-[20px]'
                label="ฉีกวัคซีนกระตุ้นครรภ์นี้"
                value={field.iip_id}
                onValueChange={(val) => handleChange({ target: { name: "iip_id", value: val } })}
            >
                {data
                    .filter((iip) => iip.choice_type_id === 8)
                    .map((iip) => (
                        <div key={iip.id} className="flex gap-[10px] items-center px-[10px]">
                            <Radio value={String(iip.id)}>
                                {iip.choice_name}
                            </Radio>
                            {String(iip.id) === "16" && field.iip_id === "16" && (
                                <DatePicker size='sm' className='w-1/4' label="วันที่" />
                            )}
                        </div>
                    ))}
            </RadioGroup>
            <div className='col-span-4 grid grid-cols-4 gap-[10px] px-[20px]'>
                <h1 className='text-[#71717A] col-span-4'>ค่า Lab 2</h1>
                <DatePicker size='sm' className='col-span-2 pl-[10px]' label="Lab 2 วันที่" />
                <Input size='sm' className='col-span-2 pr-[10px]' label="BCT" type="text" />
                <Input size='sm' className='col-span-2 pl-[10px]' label="VDRL" type="text" />
                <Input size='sm' className='col-span-2 pr-[10px]' label="H" type="text" />
            </div>
            <CheckboxGroup
                className='col-span-4 px-[20px]'
                label="กลุ่มสัมพันธ์ เเละ ฟังผลเลือด"
                value={field.bti_id}
                onValueChange={(val) => handleChange({ target: { name: "bti_id", value: val } })}
            >
                {data
                    .filter((bti) => bti.choice_type_id === 9)
                    .map((bti) => (
                        <div key={bti.id} className="flex gap-[10px] items-center px-[10px]">
                            <Checkbox value={String(bti.id)}>
                                {bti.choice_name}
                            </Checkbox>
                            {/* {String(iip.id) === "16" && field.iip_id === "16" && (
                                <DatePicker size='sm' className='w-1/4' label="วันที่" />
                            )} */}
                        </div>
                    ))}
            </CheckboxGroup>
            <CheckboxGroup
                className='col-span-4 px-[20px]'
                label="ตรวจเต้านม, หัวนม"
                value={field.cbe_id}
                onValueChange={(val) => handleChange({ target: { name: "cbe_id", value: val } })}
            >
                {data
                    .filter((cbe) => cbe.choice_type_id === 10)
                    .map((cbe) => (
                        <div key={cbe.id} className="flex gap-[10px] items-center px-[10px]">
                            <Checkbox value={String(cbe.id)}>
                                {cbe.choice_name}
                            </Checkbox>
                            {/* {String(iip.id) === "16" && field.iip_id === "16" && (
                                <DatePicker size='sm' className='w-1/4' label="วันที่" />
                            )} */}
                        </div>
                    ))}
            </CheckboxGroup>
            <RadioGroup
                className='col-span-4 px-[20px]'
                label="ได้รับยา"
                value={field.am_id}
                onValueChange={(val) => handleChange({ target: { name: "am_id", value: val } })}
            >
                {data
                    .filter((per_os) => per_os.choice_type_id === 12)
                    .map((per_os) => (
                        <div key={per_os.id} className="flex gap-[10px] items-center px-[10px]">
                            <Radio value={String(per_os.id)}>
                                {per_os.choice_name}
                            </Radio>
                        </div>
                    ))}
            </RadioGroup>
        </div>
    )
}
