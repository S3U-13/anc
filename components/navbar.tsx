'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, ButtonGroup } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import { ChevronDown } from "@deemlol/next-icons";
import { Tabs, Tab } from "@heroui/tabs";

export default function Navbar() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token"); // ลบ token
        router.push("/login"); // กลับไปหน้า login
    };
    return (
        <div>
            <div className='w-full bg-white rounded-xl shadow-lg p-2 pl-[40px] pr-[40px] '>
                <div className='flex justify-between items-center'>
                    <div className='w-[195px] h-[55px] overflow-hidden'>
                        <img className='w-full h-full' src="/images/logo.png" />
                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light" className='p-6' endContent={<ChevronDown size={24} color="#000000" />}>
                                <div className='flex flex-col items-start'>
                                    <h1 className='text-sm'><span className='font-bold'>ชื่อ: </span>user_01</h1>
                                    <h1 className='text-[11px] text-right'><span className='font-bold'>ตำเเหน่ง: </span>-</h1>
                                </div>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown menu with shortcut" variant="flat">
                            <DropdownItem key="new" shortcut="⌘N">
                                New file
                            </DropdownItem>
                            <DropdownItem key="copy" shortcut="⌘C">
                                Copy link
                            </DropdownItem>
                            <DropdownItem key="edit" shortcut="⌘⇧E">
                                Edit file
                            </DropdownItem>
                            <DropdownItem onPress={handleLogout} key="logout" className="text-danger" color="danger">
                                logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className='flex justify-center'>
                <Tabs classNames={{
                    tabList: "gap-6 w-full bg-[#ffffff] mt-[10px] relative rounded-lg p-1 border-b border-divider px-4",
                    cursor: "w-full bg-[#7828C8]",
                    tab: "max-w-fit ",
                    tabContent: "group-data-[selected=true]:text-[#000000]",
                }} aria-label="Tabs variants" variant="underlined">
                    <Tab key="dashboard" onClick={() => router.push('/dashboard')} title="สรุปผล" />
                    <Tab key="anc" onClick={() => router.push('/anc')} title="หน้าทะเบียนฝากครรภ์" />
                    <Tab key="service anc" onClick={() => router.push('/service_anc')} title="หน้าบริการฝากครรภ์" />
                </Tabs>
            </div>
        </div>
    )
}