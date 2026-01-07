"use client";
import { TbVaccine } from "react-icons/tb";
import { MdVaccines } from "react-icons/md";
import BarChart from "@/components/chart/bar_chart";
import RadialChart from "@/components/chart/radial_chart";
import useHook from "./useHook";

export default function Home() {
  const { sumData, chartBarData, chartRadialData } = useHook();
  return (
    <div className="bg-white p-3 mt-[10px] rounded-lg  border border-divider dark:bg-[#0e0e11] dark:border-[#3d3d3d] ">
      <div className=" py-4">
        <h1 className="text-center text-sm xl:text-2xl">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[10px]">
        <div className="mt-[10px] col-span-8">
          <div className="grid grid-cols-1 sd:grid-cols-3 md:grid-cols-4 gap-[10px]">
            <div className=" rounded-lg bg-white shadow-lg p-3 border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] xl:text-xl">
                    <span>{sumData.referral_in_count?.ref_in ?? 0}</span> ครั้ง
                  </p>
                  <h1 className="text-[8px] xl:text-sm text-gray-600 dark:text-gray-400">
                    จำนวนการรับ Refer
                  </h1>
                  <p className="text-[8px] xl:text-sm">
                    <strong>ประจำเดือน</strong>{" "}
                    <span>{sumData.month_name}</span>
                  </p>
                </div>
                <div className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] bg-[#ffa8ce] dark:bg-[#fe68a6] rounded-full overflow-hidden flex items-center justify-center mt-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 xl:size-6 text-white"
                  >
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className=" rounded-lg bg-white shadow-lg p-3 border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] xl:text-xl">
                    <span>{sumData.referral_out_count?.ref_out ?? 0}</span> ครั้ง
                  </p>
                  <h1 className="text-[8px] xl:text-sm text-gray-600 dark:text-gray-400">
                    จำนวนส่งต่อ Refer
                  </h1>
                  <p className="text-[8px] xl:text-sm">
                    <strong>ประจำเดือน</strong>{" "}
                    <span>{sumData.month_name}</span>
                  </p>
                </div>
                <div className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] bg-[#ffa8ce] dark:bg-[#fe68a6] rounded-full overflow-hidden flex items-center justify-center mt-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 xl:size-6 text-white"
                  >
                    <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className=" rounded-lg bg-white shadow-lg p-3 border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] xl:text-xl">
                    <span>{sumData.tdap_count?.tdap_1 ?? 0}</span> คน
                  </p>
                  <h1 className="text-[8px] xl:text-sm text-gray-600 dark:text-gray-400">
                    จำนวนการกระตุ้นวัคซีนในครรภ์
                  </h1>
                  <p className="text-[8px] xl:text-sm">
                    <strong>ประจำเดือน</strong>{" "}
                    <span>{sumData.month_name}</span>
                  </p>
                </div>
                <div className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] bg-[#ffa8ce] dark:bg-[#fe68a6] rounded-full overflow-hidden flex items-center justify-center mt-[10px]">
                  <TbVaccine className="size-4 xl:size-6 text-white" />
                </div>
              </div>
            </div>
            <div className=" rounded-lg bg-white shadow-lg p-3 border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] xl:text-xl">
                    <span>{sumData.iip_count?.iip_1 ?? 0}</span> คน
                  </p>
                  <h1 className="text-[8px] xl:text-sm text-gray-600 dark:text-gray-400">
                    ฉีดวัคซีนในระหว่างตั้งครรภ์
                  </h1>
                  <p className="text-[8px] xl:text-sm">
                    <strong>ประจำเดือน</strong>{" "}
                    <span>{sumData.month_name}</span>
                  </p>
                </div>
                <div className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] bg-[#ffa8ce] dark:bg-[#fe68a6] rounded-full overflow-hidden flex items-center justify-center mt-[10px]">
                  <MdVaccines className="size-4 xl:size-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className=" p-[10px] rounded-lg shadow-lg bg-white mt-[10px] border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
            <h1 className="text-center text-[10px] xl:text-xl">
              สรุปผลจำนวนเคสANC ปี {chartBarData.year}
            </h1>
            <BarChart chartBarData={chartBarData} />
          </div>
        </div>
        <div className="col-span-4 w-full bg-white mt-[10px] rounded-lg shadow-lg overflow-hidden p-[10px] border border-default-100 dark:bg-[#27272a] dark:border-[#3d3d3d]">
          <h1 className="text-center text-[10px] xl:text-xl mt-[20px]">
            แนะนำการเจาะน้ำคร่ำตรวจโครโมโซม ปี {chartRadialData.year}
          </h1>
          <RadialChart chartRadialData={chartRadialData} />
        </div>
      </div>
    </div>
  );
}
