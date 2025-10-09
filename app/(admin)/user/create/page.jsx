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

export default function Page({ openModal, closeModal }) {
  const { role, position, form, validationSchema, handleChange } = useHook();

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
    <Modal isOpen={openModal} onOpenChange={closeModal}>
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className="text-center py-6">
              เพิ่มผู้ใช้งาน
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 gap-4 px-10 py-4">
                {/* Name */}
                <form.Field
                  name="name"
                  validators={{ onChange: (v) => validateField("name", v) }}
                >
                  {(field) => (
                    <Input
                      label="ชื่อ"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>

                {/* User Name */}
                <form.Field
                  name="user_name"
                  validators={{
                    onChange: (v) => validateField("user_name", v),
                  }}
                >
                  {(field) => (
                    <Input
                      label="ชื่อผู้ใช้"
                      size="sm"
                      value={field.state.value}
                      onChange={(e) =>
                        handleChange("user_name", e.target.value)
                      }
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>

                {/* Password */}
                <form.Field
                  name="password"
                  validators={{ onChange: (v) => validateField("password", v) }}
                >
                  {(field) => (
                    <Input
                      label="รหัสผ่าน"
                      size="sm"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => handleChange("password", e.target.value)}
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>

                {/* Confirm Password */}
                <form.Field
                  name="confirm_password"
                  validators={{
                    onChange: (v) =>
                      validationSchema
                        .pick({ password: true, confirm_password: true })
                        .superRefine((data, ctx) => {
                          if (v !== form.getFieldValue("password")) {
                            ctx.addIssue({
                              code: "custom",
                              path: ["confirm_password"],
                              message: "รหัสผ่านไม่ตรงกัน",
                            });
                          }
                        })
                        .safeParse({
                          password: form.getFieldValue("password"),
                          confirm_password: v,
                        }).success
                        ? true
                        : "รหัสผ่านไม่ตรงกัน",
                  }}
                >
                  {(field) => (
                    <Input
                      label="ยืนยันรหัสผ่าน"
                      size="sm"
                      type="password"
                      value={field.state.value}
                      onChange={(e) =>
                        handleChange("confirm_password", e.target.value)
                      }
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>

                {/* Position */}
                <form.Field
                  name="position"
                  validators={{ onChange: (v) => validateField("position", v) }}
                >
                  {(field) => (
                    <Select
                      label="ตำแหน่ง"
                      placeholder="ระบุ ตำแหน่ง"
                      size="sm"
                      onSelectionChange={(key) => handleChange("position", key)}
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    >
                      {position?.map((pos) => (
                        <SelectItem key={pos.id}>
                          {pos.position_name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </form.Field>

                {/* Role */}
                <form.Field
                  name="role"
                  validators={{ onChange: (v) => validateField("role", v) }}
                >
                  {(field) => (
                    <Select
                      label="บทบาท"
                      placeholder="ระบุ บทบาท"
                      size="sm"
                      onSelectionChange={(key) => handleChange("role", key)}
                      onBlur={field.handleBlur}
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]?.message}
                    >
                      {role?.map((r) => (
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
              <Button color="primary" onPress={() => form.handleSubmit()}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
