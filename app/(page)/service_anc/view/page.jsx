"use client";
import { AlertCircle, AlertOctagon } from "@deemlol/next-icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";
import { Alert } from "@heroui/alert";
import { Tooltip } from "@heroui/tooltip";

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
  LabWife,
  LabHusband,
  calculateAge,
  bmi,
  bp,
  height,
}) {
  return (
    <div>
      <Modal
        isOpen={openViewService}
        onOpenChange={closeViewService}
        size="4xl"
        classNames={{
          base: "bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100",
          body: "border-t border-gray-200 py-6 px-6 overflow-y-auto max-h-[calc(85vh-110px)]",
          footer: "border-t border-gray-200 flex justify-end gap-3 py-4 px-6",
        }}
      >
        <ModalContent>
          {(closeViewService) => (
            <>
              <ModalHeader className="flex justify-center text-center text-2xl font-semibold text-gray-800 tracking-wide py-6">
                หน้าดูข้อมูลบริการ ANC
              </ModalHeader>

              <ModalBody>
                <div className="space-y-10 text-gray-700 text-sm">
                  {/* ------------------ ส่วนที่ 1 ------------------ */}
                  <section className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-3 mb-5">
                      ส่วนที่ 1 : ข้อมูลทั่วไป
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 pb-2" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 px-6">
                      <span>
                        <strong className="text-gray-900">รอบที่ :</strong>{" "}
                        {roundData?.service_info.round}
                      </span>

                      <span>
                        <strong className="text-gray-900">วันที่ :</strong>{" "}
                        {formatThaiDateTime(
                          roundData?.service_info.service_date
                        )}
                      </span>

                      <span>
                        <strong className="text-gray-900">หมายเลข ANC :</strong>{" "}
                        {roundData?.service_info.anc_no}
                      </span>
                      <span>
                        <strong className="text-gray-900">HN :</strong>{" "}
                        {roundData?.wife.profile.hn}
                      </span>
                      <span>
                        <strong className="text-gray-900">
                          หมายเลข PAT VISIT :
                        </strong>{" "}
                        {roundData?.service_info.patvisit_id}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          PAT VISIT DATE :
                        </strong>{" "}
                        {formatThaiDateTime(
                          roundData?.wife.profile.pat_reg[0].PatVisit
                            .visitdatetime
                        )}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          หมายเลข PAT REG :
                        </strong>{" "}
                        {roundData?.service_info.patreg_id}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          PAT REG LOCATION :
                        </strong>{" "}
                        {roundData?.wife.profile.pat_reg[0].Location.detailtext}
                      </span>

                      <span>
                        <strong className="text-gray-900">ชื่อ :</strong>{" "}
                        {`${roundData?.wife.profile.prename}${roundData?.wife.profile.firstname} ${roundData?.wife.profile.lastname}`}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          เลขบัตรประชาชน :
                        </strong>{" "}
                        {roundData?.wife.profile.citizencardno}
                      </span>
                      <span className="flex gap-1 items-center">
                        <strong className="text-gray-900">อายุ :</strong>{" "}
                        {(() => {
                          const age = calculateAge(
                            roundData?.wife.profile.birthdatetime
                          );
                          if (!age) return null;

                          const isRisk = age >= "35";

                          return (
                            <div className="flex items-center">
                              <span className="text-gray-900 font-medium">
                                {age}
                              </span>
                              {isRisk && (
                                // <Tooltip
                                //   content={
                                //     <div className="px-1 py-2">
                                //       <div className="text-small font-bold">
                                //         Custom Content
                                //       </div>
                                //       <div className="text-tiny">
                                //         This is a custom tooltip content
                                //       </div>
                                //     </div>
                                //   }
                                // >
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold ml-2 flex gap-1 items-center">
                                  <AlertOctagon size={18} />{" "}
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                                // </Tooltip>
                              )}
                            </div>
                          );
                        })()}
                      </span>
                      <span>
                        <strong className="text-gray-900">อาชีพ :</strong>{" "}
                        {roundData?.wife.profile.occupation_detail.lookupname}
                      </span>
                      <span>
                        <strong className="text-gray-900">เบอร์โทร :</strong>{" "}
                        {roundData?.wife.profile.pat_address.phone}
                      </span>
                      <span>
                        <strong className="text-gray-900">Email :</strong>{" "}
                        {roundData?.wife.profile.pat_address.email || "ไม่ระบุ"}
                      </span>
                      <span className="col-span-2">
                        <strong className="text-gray-900">ที่อยู่ :</strong>{" "}
                        {formatAddress(roundData?.wife.profile.pat_address)}
                      </span>

                      <hr className="col-span-2 my-2 border-gray-200" />

                      <span>
                        <strong className="text-gray-900">น้ำหนัก :</strong>{" "}
                        {`${Math.round(roundData?.wife.profile.pat_vitalsign[0].weight)} กก.`}
                      </span>

                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900">ส่วนสูง :</strong>{" "}
                        {height && (
                          <div className="flex items-center gap-1">
                            <span>{`${height} ซม.`}</span>
                            {height <= 140 && (
                              <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                <AlertOctagon size={18} />
                                <span className="text-[12px]">
                                  ต่ำกว่าเกณฑ์
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </span>

                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900">BMI :</strong>
                        {bmi && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-900 font-medium">
                              {bmi}
                            </span>
                            {bmi <= 18.5 && (
                              <Tooltip
                                className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold"
                                content={
                                  <div className="px-1 py-2">
                                    <div className="text-small font-bold">
                                      มีความเสี่ยง
                                    </div>
                                    <div className="text-tiny">
                                      BMI ต่ำกว่าเกณฑ์
                                    </div>
                                  </div>
                                }
                              >
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon size={18} />
                                  <span className="text-[12px]">
                                    ต่ำกว่าเกณฑ์
                                  </span>
                                </div>
                              </Tooltip>
                            )}
                            {bmi >= 25 && (
                              <Tooltip
                                className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold"
                                content={
                                  <div className="px-1 py-2">
                                    <div className="text-small font-bold">
                                      มีความเสี่ยง
                                    </div>
                                    <div className="text-tiny">
                                      BMI สูงกว่าเกณฑ์
                                    </div>
                                  </div>
                                }
                              >
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon size={18} />
                                  <span className="text-[12px]">
                                    สูงกว่าเกณฑ์
                                  </span>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </span>

                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900">
                          ความดันโลหิต :
                        </strong>{" "}
                        {bp &&
                          (() => {
                            const [systolic, diastolic] = bp
                              .split("/")
                              .map(Number);

                            let riskBadge = null;
                            if (systolic >= 160 || diastolic >= 110) {
                              riskBadge = (
                                <div className="text-pink-600 bg-pink-100 border border-pink-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon size={18} />
                                  <span className="text-[12px]">
                                    มีความเสี่ยงสูง
                                  </span>
                                </div>
                              );
                            } else if (systolic >= 140 || diastolic >= 90) {
                              riskBadge = (
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon size={18} />
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <div className="flex items-center gap-2">
                                <span>{bp} mmHg</span>
                                {riskBadge}
                              </div>
                            );
                          })()}
                      </span>

                      <hr className="col-span-2 my-2 border-gray-200" />

                      <span>
                        <strong className="text-gray-900">Para :</strong>{" "}
                        {roundData?.wife.text_values.para}
                      </span>
                      <span>
                        <strong className="text-gray-900">G :</strong>{" "}
                        {roundData?.service_info.gravida}
                      </span>
                      <span>
                        <strong className="text-gray-900">P :</strong>{" "}
                        {roundData?.wife.text_values.p}
                      </span>
                      <span>
                        <strong className="text-gray-900">A :</strong>{" "}
                        {roundData?.wife.text_values.a}
                      </span>

                      <span className="col-span-2">
                        <strong className="text-gray-900">Last :</strong>{" "}
                        {roundData?.wife.text_values.last}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          วันที่ประจำเดือนครั้งสุดท้าย :
                        </strong>{" "}
                        {formatThaiDateNoTime(roundData?.wife.text_values.lmp)}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          วันกำหนดคลอด :
                        </strong>{" "}
                        {formatThaiDateNoTime(roundData?.wife.text_values.edc)}
                      </span>

                      <span>
                        <strong className="text-gray-900">อายุครรภ์ :</strong>{" "}
                        {roundData?.wife.text_values.ga}
                      </span>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 2 ------------------ */}
                  <section className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-3 mb-5">
                      ส่วนที่ 2 : ประวัติสุขภาพและความเสี่ยง
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 pb-2" />
                    <div className="space-y-3 text-gray-700 px-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <span>
                          <strong className="text-gray-900">
                            ประวัติแพ้ยา :
                          </strong>{" "}
                          {roundData?.wife.choices.ma.choice_name}
                          {roundData?.wife.choices.ma.choice_name === "เคย" && (
                            <div className="text-gray-500">
                              <strong className="text-gray-900">
                                รายละเอียด :
                              </strong>{" "}
                              {roundData?.wife.text_values.ma_detail}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">HIGH RISK :</strong>{" "}
                          {roundData?.wife.choices.hr.choice_name}
                          {roundData?.wife.choices.hr.choice_name === "ใช่" && (
                            <div className="text-gray-500">
                              <strong className="text-gray-900">
                                รายละเอียด :
                              </strong>{" "}
                              {roundData?.wife.text_values.hr_detail}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">
                            แนะนำเจาะน้ำคร่ำ :
                          </strong>{" "}
                          {roundData?.wife.choices.am.choice_name}
                        </span>

                        <span className="flex gap-2">
                          <strong className="text-gray-900">PCR :</strong>{" "}
                          {roundData?.wife.choices.pcr_wife.choice_name}
                          {roundData?.wife.choices.pcr_wife.choice_name ===
                            "ใช่" && (
                            <div className="text-gray-500 ml-2">
                              <strong className="text-gray-900">
                                รายละเอียด :
                              </strong>{" "}
                              {roundData?.wife.text_values.pcr_wife_text}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">Cordo :</strong>{" "}
                          {roundData?.wife.choices.cordo.choice_name}
                          {roundData?.wife.choices.cordo.choice_name ===
                            "ใช่" && (
                            <div className="text-gray-500 mt-1">
                              <strong className="text-gray-900">
                                รายละเอียด :
                              </strong>{" "}
                              {roundData?.wife.text_values.cordo_text}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">อื่นๆ :</strong>{" "}
                          {roundData?.wife.text_values.cordo_other_text}
                        </span>

                        <span>
                          <strong className="text-gray-900">การแท้ง :</strong>{" "}
                          {roundData?.wife.choices.abortion.choice_name}
                        </span>

                        <span>
                          <strong className="text-gray-900">
                            ในระหว่างตั้งครรภ์ :
                          </strong>{" "}
                          {roundData?.wife.choices.tdap.choice_name}
                          {roundData?.wife.choices.tdap.choice_name ===
                            "ฉีดวัคซีน" && (
                            <div className="text-gray-500 space-y-1 mt-2">
                              <div>
                                <strong className="text-gray-900">
                                  รอบที่ 1 :
                                </strong>{" "}
                                {formatThaiDateNoTime(
                                  roundData?.wife.text_values.tdap_round_1
                                )}
                              </div>
                              <div>
                                <strong className="text-gray-900">
                                  รอบที่ 2 :
                                </strong>{" "}
                                {formatThaiDateNoTime(
                                  roundData?.wife.text_values.tdap_round_2
                                )}
                              </div>
                              <div>
                                <strong className="text-gray-900">
                                  รอบที่ 3 :
                                </strong>{" "}
                                {formatThaiDateNoTime(
                                  roundData?.wife.text_values.tdap_round_3
                                )}
                              </div>
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">
                            ฉีดวัคซีนกระตุ้นครรภ์นี้ :
                          </strong>{" "}
                          {roundData?.wife.choices.iip.choice_name}
                          {roundData?.wife.choices.iip.choice_name ===
                            "กระตุ้นครรภ์นี้" && (
                            <div className="text-gray-500 mt-1">
                              <strong className="text-gray-900">
                                วันที่ :
                              </strong>{" "}
                              {formatThaiDateNoTime(
                                roundData?.wife.text_values.iip_date
                              )}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">ได้รับยา :</strong>{" "}
                          {roundData?.wife.choices.per_os.choice_name}
                        </span>

                        <span className="col-span-2 flex gap-2 items-center">
                          <strong className="text-gray-900">
                            เคยฉีดวัคซีนกันบาดทะยักก่อนตั้งครรภ์กี่ครั้ง :
                          </strong>{" "}
                          {`${roundData?.wife.text_values.td_num} ครั้ง`}
                          {roundData?.wife.text_values.td_num && (
                            <div className="text-gray-500 ml-14">
                              <strong className="text-gray-900">
                                ครั้งสุดท้ายวันที่ :
                              </strong>{" "}
                              {formatThaiDateNoTime(
                                roundData?.wife.text_values.td_last_date
                              )}
                            </div>
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">LAB 2 :</strong>{" "}
                          {formatThaiDateNoTime(
                            roundData?.wife.text_values.lab_2
                          )}
                        </span>

                        <span>
                          <strong className="text-gray-900">VDRL :</strong>{" "}
                          {roundData?.wife.text_values.vdrl_2}
                        </span>

                        <span>
                          <strong className="text-gray-900">HCT :</strong>{" "}
                          {roundData?.wife.text_values.hct}
                        </span>

                        <span>
                          <strong className="text-gray-900">H :</strong>{" "}
                          {roundData?.wife.text_values.h}
                        </span>
                      </div>

                      <hr className="my-5 border-gray-200" />

                      <div>
                        <h3 className="text-gray-900 font-semibold mb-2">
                          กลุ่มสัมพันธ์ และ ฟังผลเลือด
                        </h3>
                        {btiData.length > 0 ? (
                          btiData.map((item, index) => (
                            <div key={index} className="ml-4 text-gray-700">
                              {item.value}
                              {item.date && (
                                <span className="ml-2 text-gray-500">
                                  วันที่ : {formatThaiDateNoTime(item.date)}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                        )}
                      </div>

                      <hr className="my-5 border-gray-200" />

                      <div>
                        <h3 className="text-gray-900 font-semibold mb-2">
                          ตรวจเต้านม, หัวนม
                        </h3>
                        {cbeData.length > 0 ? (
                          cbeData.map((item, index) => (
                            <div key={index} className="ml-4 text-gray-700">
                              {item.value}
                              {item.value === "ไม่ปกติ" && (
                                <span className="ml-2 text-gray-500">
                                  {item.data}
                                </span>
                              )}
                              {item.value === "ANC Pap smear" && (
                                <span className="ml-2 text-gray-500">
                                  ผลตรวจ : {item.data}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 3 ------------------ */}
                  <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}

                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-3 mb-5">
                      ส่วนที่ 3 : ค่า Lab (ภรรยา)
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 pb-2" />
                    {/* Content */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6">
                      {LabWife.length > 0 ? (
                        LabWife.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-center bg-[#f6f6f6] hover:bg-[#d1d1d1] transition rounded-xl p-3 border border-[#b0b0b0]"
                          >
                            <span className="text-sm text-gray-900 font-semibold">
                              {item.label}
                            </span>
                            <span className="text-gray-700">
                              {item.value || "-"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-gray-400 text-center italic">
                          ไม่มีข้อมูลการแปลผล
                        </p>
                      )}
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 4 ------------------ */}
                  <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-3 mb-5">
                      ส่วนที่ 4 : ข้อมูลสามี
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 pb-2" />

                    {/* Husband Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 py-4">
                      <span>
                        <strong className="text-gray-900">HN :</strong>{" "}
                        {roundData?.husband.profile.hn}
                      </span>

                      <span>
                        <strong className="text-gray-900">ชื่อ :</strong>{" "}
                        {`${roundData?.husband.profile.prename}${roundData?.husband.profile.firstname} ${roundData?.husband.profile.lastname}`}
                      </span>

                      <span>
                        <strong className="text-gray-900">
                          เลขบัตรประชาชน :
                        </strong>{" "}
                        {roundData?.husband.profile.citizencardno}
                      </span>
                      <span>
                        <strong className="text-gray-900">อายุ :</strong>{" "}
                        {calculateAge(
                          roundData?.husband.profile.birthdatetime
                        ) || ""}
                      </span>
                      <span>
                        <strong className="text-gray-900">อาชีพ :</strong>{" "}
                        {
                          roundData?.husband.profile.occupation_detail
                            .lookupname
                        }
                      </span>

                      <span>
                        <strong className="text-gray-900">อาชีพ :</strong>{" "}
                        {
                          roundData?.husband.profile.occupation_detail
                            .lookupname
                        }
                      </span>
                      <span>
                        <strong className="text-gray-900">เบอร์โทร :</strong>{" "}
                        {roundData?.husband.profile.pat_address.phone}
                      </span>
                    </div>

                    <hr className="col-span-2 my-4 border-gray-200 " />

                    {/* Lab Header */}
                    <div className="flex items-center gap-2 mb-4 border-l-4 border-gray-500 pl-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        ค่า Lab (สามี)
                      </h3>
                    </div>

                    {/* Lab Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-6">
                      {LabHusband.length > 0 ? (
                        LabHusband.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-center bg-[#f6f6f6] hover:bg-[#d1d1d1] transition rounded-xl p-3 border border-[#b0b0b0]"
                          >
                            <span className="text-sm font-semibold text-gray-900">
                              {item.label}
                            </span>
                            <span className="text-gray-700">
                              {item.value || "-"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-gray-400 text-center italic">
                          ไม่มีข้อมูลการแปลผล
                        </p>
                      )}

                      {/* PCR Row */}
                      <div className="col-span-full mt-2">
                        <span className="text-sm font-semibold text-gray-900">
                          PCR :
                        </span>{" "}
                        <span className="text-gray-700">
                          {roundData?.husband.choices.pcr_hus.choice_name ||
                            "-"}
                        </span>
                        {roundData?.husband.choices.pcr_hus_id === 9 && (
                          <span className="block mt-1 text-gray-700">
                            <span className="font-medium text-gray-900">
                              รายละเอียด :
                            </span>{" "}
                            {roundData?.husband.choices.pcr_hus_text || "-"}
                          </span>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 5 ------------------ */}
                  <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-3 mb-5">
                      ส่วนที่ 5 : ข้อมูล Refer
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 pb-2" />
                    {/* Content */}
                    <div className="space-y-4 px-2">
                      {ReferralValue.length > 0 ? (
                        ReferralValue.map((item, index) => (
                          <div
                            key={index}
                            className=" transition rounded-xl p-4 bg-[#f6f6f6] hover:bg-[#d1d1d1] border border-[#b0b0b0]"
                          >
                            <p className="text-gray-800 font-medium">
                              {item.value || "ไม่ระบุรายละเอียดการ Refer"}
                            </p>

                            {item.data && (
                              <div className="mt-2 text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-500">
                                <p>
                                  <span className="font-medium text-gray-900">
                                    รายละเอียด :
                                  </span>{" "}
                                  {item.data}
                                </p>
                                <p>
                                  <span className="font-medium text-gray-900">
                                    รพช/รพสต :
                                  </span>{" "}
                                  {item.hos || "-"}
                                </p>
                                <p>
                                  <span className="font-medium text-gray-900">
                                    จังหวัด :
                                  </span>{" "}
                                  {item.prov || "-"}
                                </p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center italic">
                          ไม่มีข้อมูลการแปลผล
                        </p>
                      )}
                    </div>
                  </section>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="default"
                  variant="shadow"
                  onPress={closeViewService}
                  className="px-6 py-2 text-sm rounded-xl font-medium"
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
