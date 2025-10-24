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
import { Select, SelectItem } from "@heroui/select";
import useHook from "./useHook";
import { DatePicker } from "@heroui/date-picker";

export default function Page({ openModal, closeModal }) {
  const {
    role,
    position,
    form,
    validationSchema,
    handleChange,
    isSubmitting,
    modalRef,
  } = useHook({ closeModal });

  // ฟังก์ชัน validate field แบบ safe
  const validateField = (fieldName, value) => {
    try {
      validationSchema
        .pick({ [fieldName]: true })
        .parse({ [fieldName]: value });
      return true;
    } catch (err) {
      return err?.errors?.[0]?.message;
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onOpenChange={closeModal}
      classNames={{
        header: "border-b border-divider dark:border-[#3d3d3d]",
        footer: "border-t border-divider dark:border-[#3d3d3d]",
      }}
      placement="center"
    >
      <ModalContent ref={modalRef}>
        {(closeModal) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <ModalHeader className="flex flex-col gap-1 text-center py-[30px]">
              เพิ่มผู้ใช้งาน
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 gap-4 px-[20px] py-[10px]">
                <form.Field name="name">
                  {(field) => (
                    <Input
                      label="ชื่อ"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="user_name">
                  {(field) => (
                    <Input
                      label="ชื่อผู้ใช้"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="password">
                  {(field) => (
                    <Input
                      label="รหัสผ่าน"
                      type="password"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="confirm_password">
                  {(field) => (
                    <Input
                      label="ยืนยันรหัสผ่าน"
                      type="password"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="position_id">
                  {(field) => (
                    <Select
                      label="ตำแหน่ง"
                      placeholder="เลือกตำแหน่ง"
                      size="sm"
                      onSelectionChange={(key) =>
                        field.handleChange(Number(Array.from(key)[0]))
                      }
                    >
                      {position.map((pos) => (
                        <SelectItem key={pos.id}>
                          {pos.position_name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </form.Field>

                <form.Field name="role_id">
                  {(field) => (
                    <Select
                      label="บทบาท"
                      placeholder="เลือกบทบาท"
                      size="sm"
                      onSelectionChange={(key) =>
                        field.handleChange(Number(Array.from(key)[0]))
                      }
                    >
                      {role.map((r) => (
                        <SelectItem key={r.id}>{r.role_name}</SelectItem>
                      ))}
                    </Select>
                  )}
                </form.Field>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                Close
              </Button>
              <Button type="submit" color="primary" isDisabled={isSubmitting}>
                เพิ่มผู้ใช้
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
