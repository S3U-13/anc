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

export default function Page({ openModal, closeModal, modalRef }) {
  const { role, position, form, validationSchema, handleChange, isSubmitting } =
    useHook({ closeModal });
  return (
    <Modal
      isOpen={openModal}
      onOpenChange={closeModal}
      placement="center"
      classNames={{
        base: "max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200",
        header: "border-b border-gray-100 bg-blue-50/60 text-gray-700",
        footer: "border-t border-gray-100 bg-gray-50",
        body: "bg-white",
      }}
    >
      <ModalContent ref={modalRef}>
        {(closeModal) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="text-[15px] text-gray-700"
          >
            {/* Header */}
            <ModalHeader className="flex flex-col items-center gap-1 py-5">
              <h1 className="text-lg font-semibold text-blue-600 tracking-wide">
                เพิ่มผู้ใช้งาน
              </h1>
              <p className="text-sm text-gray-500">
                กรอกข้อมูลให้ครบถ้วนก่อนบันทึก
              </p>
            </ModalHeader>

            {/* Body */}
            <ModalBody>
              <section className="bg-white dark:bg-[#27272a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 space-y-4">
                <h2 className="text-blue-500 font-semibold text-base border-b border-blue-100 dark:border-gray-600 pb-1">
                  ข้อมูลทั่วไป
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <form.Field name="name">
                    {(field) => (
                      <Input
                        label="ชื่อ"
                        size="sm"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="text-sm"
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
                        className="text-sm"
                      />
                    )}
                  </form.Field>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <form.Field name="password">
                    {(field) => (
                      <Input
                        label="รหัสผ่านใหม่ (หากต้องการเปลี่ยน)"
                        type="password"
                        size="sm"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </form.Field>

                  <form.Field name="confirm_password">
                    {(field) => (
                      <Input
                        label="ยืนยันรหัสผ่านใหม่"
                        type="password"
                        size="sm"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </form.Field>
                </div>
              </section>

              <section className="bg-white dark:bg-[#27272a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 space-y-4">
                <h2 className="text-blue-500 font-semibold text-base border-b border-blue-100 dark:border-gray-600 pb-1">
                  สิทธิ์และตำแหน่ง
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <form.Field name="position_id">
                    {(field) => (
                      <Select
                        label="ตำแหน่ง"
                        placeholder="เลือกตำแหน่ง"
                        size="sm"
                        onSelectionChange={(key) =>
                          field.handleChange(Number(Array.from(key)[0]))
                        }
                        selectedKeys={
                          field.state.value ? [String(field.state.value)] : []
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
                        selectedKeys={
                          field.state.value ? [String(field.state.value)] : []
                        }
                      >
                        {role.map((r) => (
                          <SelectItem key={r.id}>{r.role_name}</SelectItem>
                        ))}
                      </Select>
                    )}
                  </form.Field>
                </div>
              </section>
            </ModalBody>

            {/* Footer */}
            <ModalFooter className="flex justify-end gap-2 px-6 py-4">
              <Button
                color="default"
                variant="flat"
                onPress={closeModal}
                className="rounded-xl text-gray-600"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                color="primary"
                className="rounded-xl bg-blue-600 text-white px-6"
                isDisabled={isSubmitting}
              >
                เพิ่มผู้ใช้
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
