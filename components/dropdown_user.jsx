"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";

export default function DropdownUser() {
  const auth = useAuth();
  const { logoutAPI } = useApiRequest();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAPI();
      Cookies.remove("token"); // ✅ ลบ token ที่ frontend
      router.push("/"); // กลับไปหน้า login
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Dropdown classNames={{ content: "p-2 mt-4" }} placement="bottom-start">
        <DropdownTrigger>
          <Button
            isIconOnly
            aria-label="Like"
            size="sm"
            color="default"
            variant="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-default-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="shadow">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{auth.user.name}</p>
            <p className="font-bold">ตำเเหน่ง {auth.user.position_name}</p>
          </DropdownItem>
          <DropdownItem
            onPress={handleLogout}
            key="logout"
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
