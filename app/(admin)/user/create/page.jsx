"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export default function page({ openModal, closeModal }) {
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  return (
    <div>
      <Modal
        isOpen={openModal}
        onOpenChange={closeModal}
        classNames={{
          header: "border-b border-divider dark:border-[#3d3d3d]",
          footer: "border-t border-divider dark:border-[#3d3d3d]",
        }}
      >
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center py-[30px]">
                เพิ่มผู้ใช้งาน
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-[10px] px-[40px] py-[10px]">
                  <Input label="ชื่อ" size="sm" />
                  <Input label="ชื่อผู้ใช้" size="sm" />
                  <Input label="รหัสผ่าน" size="sm" />
                  <Input label="ยืนยันรหัสผ่าน" size="sm" />
                  <Select
                    className="w-full"
                    label="ตำเเหน่ง"
                    placeholder="ระบุ ตำเเหน่ง"
                    size="sm"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    className="w-full"
                    label="บทบาท"
                    placeholder="ระบุ บทบาท"
                    size="sm"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModal}>
                  Close
                </Button>
                <Button color="primary" onPress={closeModal}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
