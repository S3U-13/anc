
import React from 'react'
import useHook from '../useHook'
import { Radio, RadioGroup } from '@heroui/radio'
import { Checkbox, CheckboxGroup } from '@heroui/checkbox';

export default function page() {
    const { data, field, handleChange } = useHook();
    return (
        <div className='grid grid-cols-4 overflow-y-scroll max-h-[calc(90vh-300px)]'>
            <h1>ส่วนที่ 5</h1>
            <RadioGroup
                className='col-span-4 px-[20px] mt-[10px]'
                label="ฝากครรภ์ครบตามเกนฑ์"
                value={field.anc_id}
                onValueChange={(val) => handleChange({ target: { name: "anc_id", value: val } })}
            >
                {data
                    .filter((anc) => anc.choice_type_id === 13)
                    .map((anc) => (
                        <div key={anc.id} className="flex gap-[10px] items-center px-[10px]">
                            <Radio value={String(anc.id)}>
                                {anc.choice_name}
                            </Radio>
                        </div>
                    ))}
            </RadioGroup>
            <RadioGroup
                className='col-span-4 px-[20px] mt-[10px]'
                label="ตรวจสอบความครบถ้วนของบริการ ตามช่วงอายุครรภ์"
                value={field.usg_id}
                onValueChange={(val) => handleChange({ target: { name: "usg_id", value: val } })}
            >
                {data
                    .filter((usg) => usg.choice_type_id === 14)
                    .map((usg) => (
                        <div key={usg.id} className="flex gap-[10px] items-center px-[10px]">
                            <Radio value={String(usg.id)}>
                                {usg.choice_name}
                            </Radio>
                        </div>
                    ))}
            </RadioGroup>
            <CheckboxGroup
                className="col-span-4 px-[20px]"
                label="refer"
                value={field.ref_in_id}
                onValueChange={(val) =>
                    handleChange({ target: { name: "ref_in_id", value: val } })
                }
            >
                {data
                    .filter((ref_in, index) => ref_in.choice_type_id === 15 && index !== 1)
                    .map((ref_in) => (
                        <div key={ref_in.id} className="flex gap-[10px] items-center px-[10px]">
                            <Checkbox value={String(ref_in.id)}>
                                {ref_in.choice_name}
                            </Checkbox>
                        </div>
                    ))}
            </CheckboxGroup>

            <CheckboxGroup
                className="col-span-4 px-[20px]"
                value={field.ref_out_id}
                onValueChange={(val) =>
                    handleChange({ target: { name: "ref_out_id", value: val } })
                }
            >
                {data
                    .filter(
                        (ref_out, index) => ref_out.choice_type_id === 15 && [1, 3].includes(index)
                    )
                    .map((ref_out) => (
                        <div key={ref_out.id} className="flex gap-[10px] items-center px-[10px]">
                            <Checkbox value={String(ref_out.id)}>
                                {ref_out.choice_name}
                            </Checkbox>
                            {String(ref_out.id) === 41 && field.ref_out_id === 41 && }
                        </div>
                    ))}
            </CheckboxGroup>
        </div>
    )
}
