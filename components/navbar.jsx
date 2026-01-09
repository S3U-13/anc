"use client";
import React from "react";
import { useDrawer } from "@/context/drawerProvider";
import { Button } from "@heroui/button";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@heroui/badge";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import {
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Bell } from "@deemlol/next-icons";

export default function Navbar() {
  const { user } = useAuth();
  const { openDrawer, setOpenDrawer } = useDrawer();
  const getAvatarSrc = (role) => {
    switch (role) {
      case 1:
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJ1cM6gCghQwI5w0jX7hHIFMUqPicfZTwpQ&s";
      case 2:
        return "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png";
      case 3:
        return "https://media.tenor.com/I9qt03YKkjQAAAAe/monkey-thinking.png";
      default:
        return "https://www.example.com/default-avatar.png";
    }
  };
  return (
    <div className="h-18 w-full p-6 dark:border dark:border-divider rounded-lg flex items-center justify-between px-4 bg-white shadow-sm dark:bg-[#0e0e11]">
      <Button
        className="bg-gray-100  dark:bg-[#27272a]"
        size="md"
        variant="solid"
        onPress={() => {
          openDrawer === true ? setOpenDrawer(false) : setOpenDrawer(true);
        }}
        isIconOnly
      >
        {openDrawer === false && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {openDrawer === true && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        )}
      </Button>
      <div className="flex items-center gap-4">
        <div className="text-xs">
          <p>
            <strong>Name : </strong>
            {""}
            {user.name}
          </p>
          <div className="flex items-center gap-2">
            <p>
              <strong>Position :</strong> {user.position}
            </p>
          </div>
        </div>
        <Dropdown
          placement="bottom-start"
          classNames={{
            base: "before:bg-default-200", // change arrow background
            content:
              "py-2 px-1 border border-default-200 bg-linear-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
          }}
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              color="success"
              radius="full"
              src={getAvatarSrc(user?.role_id)}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" variant="faded">
            <DropdownSection showDivider title="User Detail">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">{user.name}</p>
                <p className="font-bold">@{user.username}</p>
                <p className="font-bold">Position : {user.position}</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="feature">
              {" "}
              <DropdownItem
                className="text-danger"
                color="danger"
                key="upload"
                description="ยังใช้ไม่ได้ทำไว้ก่อนเพื่ออนาคต"
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                    <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                  </svg>
                }
              >
                Upload Profile
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        {/* <Badge color="danger" content="99+" shape="circle">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                aria-label="more than 99 notifications"
                radius="full"
                variant="flat"
                size="sm"
              >
                <Bell size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Badge> */}
      </div>
    </div>
  );
}
