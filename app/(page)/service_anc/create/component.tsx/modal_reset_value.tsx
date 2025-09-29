import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useState } from "react";

export default function page({ openModalReset, closeModalReset }) {
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
                  color="danger"
                  onPress={() => {
                    onReset(); // เรียกฟังก์ชันรีเซ็ตข้อมูล
                    close();
                  }}
                >
                  รีเซ็ต
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
