"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useState } from "react";
import useHook from "./useHook";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Eye, EyeOff } from "@deemlol/next-icons";

export default function page({
  openModalEdit,
  closeModalEdit,
  modalRef,
  dataUserById,
  selectedUserId,
}) {
  const { role, position, form, validationSchema, handleChange, isSubmitting } =
    useHook({ openModalEdit, closeModalEdit, dataUserById, selectedUserId });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div>
      {" "}
      <Modal
        isOpen={openModalEdit}
        onOpenChange={closeModalEdit}
        size="lg"
        placement="center"
        classNames={{
          header: "border-b border-divider",
          footer: "border-t border-divider",
        }}
      >
        <ModalContent ref={modalRef}>
          {(closeModalEdit) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              {/* Header */}
              <ModalHeader className="flex flex-col text-center py-6 gap-1">
                <h1 className="text-xl font-semibold ">แก้ไขข้อมูลผู้ใช้งาน</h1>
                <p className="text-sm  dark:text-gray-400">
                  ปรับปรุงข้อมูลผู้ใช้ในระบบให้ถูกต้อง
                </p>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="py-6 px-8">
                <section className=" rounded-2xl border border-divider  shadow-sm p-5 space-y-4">
                  <h2 className=" font-semibold text-base border-b border-divider  pb-1">
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
                          label="รหัสผ่านใหม่ (หากต้องการเปลี่ยน)"
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

                <section className=" rounded-2xl border border-divider  shadow-sm p-5 space-y-4">
                  <h2 className=" font-semibold text-base border-b border-divider  pb-1">
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
              <ModalFooter className="flex justify-end py-4 px-6 gap-3">
                <Button
                  color="default"
                  variant="flat"
                  onPress={closeModalEdit}
                  className="rounded-lg"
                >
                  ยกเลิก
                </Button>

                <Button
                  type="submit"
                  color="danger"
                  isDisabled={isSubmitting}
                  className="rounded-lg"
                >
                  {isSubmitting ? "กำลังบันทึก" : "บันทึกการแก้ไข"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
