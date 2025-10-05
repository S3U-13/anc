import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import React, { useState } from "react";

export default function page({ openModalReset, closeModalReset, onReset }) {
  return (
    <div>
      <Modal
        size="sm"
        backdrop="blur"
        isOpen={openModalReset}
        onOpenChange={closeModalReset}
        classNames={{
          header: "text-center text-xl border-b border-divider",
          footer: "border-t border-divider flex justify-end gap-2",
          body: "py-4 text-center",
        }}
      >
        <ModalContent>
          {(closeModalReset) => (
            <>
              <ModalHeader>ยืนยันการรีเซ็ตข้อมูล</ModalHeader>
              <ModalBody>
                ข้อมูลทั้งหมดจะถูกล้างและไม่สามารถกู้คืนได้ <br />
                คุณต้องการดำเนินการต่อหรือไม่?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="light"
                  onPress={closeModalReset}
                >
                  ยกเลิก
                </Button>
                <Button
                  type="reset"
                  color="danger"
                  onPress={() => {
                    onReset(); // ✅ reset field ใน parent
                    closeModalReset();
                    addToast({
                      title: "รีเซ็ต",
                      description: "รีเซ็ตข้อมูลสำเร็จ",
                      variant: "solid",
                      color: "foreground",
                    });
                  }}
                >
                  ยืนยัน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
