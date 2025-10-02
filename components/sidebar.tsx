"use client";
import React from "react";
import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";

export default function SideBar() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* User info */}
      <div className="px-[10px] py-[10px] mb-[20px] text-default-500 dark:text-black">
       <img src="/images/logo.png" className="w-2/4" alt="" />
      </div>

      {/* Menu buttons */}
      <div className="flex flex-col gap-1 flex-grow">
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
  );
}
