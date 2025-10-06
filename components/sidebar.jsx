"use client";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { AlertTriangle, User, Users } from "@deemlol/next-icons";

export default function SideBar() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.pathname);

  const menus = [
    {
      label: "เมนู",
      disabled: true,
      items: [
        {
          label: "พอร์ตฟอลิโอ",
          path: "/portfolio",
          icon: <User size={24} />,
        },
      ],
    },
    {
      label: "ตั้งค่า",
      disabled: true,
      items: [
        {
          label: "ผู้ใช้งาน",
          path: "/user",
          icon: <Users size={24} />,
        },
        {
          label: "คอมโพเนนต์",
          path: "/settings",
          icon: <User size={24} />,
        },
      ],
    },
    {
      label: "ทดสอบ",
      path: "/crud",
      icon: <AlertTriangle size={24} />,
    },
  ];

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* User info */}
      <div className="px-[20px] py-[10px] mb-[20px] text-default-500 dark:text-black">
        <img src="/images/logo.png" className="w-2/4" alt="" />
      </div>

      {/* Menu buttons */}
      <div className="flex flex-col gap-1 flex-grow py-[20px] px-[20px] border">
        <Tabs
          isVertical
          color="primary"
          className="w-full"
          classNames={{
            tabList: "w-full min-h-[calc(100vh-190px)]",
            tabContent: "w-full",
          }}
        >
          {menus.map((menu) => (
            <>
              <Tab
                title={
                  <div className="flex items-center justify-between">
                    {menu.icon}
                    <span>{menu.label}</span>
                  </div>
                }
                disabled={menu.disabled}
              />

              {/* เมนูย่อย */}
              {menu.items?.length > 0 &&
                menu.items.map((subMenu) => (
                  <Tab
                    key={subMenu.path}
                    title={
                      <div className="flex items-center justify-between">
                        {subMenu.icon}
                        <span>{subMenu.label}</span>
                      </div>
                    }
                    onPress={() => router.push(subMenu.path)}
                    isSelected={activePath === subMenu.path}
                  />
                ))}
            </>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
