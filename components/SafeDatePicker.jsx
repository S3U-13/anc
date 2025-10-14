"use client";
import React, { useState } from "react";
import { DatePicker } from "@heroui/date-picker";
import { parseDate } from "@internationalized/date";

export default function SafeDatePicker({ label, value, onChange, errorMessage }) {
  const [internalValue, setInternalValue] = useState(value ?? null);

  const handleChange = (newValue) => {
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <DatePicker
      size="sm"
      label={label}
      locale="th-TH-u-ca-buddhist"
      value={internalValue ? parseDate(internalValue) : null}
      onChange={handleChange}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      placeholder="เลือกวันที่"
      withinPortal={false} // ป้องกัน modal ซ้อน
    />
  );
}
