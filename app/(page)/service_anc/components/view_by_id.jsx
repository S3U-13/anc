"use client";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

export default function ViewById({ item, handleSelectRound }) {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#71717A]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="round-select">
          {item.rounds.map((r) => (
            <DropdownItem
              key={r.id}
              onClick={() => handleSelectRound(r.id)} // ✅ ส่ง id ที่เลือก
            >
              {r.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
