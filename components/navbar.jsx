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

export default function Navbar() {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    Cookies.remove("token"); // ลบ token
    router.push("/"); // กลับไปหน้า login
  };

  const tabs = [
    { key: "dashboard", title: "สรุปผล", path: "/dashboard" },
    { key: "anc", title: "หน้าทะเบียนฝากครรภ์", path: "/anc" },
    { key: "service_anc", title: "หน้าบริการฝากครรภ์", path: "/service_anc" },
  ];

  const activeKey =
    tabs.find((tab) => tab.path === pathname)?.key || "dashboard";
  return (
    <div>
      <div className="w-full bg-white rounded-xl shadow-lg p-2 pl-[40px] pr-[40px] ">
        <div className="flex justify-between items-center">
          <div className="w-[195px] h-[55px] overflow-hidden">
            <img className="w-full h-full" src="/images/logo.png" />
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-6"
                endContent={<ChevronDown size={24} color="#000000" />}
              >
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
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with shortcut"
              variant="flat"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onPress={handleLogout}
                key="logout"
                className="text-danger"
                color="danger"
              >
                logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs
          classNames={{
            tabList:
              "gap-6 w-full bg-[#ffffff] mt-[10px] relative rounded-lg p-1 border-b border-divider px-4",
            cursor: "w-full bg-[#7828C8]",
            tab: "max-w-fit ",
            tabContent: "group-data-[selected=true]:text-[#000000]",
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
