"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";

export default function page({
  openModalView,
  closeModalView,
  modalRef,
  dataUserById,
}) {
  return (
    <div>
      <Modal
        isOpen={openModalView}
        onOpenChange={closeModalView}
        size="lg"
        placement="center"
      >
        <ModalContent ref={modalRef}>
          {(closeModalView) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1 border-b border-divider pb-2">
                <h1 className="text-xl font-semibold text-gray-500">
                  ดูข้อมูลผู้ใช้
                </h1>
                <p className="text-sm text-gray-500 ">
                  รายละเอียดข้อมูลผู้ใช้งานในระบบ
                </p>
              </ModalHeader>

              <ModalBody className="py-5 px-6">
                <section className=" rounded-2xl border border-divider shadow-sm p-4 space-y-3">
                  <h2 className="text-gray-500 font-semibold text-base border-b border-divider pb-1">
                    ข้อมูลทั่วไป
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-md">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ID:
                      </span>{" "}
                      <span>{dataUserById?.id || "-"}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ชื่อ:
                      </span>{" "}
                      <span>{dataUserById?.name || "-"}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ชื่อผู้ใช้:
                      </span>{" "}
                      <span>{dataUserById?.user_name || "-"}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ตำแหน่ง:
                      </span>{" "}
                      <span>
                        {dataUserById?.Position?.position_name || "-"}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        บทบาท:
                      </span>{" "}
                      <span>{dataUserById?.Role?.role_name || "-"}</span>
                    </div>
                  </div>
                </section>
              </ModalBody>

              <ModalFooter className="border-t border-divider pt-3">
                <Button
                  color="default"
                  variant="flat"
                  onPress={closeModalView}
                  className="rounded-lg"
                >
                  ปิด
                </Button>
                <Button
                  color="primary"
                  onPress={closeModalView}
                  className="bg-blue-600 text-white rounded-lg"
                >
                  ตกลง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
