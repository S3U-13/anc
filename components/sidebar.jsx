"use client";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { BarChart, User } from "@deemlol/next-icons";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(router.pathname);

  const menus = [
    {
      label: "เมนู",
      items: [
        {
          label: "dashboard",
          key: "dashboard_admin",
          path: "/dashboard_admin",
          icon: <BarChart size={24} />,
        },
        {
          label: "หน้าเพิ่มผู้ใช้",
          key: "user",
          path: "/user",
          icon: <User size={24} />,
        },
      ],
    },
  ];

  const activeItem = menus
    .flatMap((menu) => menu.items)
    .find((item) => item.path === pathname);
  const activeKey = activeItem ? activeItem.key : "dashboard_admin";
  return (
    <div className="flex flex-col h-full bg-white px-[10px] py-2 dark:bg-[#27272a] ">
      {/* User info */}
      <div className="px-[20px] py-[10px] mb-[10px] text-default-500">
        <img src="/images/logo.png" className="w-3/5" alt="" />
      </div>

      {/* Menu buttons */}
      <div className="flex flex-col gap-1 flex-grow px-[5px] dark:border-divider dark:border rounded-xl">
        <Tabs
          isVertical
          color="default"
          className="w-full"
          classNames={{
            tabList: "w-full min-h-[calc(100vh-120px)] py-[10px] px-[10px]",
            tabContent: "w-full",
          }}
          selectedKey={activeKey}
          onSelectionChange={(key) => {
            const item = menus
              .flatMap((m) => m.items)
              .find((i) => i.key === key);
            if (item) router.push(item.path);
          }}
        >
          {menus.map((menu) => (
            <>
              <Tab
                title={
                  <div className="flex items-center justify-between">
                    {menu.icon}
                    <span className="text-lg text-default-600">
                      {menu.label}
                    </span>
                  </div>
                }
                disabled
              />

              {/* เมนูย่อย */}
              {menu.items?.length > 0 &&
                menu.items.map((subMenu) => (
                  <Tab
                    key={subMenu.key}
                    title={
                      <div className="flex items-center justify-between">
                        <span>{subMenu.label}</span>
                        {subMenu.icon}
                      </div>
                    }
                  />
                ))}
            </>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
