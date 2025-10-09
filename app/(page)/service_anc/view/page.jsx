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

export default function page({ openViewService, closeViewService, roundData, formatThaiDateTime }) {
  return (
    <div>
      <Modal
        isOpen={openViewService}
        onOpenChange={closeViewService}
        size="5xl"
        classNames={{
            body: "border-t border-divider border-b py-[25px]" ,
        }}
      >
        <ModalContent>
          {(closeViewService) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center py-[30px] text-2xl font-medium">
                หน้าดูข้อมูล
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-x-4 mx-auto px-[20px]">
                  <span className="col-span-2">หมายเลข ANC : {roundData?.anc_no}</span>
                  <span className="col-span-2">
                    หมายเลข PAT VISIT : {roundData?.patvisit_id}
                  </span>
                  <span className="col-span-4">
                    หมายเลข PAT REG : {roundData?.patreg_id}
                  </span>
                  <span className="col-span-2">รอบที่ : {roundData?.round}</span>
                  <span className="col-span-2">วันที่ : {formatThaiDateTime(roundData?.service_date)}</span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={closeViewService}
                >
                  Close
                </Button>
                {/* <Button color="primary" onPress={closeViewService}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
