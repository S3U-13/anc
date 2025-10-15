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
          base: "bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100",
          body: "border-t border-gray-200 py-6 px-6 overflow-y-auto max-h-[85vh]",
          footer: "border-t border-gray-200 flex justify-end gap-3 py-4 px-6",
        }}
      >
        <ModalContent>
          {(closeViewService) => (
            <>
              <ModalHeader className="text-center text-2xl font-semibold text-gray-800 tracking-wide py-6">
                🩺 หน้าดูข้อมูลบริการ ANC
              </ModalHeader>

              <ModalBody>
                <div className="space-y-10 text-gray-700 text-sm">
                  {/* ------------------ ส่วนที่ 1 ------------------ */}
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 border-l-4 border-blue-400 pl-3 mb-4">
                      ส่วนที่ 1 : ข้อมูลทั่วไป
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <span>รอบที่ : {roundData?.service_info.round}</span>
                      <span>
                        วันที่ :{" "}
                        {formatThaiDateTime(
                          roundData?.service_info.service_date
                        )}
                      </span>
                      <span>
                        หมายเลข ANC : {roundData?.service_info.anc_no}
                      </span>
                      <span>
                        หมายเลข PAT VISIT :{" "}
                        {roundData?.service_info.patvisit_id}
                      </span>
                      <span>
                        หมายเลข PAT REG : {roundData?.service_info.patreg_id}
                      </span>
                      <span>HN : {roundData?.wife.profile.hn}</span>
                      <span>
                        ชื่อ : {roundData?.wife.profile.prename}
                        {roundData?.wife.profile.firstname}
                        {roundData?.wife.profile.lastname}
                      </span>
                      <span>
                        เลขบัตรประชาชน : {roundData?.wife.profile.citizencardno}
                      </span>
                      <span>
                        อาชีพ :{" "}
                        {roundData?.wife.profile.occupation_detail.lookupname}
                      </span>
                      <span>
                        ที่อยู่ :{" "}
                        {formatAddress(roundData?.wife.profile.pat_address)}
                      </span>
                      <span>
                        น้ำหนัก : {roundData?.wife.profile.pat_vitalsign.weight}
                      </span>
                      <span>
                        ส่วนสูง : {roundData?.wife.profile.pat_vitalsign.height}
                      </span>
                      <span>para : {roundData?.wife.text_values.para}</span>
                      <span>g : {roundData?.wife.text_values.g}</span>
                      <span>p : {roundData?.wife.text_values.p}</span>
                      <span>a : {roundData?.wife.text_values.a}</span>
                      <span>last : {roundData?.wife.text_values.last}</span>
                      <span>
                        lmp :{" "}
                        {formatThaiDateNoTime(roundData?.wife.text_values.lmp)}
                      </span>
                      <span>
                        edc :{" "}
                        {formatThaiDateNoTime(roundData?.wife.text_values.edc)}
                      </span>
                      <span>ga : {roundData?.wife.text_values.ga}</span>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 2 ------------------ */}
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 border-l-4 border-blue-400 pl-3 mb-4">
                      ส่วนที่ 2 : ประวัติสุขภาพและความเสี่ยง
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <span>
                        ประวัติแพ้ยา : {roundData?.wife.choices.ma.choice_name}
                        {roundData?.wife.choices.ma.choice_name === "เคย" && (
                          <span className="block text-gray-500">
                            รายละเอียด : {roundData?.wife.text_values.ma_detail}
                          </span>
                        )}
                      </span>
                      <span>
                        HIGH RISK : {roundData?.wife.choices.hr.choice_name}
                        {roundData?.wife.choices.hr.choice_name === "ใช่" && (
                          <span className="block text-gray-500">
                            รายละเอียด : {roundData?.wife.text_values.hr_detail}
                          </span>
                        )}
                      </span>
                      <span>
                        แนะนำเจาะน้ำคร่ำ :{" "}
                        {roundData?.wife.choices.am.choice_name}
                      </span>
                      <span>
                        PCR : {roundData?.wife.choices.pcr_wife.choice_name}
                        {roundData?.wife.choices.pcr_wife.choice_name ===
                          "ใช่" && (
                          <span className="block text-gray-500">
                            รายละเอียด :{" "}
                            {roundData?.wife.text_values.pcr_wife_text}
                          </span>
                        )}
                      </span>
                      <span>
                        Cordo : {roundData?.wife.choices.cordo.choice_name}
                        {roundData?.wife.choices.cordo.choice_name ===
                          "ใช่" && (
                          <span className="block text-gray-500">
                            รายละเอียด :{" "}
                            {roundData?.wife.text_values.cordo_text}
                          </span>
                        )}
                      </span>
                      <span>
                        การแท้ง : {roundData?.wife.choices.abortion.choice_name}
                      </span>
                      <span>
                        ในระหว่างตั้งครรภ์ :{" "}
                        {roundData?.wife.choices.tdap.choice_name}
                        {roundData?.wife.choices.tdap.choice_name ===
                          "ฉีดวัคซีน" && (
                          <div className="text-gray-500 space-y-1 mt-1">
                            <div>
                              รอบที่ 1 :{" "}
                              {formatThaiDateNoTime(
                                roundData?.wife.text_values.tdap_round_1
                              )}
                            </div>
                            <div>
                              รอบที่ 2 :{" "}
                              {formatThaiDateNoTime(
                                roundData?.wife.text_values.tdap_round_2
                              )}
                            </div>
                            <div>
                              รอบที่ 3 :{" "}
                              {formatThaiDateNoTime(
                                roundData?.wife.text_values.tdap_round_3
                              )}
                            </div>
                          </div>
                        )}
                      </span>
                      <span>
                        ฉีดวัคซีนกระตุ้นครรภ์นี้ :{" "}
                        {roundData?.wife.choices.iip.choice_name}
                        {roundData?.wife.choices.iip.choice_name ===
                          "กระตุ้นครรภ์นี้" && (
                          <span className="block text-gray-500">
                            วันที่ :{" "}
                            {formatThaiDateNoTime(
                              roundData?.wife.text_values.iip_date
                            )}
                          </span>
                        )}
                      </span>
                      <span>
                        ได้รับยา : {roundData?.wife.choices.per_os.choice_name}
                      </span>
                      <span>
                        cordo_other_text :{" "}
                        {roundData?.wife.text_values.cordo_other_text}
                      </span>
                      <span>
                        td_num : {roundData?.wife.text_values.td_num}
                        {roundData?.wife.text_values.td_num && (
                          <span className="block text-gray-500">
                            td_last_date :{" "}
                            {formatThaiDateNoTime(
                              roundData?.wife.text_values.td_last_date
                            )}
                          </span>
                        )}
                      </span>
                      <span>
                        lab_2 :{" "}
                        {formatThaiDateNoTime(
                          roundData?.wife.text_values.lab_2
                        )}
                      </span>
                      <span>vdrl_2 : {roundData?.wife.text_values.vdrl_2}</span>
                      <span>hct : {roundData?.wife.text_values.hct}</span>
                      <span>h : {roundData?.wife.text_values.h}</span>
                    </div>

                    {/* กลุ่มสัมพันธ์ */}
                    <div className="mt-6">
                      <h3 className="text-gray-800 font-medium mb-2">
                        กลุ่มสัมพันธ์ และ ฟังผลเลือด
                      </h3>
                      {btiData.length > 0 ? (
                        btiData.map((item, index) => (
                          <div key={index} className="ml-4">
                            {item.value}
                            {item.date && (
                              <span className="ml-2">
                                วันที่ : {formatThaiDateNoTime(item.date)}
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                      )}
                    </div>

                    {/* ตรวจเต้านม */}
                    <div className="mt-6">
                      <h3 className="text-gray-800 font-medium mb-2">
                        ตรวจเต้านม, หัวนม
                      </h3>
                      {cbeData.length > 0 ? (
                        cbeData.map((item, index) => (
                          <div key={index} className="ml-4">
                            {item.value}
                            {item.value === "ไม่ปกติ" && (
                              <span className="ml-2">{item.data}</span>
                            )}
                            {item.value === "ANC Pap smear" && (
                              <span className="ml-2">ผลตรวจ : {item.data}</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                      )}
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 3 ------------------ */}
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 border-l-4 border-blue-400 pl-3 mb-4">
                      ส่วนที่ 3 : ค่า Lab (ภรรยา)
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(
                        roundData?.wife.text_values.lab_wife || {}
                      ).map(([key, value]) => (
                        <span key={key}>
                          {key} : {value}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 4 ------------------ */}
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 border-l-4 border-blue-400 pl-3 mb-4">
                      ส่วนที่ 4 : ข้อมูลสามี
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <span>HN : {roundData?.husband.profile.hn}</span>
                      <span>
                        ชื่อ : {roundData?.husband.profile.prename}
                        {roundData?.husband.profile.firstname}
                        {roundData?.husband.profile.lastname}
                      </span>
                      <span>
                        บัตร ปชช. : {roundData?.husband.profile.citizencardno}
                      </span>
                      <span>
                        อาชีพ :{" "}
                        {
                          roundData?.husband.profile.occupation_detail
                            .lookupname
                        }
                      </span>
                    </div>

                    <h3 className="text-gray-800 font-medium mt-6 mb-2">
                      ค่า Lab (สามี)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(
                        roundData?.husband.choices.lab_husband || {}
                      ).map(([key, value]) => (
                        <span key={key}>
                          {key} : {value}
                        </span>
                      ))}
                      <span>
                        pcr-hus :{" "}
                        {roundData?.husband.choices.pcr_hus.choice_name}
                      </span>
                      <span>
                        pcr_hus_text : {roundData?.husband.choices.pcr_hus_text}
                      </span>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 5 ------------------ */}
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 border-l-4 border-blue-400 pl-3 mb-4">
                      ส่วนที่ 5 : ข้อมูล Refer
                    </h2>

                    {ReferralValue.length > 0 ? (
                      ReferralValue.map((item, index) => (
                        <div key={index} className="ml-4">
                          {item.value}
                          {item.data && (
                            <div className="text-gray-500 ml-3">
                              <span>{item.data}</span>
                              <span className="ml-2">รพ. {item.hos}</span>
                              <span className="ml-2">จังหวัด {item.prov}</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                    )}
                  </section>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={closeViewService}
                  className="px-6 py-2 text-sm rounded-xl font-medium hover:bg-red-50"
                >
                  ปิดหน้าต่าง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
