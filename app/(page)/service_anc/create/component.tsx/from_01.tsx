import React from 'react'
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";

export default function page() {
  return (
    <div>
      <div className='grid grid-cols-2 gap-[10px] mt-[10px] overflow-y-scroll max-h-[calc(90vh-350px)] px-[20px]'>
        <Input size='sm' label="ANC NO" type="text" />
        <Input size='sm' label="HN" type="text" />
        <Input size='sm' label="ชื่อ" type="text" />
        <Input size='sm' label="อายุ" type="text" />
        <Input size='sm' label="บัตรประชาชน" type="text" />
        <Input size='sm' label="เบอร๋โทรศัพท์" type="text" />
        <Textarea size='sm' className="col-span-2" label="ที่อยู่" />
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
    </div>
  )
}
