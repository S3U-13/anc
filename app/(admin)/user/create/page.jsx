"use client";
import React, { useState } from "react";
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
import { Eye, EyeOff } from "@deemlol/next-icons";

export default function Page({ openModal, closeModal, modalRef }) {
  const { role, position, form, validationSchema, handleChange, isSubmitting } =
    useHook({ closeModal });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Modal
      isOpen={openModal}
      onOpenChange={closeModal}
      placement="center"
      classNames={{
        header: "border-b border-divider ",
        footer: "border-t border-divider ",
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
              <h1 className="text-lg font-semibold text-gray-500 tracking-wide">
                เพิ่มผู้ใช้งาน
              </h1>
              <p className="text-sm text-gray-500">
                กรอกข้อมูลให้ครบถ้วนก่อนบันทึก
              </p>
            </ModalHeader>

            {/* Body */}
            <ModalBody>
              <section className=" rounded-2xl border border-divider shadow-sm p-5 space-y-4">
                <h2 className="text-gray-500 font-semibold text-base border-b border-divider  pb-1">
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
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-solid outline-transparent"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Eye className="text-xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeOff className="text-xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="รหัสผ่าน"
                        type={isVisible ? "text" : "password"}
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
                        type={isVisible ? "text" : "password"}
                        size="sm"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </form.Field>
                </div>
              </section>

              <section className="rounded-2xl border border-divider  shadow-sm p-5 space-y-4">
                <h2 className="text-gray-500 font-semibold text-base border-b border-divider  pb-1">
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
