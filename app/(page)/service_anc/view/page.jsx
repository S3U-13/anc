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
  openViewService,
  closeViewService,
  roundData,
  formatThaiDateTime,
  formatAddress,
  btiData,
  cbeData,
  ReferralValue,
  formatThaiDateNoTime,
}) {
  return (
    <div>
      <Modal
        isOpen={openViewService}
        onOpenChange={closeViewService}
        size="5xl"
        classNames={{
          body: "border-t border-divider border-b py-[10px] overflow-y-scroll p-4",
        }}
      >
        <ModalContent>
          {(closeViewService) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center py-[30px] text-2xl font-medium">
                หน้าดูข้อมูล
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-x-4 mx-auto px-[20px] max-h-[calc(90vh-250px)] py-[10px]">
                  <span className="col-span-4 mb-2">ส่วนที่ 1</span>
                  <div className="col-span-4 grid grid-cols-4 pl-4 mb-2">
                    <span className="col-span-2">
                      รอบที่ : {roundData?.service_info.round}
                    </span>
                    <span className="col-span-2">
                      วันที่ :{" "}
                      {formatThaiDateTime(roundData?.service_info.service_date)}
                    </span>
                    <span className="col-span-2">
                      หมายเลข ANC : {roundData?.service_info.anc_no}
                    </span>
                    <span className="col-span-2">
                      หมายเลข PAT VISIT : {roundData?.service_info.patvisit_id}
                    </span>
                    <span className="col-span-2">
                      หมายเลข PAT REG : {roundData?.service_info.patreg_id}
                    </span>
                    <span className="col-span-2">
                      HN : {roundData?.wife.profile.hn}
                    </span>
                    <span className="col-span-2">
                      ชื่อ : {roundData?.wife.profile.prename}
                      {roundData?.wife.profile.firstname}
                      {roundData?.wife.profile.lastname}
                    </span>
                    <span className="col-span-2">
                      หมายเลขบัตรประชาชน :{" "}
                      {roundData?.wife.profile.citizencardno}
                    </span>
                    <span className="col-span-2">
                      อาชีพ :{" "}
                      {roundData?.wife.profile.occupation_detail.lookupname}
                    </span>
                    <span className="col-span-2">
                      ที่อยู่ :{" "}
                      {formatAddress(roundData?.wife.profile.pat_address) || ""}
                    </span>
                    <span className="col-span-2">
                      น้ำหนัก : {roundData?.wife.profile.pat_vitalsign.weight}
                    </span>
                    <span className="col-span-2">
                      น้ำหนัก : {roundData?.wife.profile.pat_vitalsign.height}{" "}
                      bmi :
                    </span>
                    <span className="col-span-2">
                      para : {roundData?.wife.text_values.para}
                    </span>
                    <span className="col-span-2">
                      g : {roundData?.wife.text_values.g}
                    </span>
                    <span className="col-span-2">
                      p : {roundData?.wife.text_values.p}
                    </span>
                    <span className="col-span-2">
                      a : {roundData?.wife.text_values.a}
                    </span>
                    <span className="col-span-2">
                      last : {roundData?.wife.text_values.last}
                    </span>
                    <span className="col-span-2">
                      lmp : {formatThaiDateNoTime(roundData?.wife.text_values.lmp)}
                    </span>
                    <span className="col-span-2">
                      edc : {formatThaiDateNoTime(roundData?.wife.text_values.edc)}
                    </span>
                    <span className="col-span-2">
                      ga : {roundData?.wife.text_values.ga}
                    </span>
                  </div>
                  <span className="col-span-4 mb-2">ส่วนที่ 2</span>
                  <div className="col-span-4 grid grid-cols-4 pl-4 mb-2">
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.ma.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.hr.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.am.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.pcr_wife.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.cordo.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.abortion.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.tdap.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.iip.choice_name}
                    </span>
                    <span className="col-span-2">
                      ประวัติการเเพ้ยา :{" "}
                      {roundData?.wife.choices.per_os.choice_name}
                    </span>
                    <span className="col-span-2">
                      ma_detail : {roundData?.wife.text_values.ma_detail}
                    </span>
                    <span className="col-span-2">
                      hr_detail : {roundData?.wife.text_values.hr_detail}
                    </span>
                    <span className="col-span-2">
                      pcr_wife_text :{" "}
                      {roundData?.wife.text_values.pcr_wife_text}
                    </span>
                    <span className="col-span-2">
                      cordo_text : {roundData?.wife.text_values.cordo_text}
                    </span>
                    <span className="col-span-2">
                      cordo_other_text :{" "}
                      {roundData?.wife.text_values.cordo_other_text}
                    </span>
                    <span className="col-span-2">
                      td_num : {roundData?.wife.text_values.td_num}
                    </span>
                    <span className="col-span-2">
                      td_last_date : {formatThaiDateNoTime(roundData?.wife.text_values.td_last_date)}
                    </span>
                    <span className="col-span-2">
                      tdap_round_1 : {formatThaiDateNoTime(roundData?.wife.text_values.tdap_round_1)}
                    </span>
                    <span className="col-span-2">
                      tdap_round_2 : {formatThaiDateNoTime(roundData?.wife.text_values.tdap_round_2)}
                    </span>
                    <span className="col-span-2">
                      tdap_round_3 : {formatThaiDateNoTime(roundData?.wife.text_values.tdap_round_3)}
                    </span>
                    <span className="col-span-2">
                      iip_date : {formatThaiDateNoTime(roundData?.wife.text_values.iip_date)}
                    </span>
                    <span className="col-span-2">
                      lab_2 : {formatThaiDateNoTime(roundData?.wife.text_values.lab_2)}
                    </span>
                    <span className="col-span-2">
                      vdrl_2 : {roundData?.wife.text_values.vdrl_2}
                    </span>
                    <span className="col-span-2">
                      hct : {roundData?.wife.text_values.hct}
                    </span>
                    <span className="col-span-2">
                      h : {roundData?.wife.text_values.h}
                    </span>
                  </div>

                  <div className="col-span-4 grid grid-cols-1 gap-1 mt-2 pl-4">
                    {btiData.length > 0 ? (
                      btiData.map((item, index) => (
                        <span key={index}>
                          {item.value}
                          {item.date && (
                            <span className=" ml-2">
                              วันที่ : {formatThaiDateNoTime(item.date)}
                            </span>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="col-span-2 text-gray-400">
                        ไม่มีข้อมูลการแปลผล
                      </span>
                    )}
                  </div>
                  <div className="col-span-4 grid grid-cols-1 gap-1 mt-2 pl-4 mb-2">
                    {cbeData.length > 0 ? (
                      cbeData.map((item, index) => (
                        <span key={index}>
                          {item.value}
                          {item.value === "ไม่ปกติ" && (
                            <span className="ml-2">{item.data}</span>
                          )}
                          {item.value === "ANC Pap smear" && (
                            <span className="ml-2">ผลตรวจ : {item.data}</span>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="col-span-2 text-gray-400">
                        ไม่มีข้อมูลการแปลผล
                      </span>
                    )}
                  </div>

                  <span className="col-span-4 mb-2">ส่วนที่ 3 ค่า lab (ภรรยา)</span>
                  <div className="col-span-4 grid grid-cols-4 pl-4 mb-2">
                    <span className="col-span-2">
                      gct_1_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.gct_1_wife}
                    </span>
                    <span className="col-span-2">
                      gct_2_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.gct_2_wife}
                    </span>
                    <span className="col-span-2">
                      ogtt_1_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.ogtt_1_wife}
                    </span>
                    <span className="col-span-2">
                      ogtt_2_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.ogtt_2_wife}
                    </span>
                    <span className="col-span-2">
                      hbsag_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.hbsag_wife}
                    </span>
                    <span className="col-span-2">
                      vdrl_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.vdrl_wife}
                    </span>
                    <span className="col-span-2">
                      anti_hiv_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.anti_hiv_wife}
                    </span>
                    <span className="col-span-2">
                      bl_gr_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.bl_gr_wife}
                    </span>
                    <span className="col-span-2">
                      rh_wife : {roundData?.wife.text_values.lab_wife.rh_wife}
                    </span>
                    <span className="col-span-2">
                      hct_wife : {roundData?.wife.text_values.lab_wife.hct_wife}
                    </span>
                    <span className="col-span-2">
                      of_wife : {roundData?.wife.text_values.lab_wife.of_wife}
                    </span>
                    <span className="col-span-2">
                      dcip_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.dcip_wife}
                    </span>
                    <span className="col-span-2">
                      mcv_wife : {roundData?.wife.text_values.lab_wife.mcv_wife}
                    </span>
                    <span className="col-span-2">
                      mch_wife : {roundData?.wife.text_values.lab_wife.mch_wife}
                    </span>
                    <span className="col-span-2">
                      hb_typing_wife :{" "}
                      {roundData?.wife.text_values.lab_wife.hb_typing_wife}
                    </span>
                  </div>
                  <span className="col-span-4 mb-2">ส่วนที่ 4 (สามี)</span>
                  <div className="col-span-4 grid grid-cols-4 pl-4 mb-2">
                    <span className="col-span-2">
                      HN : {roundData?.husband.profile.hn}
                    </span>
                    <span className="col-span-2">
                      ชื่อ : {roundData?.husband.profile.prename}
                      {roundData?.husband.profile.firstname}
                      {roundData?.husband.profile.lastname}
                    </span>
                    <span className="col-span-2">
                      หมายเลขบัตรประชาชน :{" "}
                      {roundData?.husband.profile.citizencardno}
                    </span>
                    <span className="col-span-2">
                      อาชีพ :{" "}
                      {roundData?.husband.profile.occupation_detail.lookupname}
                    </span>
                  </div>
                  <span className="col-span-4 mb-2">ค่า Lab (สามี)</span>
                  <div className="col-span-4 grid grid-cols-4 pl-4 mb-2">
                    <span className="col-span-2">
                      hbsag_husband :{" "}
                      {roundData?.husband.choices.lab_husband.hbsag_husband}
                    </span>
                    <span className="col-span-2">
                      vdrl_husband :{" "}
                      {roundData?.husband.choices.lab_husband.vdrl_husband}
                    </span>
                    <span className="col-span-2">
                      anti_hiv_husband :{" "}
                      {roundData?.husband.choices.lab_husband.anti_hiv_husband}
                    </span>
                    <span className="col-span-2">
                      bl_gr_husband :{" "}
                      {roundData?.husband.choices.lab_husband.bl_gr_husband}
                    </span>
                    <span className="col-span-2">
                      rh_husband :{" "}
                      {roundData?.husband.choices.lab_husband.rh_husband}
                    </span>
                    <span className="col-span-2">
                      hct_husband :{" "}
                      {roundData?.husband.choices.lab_husband.hct_husband}
                    </span>
                    <span className="col-span-2">
                      of_husband :{" "}
                      {roundData?.husband.choices.lab_husband.of_husband}
                    </span>
                    <span className="col-span-2">
                      dcip_husband :{" "}
                      {roundData?.husband.choices.lab_husband.dcip_husband}
                    </span>
                    <span className="col-span-2">
                      mcv_husband :{" "}
                      {roundData?.husband.choices.lab_husband.mcv_husband}
                    </span>
                    <span className="col-span-2">
                      mch_husband :{" "}
                      {roundData?.husband.choices.lab_husband.mch_husband}
                    </span>
                    <span className="col-span-2">
                      hb_typing_husband :{" "}
                      {roundData?.husband.choices.lab_husband.hb_typing_husband}
                    </span>
                    <span className="col-span-2">
                      pcr-hus : {roundData?.husband.choices.pcr_hus.choice_name}
                    </span>
                    <span className="col-span-2">
                      pcr_hus_text : {roundData?.husband.choices.pcr_hus_text}
                    </span>
                  </div>
                  <span className="col-span-4 mb-2">ส่วนที่ 5 refer</span>
                  <div className="col-span-4 grid grid-cols-1 gap-1 pl-4">
                    {ReferralValue.length > 0 ? (
                      ReferralValue.map((item, index) => (
                        <span key={index}>
                          {item.value}
                          {item.data && ( // ✅ เปลี่ยนจาก item.data เป็น item.date
                            <div>
                              <span className="ml-2">{item.data}</span>
                              <span className="ml-2">
                                รพช./รพสต. {item.hos}
                              </span>
                              <span className="ml-2">จังหวัด {item.prov}</span>
                            </div>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="col-span-2 text-gray-400">
                        ไม่มีข้อมูลการแปลผล
                      </span>
                    )}
                  </div>
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
