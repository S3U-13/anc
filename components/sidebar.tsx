"use client";
import React from "react";
import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";

export default function SideBar() {
  return (
    <div className="grid grid-cols-12 min-h-screen gap-[10px]">
      <div className="col-span-2 rounded-md border bg-white border-divider p-2">
        <div className="grid grid-cols-1 justify-center px-[10px] mb-[20px] text-default-500 dark:text-black">
          <h1>ชื่อ</h1>
          <h1>ตำเเหน่ง</h1>
          <h1>กลุ่มงาน</h1>
          <h1>สถานะ</h1>
        </div>

        <div className="grid grid-cols-1 gap-1">
          <Button color="default" variant="flat" radius="sm">
            ผู้ใช้
          </Button>
          <Button color="default" variant="flat" radius="sm">
            Button
          </Button>
          <Button color="default" variant="flat" radius="sm">
            Button
          </Button>
          <Button color="default" variant="flat" radius="sm">
            Button
          </Button>
          <Button color="default" variant="flat" radius="sm">
            Button
          </Button>
          <Button color="default" variant="flat" radius="sm">
            Button
          </Button>
          <Button color="danger" variant="light" radius="sm">
            ออกจากระบบ
          </Button>
        </div>
      </div>
      <div className="col-span-10 h-[70px] rounded-md border bg-white border-divider flex justify-end items-center p-2 px-[60px]">
        <ThemeSwitch />
      </div>
    </div>
  );
}
