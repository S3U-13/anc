"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { ChevronDown } from "@deemlol/next-icons";
import { Tabs, Tab } from "@heroui/tabs";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { ThemeSwitchUser } from "./theme-switch-user";
import { useApiRequest } from "@/hooks/useApi";

export default function Navbar() {
  const auth = useAuth();
  const { logoutAPI } = useApiRequest();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await logoutAPI();
      Cookies.remove("token"); // ✅ ลบ token ที่ frontend
      router.push("/"); // กลับไปหน้า login
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { key: "dashboard", title: "สรุปผล", path: "/dashboard" },
    { key: "anc", title: "หน้าทะเบียนฝากครรภ์", path: "/anc" },
    { key: "service_anc", title: "หน้าบริการฝากครรภ์", path: "/service_anc" },
  ];

  const activeKey =
    tabs.find((tab) => tab.path === pathname)?.key || "dashboard";

  const [currentTheme, setCurrentTheme] = useState("light");
  console.log(currentTheme);
  return (
    <div>
      <div className="w-full bg-white border border-divider dark:bg-[#27272a] dark:border-[#3d3d3d] rounded-xl shadow-lg p-2 pl-[40px] pr-[40px] ">
        <div className="flex justify-between items-center">
          <div className="w-[195px] h-[55px] overflow-hidden">
            <img className="w-full h-full" src="/images/logo.png" />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <h1 className="text-sm">
                <span className="font-bold">ชื่อ: </span>
                {auth.user.name}
              </h1>
              <h1 className="text-[11px] text-right">
                <span className="font-bold">ตำเเหน่ง: </span>
                {auth.user.position_name}
              </h1>
            </div>
            <Dropdown classNames={{ content: "mt-4" }}>
              <DropdownTrigger>
                <Button isIconOnly variant="light" className="">
                  <ChevronDown
                    size={24}
                    className="text-black dark:text-white"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with shortcut"
                variant="flat"
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{auth.user.name}</p>
                </DropdownItem>
                <DropdownSection title="Setting">
                  <DropdownItem key="theme">
                    <ThemeSwitchUser
                      theme={currentTheme} // ส่งค่า theme เข้าไป
                      onChange={(newTheme) => setCurrentTheme(newTheme)} // รับค่ากลับ
                    />
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="logout">
                  {" "}
                  <DropdownItem
                    onPress={handleLogout}
                    key="logout"
                    className="text-danger"
                    color="danger"
                  >
                    logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs
          classNames={{
            tabList:
              "gap-6 w-full bg-white border border-divider dark:bg-[#27272a] dark:border-[#3d3d3d] mt-[10px] relative rounded-lg p-1 border-b border-divider px-4 dark:text-white",
            cursor: "w-full bg-default-500",
            tab: "max-w-fit ",
            tabContent:
              "group-data-[selected=true]:text-[#000000] dark:group-data-[selected=true]:text-[#ffffff]",
          }}
          aria-label="Tabs variants"
          variant="underlined"
          selectedKey={activeKey}
          onSelectionChange={(key) => {
            const tab = tabs.find((t) => t.key === key);
            if (tab) router.push(tab.path);
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.title} />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
