"use client";
import { AlertOctagon, AlertTriangle } from "@deemlol/next-icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";
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
  checkLabRisk,
  getLabWarning,
  temperature,
  pulse,
}) {
  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={openViewService}
        onOpenChange={closeViewService}
        size="4xl"
        classNames={{
          base: "bg-white/95 dark:bg-[#18181b] backdrop-blur-md rounded-2xl shadow-xl border border-gray-100",
          body: "border-t border-gray-200 dark:border-divider py-6 px-6 overflow-y-auto max-h-[calc(85vh-110px)]",
          footer:
            "border-t border-gray-200 dark:border-divider flex justify-end gap-3 py-4 px-6",
        }}
        className="dark:border dark:border-divider"
        placement="center"
      >
        <ModalContent>
          {(closeViewService) => (
            <>
              <ModalHeader className="flex justify-center text-center text-2xl font-semibold text-gray-800 dark:text-white tracking-wide py-6">
                หน้าดูข้อมูลบริการ ANC
              </ModalHeader>

              <ModalBody>
                <div className="space-y-10 text-gray-700 text-sm">
                  {/* ------------------ ส่วนที่ 1 ------------------ */}
                  <section className="bg-white dark:border-[#3d3d3d] dark:bg-[#27272a] shadow-sm rounded-2xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5">
                      ส่วนที่ 1 : ข้อมูลทั่วไป
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 dark:border-[#3d3d3d] pb-2" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 px-6">
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          รอบที่ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info.round}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          วันที่ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {" "}
                          {formatThaiDateTime(
                            roundData?.service_info.service_date
                          )}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          หมายเลข ANC :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info.anc_no}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          HN :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.profile.hn}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          หมายเลข PAT VISIT :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info.patvisit_id}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          PAT VISIT DATE :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {" "}
                          {formatThaiDateTime(
                            roundData?.wife?.pat_reg?.PatVisit?.visitdatetime
                          )}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          หมายเลข PAT REG :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info.patreg_id}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          PAT REG LOCATION :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.pat_reg.Location.detailtext}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          ชื่อ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {`${roundData?.wife.profile.prename}${roundData?.wife.profile.firstname} ${roundData?.wife.profile.lastname}`}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          เลขบัตรประชาชน :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.profile?.citizencardno || ""}
                        </span>
                      </span>
                      <span className="flex gap-1 items-center">
                        <strong className="text-gray-900 dark:text-white">
                          อายุ :
                        </strong>{" "}
                        {(() => {
                          const age = calculateAge(
                            roundData?.wife?.profile?.birthdatetime
                          );
                          if (!age) return null;

                          const isRisk = age >= "35";

                          return (
                            <div className="flex items-center">
                              <span className="text-gray-900 dark:text-gray-400 font-medium">
                                {age}
                              </span>
                              {isRisk && (
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold ml-2 flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />{" "}
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          สัญชาติ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.profile?.race_text?.lookupname ||
                            "ไม่ระบุ"}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          อาชีพ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.profile?.occupation_detail
                            ?.lookupname || "ไม่ระบุ"}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          เบอร์โทร :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.wife_tel || "ไม่ระบุ"}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          Email :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.profile?.pat_address?.email ||
                            "ไม่ระบุ"}
                        </span>
                      </span>
                      <span className="">
                        <strong className="text-gray-900 dark:text-white">
                          ที่อยู่ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.wife_address || "-"}
                        </span>
                      </span>

                      <hr className="col-span-2 my-2 border-gray-200 dark:border-divider" />

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          น้ำหนักก่อนตั้งครรภ์ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">{`${Math.round(roundData?.wife?.text_values?.prep_weight)} กก.`}</span>
                        <strong className="text-gray-900 dark:text-white pl-2">
                          น้ำหนัก :
                        </strong>{" "}
                        <span className="dark:text-gray-400">{`${Math.round(roundData?.wife.pat_vitalsign.weight)} กก.`}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900 dark:text-white">
                          ส่วนสูง :
                        </strong>{" "}
                        {height && (
                          <div className="flex items-center gap-1">
                            <span className="dark:text-gray-400">{`${height} ซม.`}</span>
                            {height <= 140 && (
                              <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                <AlertOctagon
                                  className="animate-pulse"
                                  size={18}
                                />
                                <span className="text-[12px]">
                                  ต่ำกว่าเกณฑ์
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </span>

                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900 dark:text-white">
                          BMI :
                        </strong>
                        {bmi && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-900 dark:text-gray-400 font-medium">
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
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
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
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
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
                        <strong className="text-gray-900 dark:text-white">
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
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยงสูง
                                  </span>
                                </div>
                              );
                            } else if (systolic >= 140 || diastolic >= 90) {
                              riskBadge = (
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <div className="flex items-center gap-2">
                                <span className="dark:text-gray-400">
                                  {bp} mmHg
                                </span>
                                {riskBadge}
                              </div>
                            );
                          })()}
                      </span>

                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900 dark:text-white">
                          ชีพจร :
                        </strong>{" "}
                        {pulse &&
                          (() => {
                            const pulseValue = Number(pulse);

                            let riskBadge = null;
                            if (pulseValue >= 120 || pulseValue <= 50) {
                              riskBadge = (
                                <div className="text-pink-600 bg-pink-100 border border-pink-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยงสูง
                                  </span>
                                </div>
                              );
                            } else if (pulseValue >= 100 || pulseValue <= 60) {
                              riskBadge = (
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <div className="flex items-center gap-2">
                                <span className="dark:text-gray-400">
                                  {pulseValue} ครั้ง/นาที
                                </span>
                                {riskBadge}
                              </div>
                            );
                          })()}
                      </span>
                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900 dark:text-white">
                          อุณหภูมิ :
                        </strong>{" "}
                        {temperature &&
                          (() => {
                            const tempValue = Number(temperature);

                            let riskBadge = null;
                            if (tempValue >= 38.0 || tempValue < 35.5) {
                              riskBadge = (
                                <div className="text-pink-600 bg-pink-100 border border-pink-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยงสูง
                                  </span>
                                </div>
                              );
                            } else if (tempValue >= 37.5) {
                              riskBadge = (
                                <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                                  <AlertOctagon
                                    className="animate-pulse"
                                    size={18}
                                  />
                                  <span className="text-[12px]">
                                    มีความเสี่ยง
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <div className="flex items-center gap-2">
                                <span className="dark:text-gray-400">
                                  {tempValue.toFixed(1)} °C
                                </span>
                                {riskBadge}
                              </div>
                            );
                          })()}
                      </span>

                      <hr className="col-span-2 my-2 border-gray-200 dark:border-divider" />

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          Para :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.text_values.para}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          G :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info.gravida}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          P :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.text_values.p}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          A :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.text_values.a}
                        </span>
                      </span>

                      <span className="col-span-2">
                        <strong className="text-gray-900 dark:text-white">
                          Last :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.text_values.last}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          วันที่ประจำเดือนครั้งสุดท้าย :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {formatThaiDateNoTime(
                            roundData?.wife.text_values.lmp
                          )}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          วันกำหนดคลอด :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {formatThaiDateNoTime(
                            roundData?.wife.text_values.edc
                          )}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          อายุครรภ์ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife.text_values.ga}
                        </span>
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          เชื่อถือโดย :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.choices?.vb?.choice_name || "-"}
                        </span>
                      </span>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 2 ------------------ */}
                  <section className="bg-white dark:border-[#3d3d3d] dark:bg-[#27272a] shadow-sm rounded-2xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5">
                      ส่วนที่ 2 : ประวัติสุขภาพและความเสี่ยง
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 dark:border-divider pb-2" />
                    <div className="space-y-3 text-gray-700 px-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            ประวัติแพ้ยา :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife.choices?.ma?.choice_name ?? "-"}
                          </span>
                          {roundData?.wife?.choices?.ma?.choice_name ===
                            "เคย" && (
                            <div className="text-gray-500">
                              <strong className="text-gray-900 dark:text-white">
                                รายละเอียด :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.text_values?.ma_detail ?? ""}
                              </span>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            HIGH RISK :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.hr?.choice_name ?? "-"}
                          </span>
                          {roundData?.wife?.choices?.hr?.choice_name ===
                            "ใช่" && (
                            <div className="text-gray-500">
                              <strong className="text-gray-900 dark:text-white">
                                รายละเอียด :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.text_values?.hr_detail ?? "-"}
                              </span>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            แนะนำเจาะน้ำคร่ำ :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.am?.choice_name ?? "-"}
                          </span>
                          <div>
                            {" "}
                            <span>
                              <strong className="text-gray-900 dark:text-white">
                                หมายเหตุ :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.choices?.am_id === 5 &&
                                  (roundData?.wife?.text_values?.am_detail_1 ||
                                    "-")}

                                {roundData?.wife?.choices?.am_id === 6 &&
                                  (roundData?.wife?.text_values?.am_detail_2 ||
                                    "-")}

                                {roundData?.wife?.choices?.am_id === 7 &&
                                  (roundData?.wife?.text_values?.am_detail_3 ||
                                    "-")}
                              </span>
                            </span>
                          </div>
                        </span>

                        <span className="flex gap-2">
                          <strong className="text-gray-900 dark:text-white">
                            PCR :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.pcr_wife?.choice_name ??
                              "-"}
                          </span>
                          {roundData?.wife?.choices?.pcr_wife?.choice_name ===
                            "ใช่" && (
                            <div className="text-gray-500 ml-2">
                              <strong className="text-gray-900 dark:text-white">
                                รายละเอียด :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.text_values?.pcr_wife_text ??
                                  "-"}
                              </span>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            Cordo :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.cordo?.choice_name ??
                              "-"}
                          </span>
                          {roundData?.wife?.choices?.cordo?.choice_name ===
                            "ใช่" && (
                            <div className="text-gray-500 mt-1">
                              <strong className="text-gray-900 dark:text-white">
                                รายละเอียด :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.text_values?.cordo_text ??
                                  "-"}
                              </span>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            อื่นๆ :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.text_values?.cordo_other_text ||
                              "-"}
                          </span>
                        </span>

                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            การแท้ง :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.abortion?.choice_name ??
                              "-"}
                          </span>
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            ในระหว่างตั้งครรภ์ :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.tdap?.choice_name ?? "-"}
                          </span>
                          {roundData?.wife?.choices?.tdap?.choice_name ===
                            "ฉีดวัคซีน" && (
                            <div className="text-gray-500 space-y-1 mt-2">
                              <div>
                                <strong className="text-gray-900 dark:text-white">
                                  รอบที่ 1 :
                                </strong>{" "}
                                <span className="dark:text-gray-400">
                                  {formatThaiDateNoTime(
                                    roundData?.wife?.text_values?.tdap_round_1
                                  )}
                                </span>
                              </div>
                              <div>
                                <strong className="text-gray-900 dark:text-white">
                                  รอบที่ 2 :
                                </strong>{" "}
                                <span className="dark:text-gray-400">
                                  {" "}
                                  {formatThaiDateNoTime(
                                    roundData?.wife?.text_values?.tdap_round_2
                                  )}
                                </span>
                              </div>
                              <div>
                                <strong className="text-gray-900 dark:text-white">
                                  รอบที่ 3 :
                                </strong>{" "}
                                <span className="dark:text-gray-400">
                                  {formatThaiDateNoTime(
                                    roundData?.wife?.text_values?.tdap_round_3
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            ฉีดวัคซีนกระตุ้นครรภ์นี้ :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.iip?.choice_name ?? "-"}
                          </span>
                          {roundData?.wife?.choices?.iip?.choice_name ===
                            "กระตุ้นครรภ์นี้" && (
                            <div className="text-gray-500 mt-1">
                              <strong className="text-gray-900 dark:text-white">
                                วันที่ :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {formatThaiDateNoTime(
                                  roundData?.wife?.text_values?.iip_date
                                )}
                              </span>
                            </div>
                          )}
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            วัคซีน :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.Vaccine?.choice_name ??
                              "-"}
                          </span>
                          <div>
                            <span>
                              <strong className="text-gray-900 dark:text-white">
                                หมายเหตุ :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.choices?.vaccine === 58 && (
                                  <>
                                    {`${roundData?.wife?.text_values?.vaccine_detail_1} `}
                                  </>
                                )}
                                {roundData?.wife?.choices?.vaccine === 59 && (
                                  <>
                                    {`${roundData?.wife?.text_values?.vaccine_detail_2} `}
                                  </>
                                )}
                                {roundData?.wife?.choices?.vaccine === 60 && (
                                  <>
                                    {`${roundData?.wife?.text_values?.vaccine_detail_3} `}
                                  </>
                                )}
                              </span>
                            </span>
                            <br />
                            <span>
                              <strong className="text-gray-900 dark:text-white">
                                วันนัด :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.choices?.vaccine === 58 && (
                                  <>
                                    {`${formatThaiDateNoTime(roundData?.wife?.text_values?.vaccine_date_1)}`}
                                  </>
                                )}
                                {roundData?.wife?.choices?.vaccine === 59 && (
                                  <>
                                    {`${formatThaiDateNoTime(roundData?.wife?.text_values?.vaccine_date_2)}`}
                                  </>
                                )}
                                {roundData?.wife?.choices?.vaccine === 60 && (
                                  <>
                                    {` ${formatThaiDateNoTime(roundData?.wife?.text_values?.vaccine_date_3)}`}
                                  </>
                                )}
                              </span>
                            </span>
                          </div>
                        </span>

                        <span>
                          <strong className="text-gray-900 dark:text-white">
                            ได้รับยา :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.choices?.per_os?.choice_name ??
                              "-"}
                          </span>
                          <div>
                            <span>
                              <strong className="text-gray-900 dark:text-white">
                                หมายเหตุ :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {roundData?.wife?.choices?.per_os_id === 30 &&
                                  (roundData?.wife?.text_values
                                    ?.per_os_detail_1 ||
                                    "-")}
                                {roundData?.wife?.choices?.per_os_id === 31 &&
                                  (roundData?.wife?.text_values
                                    ?.per_os_detail_2 ||
                                    "-")}
                                {roundData?.wife?.choices?.per_os_id === 32 &&
                                  (roundData?.wife?.text_values
                                    ?.per_os_detail_3 ||
                                    "-")}
                                {roundData?.wife?.choices?.per_os_id === 63 &&
                                  (roundData?.wife?.text_values
                                    ?.per_os_detail_4 ||
                                    "-")}
                                {roundData?.wife?.choices?.per_os_id === 64 &&
                                  (roundData?.wife?.text_values
                                    ?.per_os_detail_5 ||
                                    "-")}
                              </span>
                            </span>
                          </div>
                        </span>

                        <span className="col-span-2 flex gap-2 items-center">
                          <strong className="text-gray-900 dark:text-white">
                            เคยฉีดวัคซีนกันบาดทะยักก่อนตั้งครรภ์กี่ครั้ง :
                          </strong>{" "}
                          <span className="dark:text-gray-400">{`${roundData?.wife.text_values.td_num || "-"}`}</span>
                          {roundData?.wife?.text_values?.td_num > 0 && (
                            <div className="text-gray-500 ml-14">
                              <strong className="text-gray-900 dark:text-white">
                                ครั้งสุดท้ายวันที่ :
                              </strong>{" "}
                              <span className="dark:text-gray-400">
                                {formatThaiDateNoTime(
                                  roundData?.wife?.text_values?.td_last_date
                                )}
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
                      <hr className="my-5 border-gray-200 dark:border-divider" />

                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                          กลุ่มสัมพันธ์ และ ฟังผลเลือด
                        </h3>
                        {btiData.length > 0 ? (
                          btiData.map((item, index) => (
                            <div
                              key={index}
                              className="ml-4 text-gray-700 dark:text-gray-300"
                            >
                              {item.value}
                              {item.date && (
                                <span className="ml-2 text-gray-500 dark:text-gray-400">
                                  วันที่ : {formatThaiDateNoTime(item.date)}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400">ไม่มีข้อมูลการแปลผล</p>
                        )}
                      </div>

                      <hr className="my-5 border-gray-200 dark:border-divider" />

                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                          ตรวจเต้านม, หัวนม
                        </h3>
                        {cbeData.length > 0 ? (
                          cbeData.map((item, index) => (
                            <div
                              key={index}
                              className="ml-4 text-gray-700 dark:text-gray-300"
                            >
                              {item.value}
                              {item.value === "ไม่ปกติ" && (
                                <>
                                  {" "}
                                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                                    {item.data}
                                  </span>
                                  {roundData?.wife?.choices?.birads_id ===
                                    27 && (
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                                      รายละเอียด{" "}
                                      {roundData?.wife?.text_values
                                        ?.birads_detail_1 || "-"}
                                    </span>
                                  )}
                                  {roundData?.wife?.choices?.birads_id ===
                                    28 && (
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                                      รายละเอียด{" "}
                                      {roundData?.wife?.text_values
                                        ?.birads_detail_2 || "-"}
                                    </span>
                                  )}
                                  {roundData?.wife?.choices?.birads_id ===
                                    29 && (
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                                      รายละเอียด{" "}
                                      {roundData?.wife?.text_values
                                        ?.birads_detail_3 || "-"}
                                    </span>
                                  )}
                                </>
                              )}
                              {item.value === "ANC Pap smear" && (
                                <span className="ml-2 text-gray-500 dark:text-gray-400">
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
                  <section className="bg-white dark:border-[#3d3d3d] dark:bg-[#27272a] shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5">
                      ส่วนที่ 3 : ค่า Lab (ภรรยา)
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 dark:border-divider pb-2" />
                    {/* Content */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 ">
                      {LabWife.length > 0 ? (
                        LabWife.map((item, index) => {
                          const isRisk = checkLabRisk(item.label, item.value);
                          const warning = getLabWarning(item.label);
                          return (
                            <div
                              key={index}
                              className={`flex flex-col justify-center rounded-xl p-3 border transition ${
                                isRisk
                                  ? "bg-yellow-100 border-yellow-400 shadow-sm"
                                  : "bg-gray-50 dark:bg-[#dadadd] hover:bg-gray-100 dark:hover:bg-[#eeeef0] border-gray-200 dark:border-divider"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-900 font-semibold">
                                  {item.label}
                                </span>
                                {isRisk && (
                                  <AlertTriangle
                                    size={20}
                                    className="text-yellow-500 animate-pulse"
                                  />
                                )}
                              </div>

                              <span className="text-gray-700 text-sm mt-1">
                                {item.value}
                              </span>

                              {isRisk && (
                                <span className="text-[12px] text-yellow-800 font-medium mt-1">
                                  {warning}
                                </span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="col-span-full text-gray-400 text-center italic">
                          ไม่มีข้อมูลการแปลผล
                        </p>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5 my-8">
                      ค่า Lab 2 (ภรรยา)
                    </h2>
                    <hr className="col-span-2 my-4 border-gray-200 dark:border-divider pb-2" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 px-6">
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          LAB 2 :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {formatThaiDateNoTime(
                            roundData?.wife?.text_values?.lab_2
                          )}
                        </span>
                      </span>
                      <span>
                        <div className="flex items-center gap-1">
                          <strong className="text-gray-900 dark:text-white">
                            VDRL :
                          </strong>{" "}
                          <span className="dark:text-gray-400">
                            {roundData?.wife?.text_values?.vdrl_2_name
                              ?.choice_name || "—"}
                          </span>
                          {/* ถ้าผลเป็น Reactive ให้แสดงคำเตือน */}
                          {roundData?.wife?.text_values?.vdrl_2_name
                            ?.choice_name === "Reactive" && (
                            <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                              <AlertOctagon
                                className="animate-pulse"
                                size={18}
                              />
                              <span className="text-[12px]">
                                เสี่ยง เป็นโรคซิฟิลิส
                              </span>
                            </div>
                          )}
                        </div>
                        {roundData?.wife?.text_values?.vdrl_2 === 47 && (
                          <>
                            <strong className="text-gray-900 dark:text-white">
                              PPR :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {roundData?.wife?.text_values?.ppr_wife_2 || "—"}
                            </span>
                            <br />
                            <strong className="text-gray-900 dark:text-white">
                              TPHA :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {roundData?.wife?.text_values?.tpha_wife_2 || "—"}
                            </span>
                            <br />
                            <strong className="text-gray-900 dark:text-white">
                              การรักษา :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {roundData?.wife?.text_values
                                ?.treatment_detail_wife_2 || "—"}
                            </span>
                            <br />
                            <strong className="text-gray-900 dark:text-white">
                              ครั้งที่ 1 :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {formatThaiDateNoTime(
                                roundData?.wife?.text_values
                                  ?.vac_lab_date_1_wife_2
                              )}
                            </span>
                            <br />
                            <strong className="text-gray-900 dark:text-white">
                              ครั้งที่ 2 :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {formatThaiDateNoTime(
                                roundData?.wife?.text_values
                                  ?.vac_lab_date_2_wife_2
                              )}
                            </span>
                            <br />
                            <strong className="text-gray-900 dark:text-white">
                              ครั้งที่ 3 :
                            </strong>{" "}
                            <span className="dark:text-gray-400">
                              {formatThaiDateNoTime(
                                roundData?.wife?.text_values
                                  ?.vac_lab_date_3_wife_2
                              )}
                            </span>
                          </>
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <strong className="text-gray-900 dark:text-white">
                          HCT :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.text_values?.hct ?? "-"}
                        </span>
                        {roundData?.wife?.text_values?.hct != null ? (
                          roundData.wife.text_values.hct <= 33 && (
                            <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold flex gap-1 items-center">
                              <AlertOctagon
                                className="animate-pulse"
                                size={18}
                              />
                              <span className="text-[12px]">ภาวะโลหิตจาง</span>
                            </div>
                          )
                        ) : (
                          <span></span>
                        )}
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          HIV :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.wife?.text_values?.HIV?.choice_name ??
                            "-"}
                        </span>
                      </span>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 4 ------------------ */}
                  <section className="bg-white dark:border-[#3d3d3d] dark:bg-[#27272a] shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5">
                      ส่วนที่ 4 : ข้อมูลสามี
                    </h2>

                    <hr className="col-span-2 my-2 border-gray-200 pb-2 dark:border-divider" />

                    {/* Husband Info */}
                    {!roundData?.service_info?.hn_husband &&
                      !roundData?.service_info?.husband_name && (
                        <div className="text-yellow-600 bg-amber-100 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold  flex gap-1 items-center w-full">
                          <AlertOctagon className="animate-pulse" size={20} />{" "}
                          <span className="text-lg">ไม่พบข้อมูลสามี</span>
                        </div>
                      )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 py-4">
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          HN :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.hn_husband ?? "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          ชื่อ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.husband_name || "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          เลขบัตรประชาชน :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.husband_citizencardno ||
                            "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          สัญชาติ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.husband_race || "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          อายุ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.husband_age || "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          อาชีพ :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.husband?.profile?.occupation_detail
                            ?.lookupname ?? "-"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          Email :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.husband?.profile?.pat_address?.email ??
                            "ไม่ระบุ"}
                        </span>
                      </span>

                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          เบอร์โทร :
                        </strong>{" "}
                        <span className="dark:text-gray-400">
                          {roundData?.service_info?.husband_tel || "-"}
                        </span>
                      </span>
                    </div>

                    <hr className="col-span-2 my-4 border-gray-200 dark:border-divider" />

                    {/* Lab Header */}
                    <div className="flex items-center gap-2 mb-4 border-l-4 border-gray-500 dark:border-white  pl-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        ค่า Lab (สามี)
                      </h3>
                    </div>
                    {/* Lab Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6">
                      {LabHusband.length > 0 ? (
                        LabHusband.map((item, index) => {
                          const isRisk = checkLabRisk(item.label, item.value);
                          const warning = getLabWarning(item.label);

                          return (
                            <div
                              key={index}
                              className={`flex flex-col justify-center rounded-xl p-3 border transition ${
                                isRisk
                                  ? "bg-yellow-100 border-yellow-400 shadow-sm"
                                  : "bg-gray-50 dark:bg-[#dadadd] hover:bg-gray-100 dark:hover:bg-[#eeeef0] border-gray-200 dark:border-divider"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-900 font-semibold">
                                  {item.label}
                                </span>
                                {isRisk && (
                                  <AlertTriangle
                                    size={20}
                                    className="text-yellow-500 animate-pulse"
                                  />
                                )}
                              </div>

                              <span className="text-gray-700 text-sm mt-1">
                                {item.value}
                              </span>

                              {isRisk && (
                                <span className="text-[12px] text-yellow-800 font-medium mt-1">
                                  {warning}
                                </span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="col-span-full text-gray-400 text-center italic">
                          ไม่มีข้อมูลการแปลผล
                        </p>
                      )}

                      {/* PCR Row */}
                      <div className="col-span-full mt-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          PCR :
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-400">
                          {roundData?.husband?.choices?.pcr_hus?.choice_name ??
                            "-"}
                        </span>
                        {roundData?.husband.choices.pcr_hus_id === 9 && (
                          <span className="block mt-1 text-gray-700">
                            <span className="font-medium text-gray-900 dark:text-white">
                              รายละเอียด :
                            </span>{" "}
                            <span className="text-gray-700 dark:text-gray-400">
                              {roundData?.husband.choices.pcr_hus_text || "-"}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* ------------------ ส่วนที่ 5 ------------------ */}
                  <section className="bg-white dark:border-[#3d3d3d] dark:bg-[#27272a] shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-l-4 border-gray-500 dark:border-[#ffffff] pl-3 mb-5">
                      ส่วนที่ 5 : ข้อมูล Refer
                    </h2>
                    <hr className="col-span-2 my-2 border-gray-200 dark:border-divider pb-2" />
                    {/* Content */}
                    <div className="space-y-4 px-2">
                      {ReferralValue.length > 0 ? (
                        ReferralValue.map((item, index) => (
                          <div
                            key={index}
                            className=" transition rounded-xl p-4 bg-[#f6f6f6] dark:bg-[#dadadd] hover:bg-[#d1d1d1] dark:hover:bg-[#eeeef0] border border-[#b0b0b0] dark:border-divider"
                          >
                            <p className="text-gray-800 font-medium">
                              {item.value || "ไม่ระบุรายละเอียดการ Refer"}
                            </p>

                            {item.data === "ในจังหวัด" && (
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
                                <p>
                                  <span className="font-medium text-gray-900">
                                    note :
                                  </span>{" "}
                                  {item.in_province || "-"}
                                </p>
                              </div>
                            )}
                            {item.data === "ต่างจังหวัด" && (
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
                                  {item.out_province || "-"}
                                </p>
                              </div>
                            )}
                            {item.data === "อื่นๆ" && (
                              <div className="mt-2 text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-500">
                                <p>
                                  <span className="font-medium text-gray-900">
                                    รายละเอียด :
                                  </span>{" "}
                                  {item.detail}
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
