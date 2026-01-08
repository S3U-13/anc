"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { ThemeSwitch } from "./theme-switch";
import { div } from "framer-motion/client";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useAuth } from "../context/AuthContext";
import { Image } from "@heroui/image";

export default function Sidebar({ isOpen }) {
  const { user } = useAuth();
  const { logout } = useAuth();
  const [selectMenu, setSelectMenu] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useState("light");

  const menu_config = [
    {
      id: 1,
      name: "DASHBOARD",
      role: [1],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4.5 text-neutral-600"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
      ),
      label: [
        {
          label_id: 1,
          label_name: "ANC DASHBOARD",
          link: "/dashboard",
        },
        // {
        //   label_id: 2,
        //   label_name: "INSURANCE CLAIM APPROVED",
        //   link: "/doctor/insurance_form/success",
        // },
      ],
    },
    {
      id: 2,
      name: "ANC",
      role: [1],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4.5 text-neutral-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
          />
        </svg>
      ),
      label: [
        {
          label_id: 3,
          label_name: "หน้าทะเบียนฝากครรภ์",
          link: "/anc",
        },
        {
          label_id: 4,
          label_name: "หน้าบริการฝากครรภ์",
          link: "/service_anc",
        },
      ],
    },
    {
      id: 3,
      name: "DASHBOARD",
      role: [2],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4.5 text-neutral-600"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
      ),
      label: [
        {
          label_id: 5,
          label_name: "dashboard",
          link: "/dashboard_admin",
        },
        // {
        //   label_id: 2,
        //   label_name: "INSURANCE FORM SUCCESS",
        //   link: "/doctor/insurance_form/success",
        // },
      ],
    },
    {
      id: 4,
      name: "USER MANAGE",
      role: [2],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4.5 text-neutral-600"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: [
        {
          label_id: 6,
          label_name: "user",
          link: "/user",
        },
        // {
        //   label_id: 2,
        //   label_name: "INSURANCE FORM SUCCESS",
        //   link: "/doctor/insurance_form/success",
        // },
      ],
    },
  ];

  const menu = useMemo(() => {
    if (!user?.role_id) return [];
    return menu_config.filter((menu) => menu.role.includes(user.role_id));
  }, [user?.role_id]);

  useEffect(() => {
    if (!user?.role_id) return;

    if (user.role_id === 1) {
      if (pathname?.startsWith("/anc")) {
        setSelectMenu(3);
      } else if (pathname?.startsWith("/anc_service")) {
        setSelectMenu(4);
      } else if (pathname?.startsWith("/dashboard")) {
        setSelectMenu(1);
      }
    } else if (user.role_id === 2) {
      if (pathname?.startsWith("/dashboard_admin")) {
        setSelectMenu(5);
      } else if (pathname?.startsWith("/user")) {
        setSelectMenu(6);
      }
    }
  }, [pathname, user?.role]);

  const handleClickAndNavigate = (e, link, id) => {
    e.preventDefault();
    setSelectMenu(id); // เปลี่ยน state เพื่อให้ UI แสดงผล
    // ถ้าต้องการหน่วงให้เห็นผลก่อน (ไม่แนะนำหน่วงเกินไป), ใช้ setTimeout
    router.push(link);
  };

  return (
    <div className="">
      <div
        className={`fixed top-0 left-0 h-full w-78 shadow-md p-4 pt-6 transition-transform duration-300 z-20 dark:border dark:border-divider bg-white dark:bg-[#0e0e11] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 h-full">
          <Image
            alt="HeroUI hero Image"
            classNames={{ img: "pl-2" }}
            src="/images/logo.png"
            width={200}
          />
          <div className="w-full h-200 bg-gray-100 dark:bg-[#18181b] mx-auto mt-2 rounded-xl dark:border dark:border-divider">
            <ScrollShadow hideScrollBar className="space-y-2 w-full h-full p-4">
              {" "}
              {menu.map((item) => (
                <Accordion
                  key={item?.id}
                  variant="shadow"
                  className="bg-white dark:bg-[#27272A]"
                >
                  <AccordionItem
                    aria-label={item.name}
                    classNames={{ content: "grid grid-cols-1 gap-1" }}
                    title={
                      <p className="text-xs flex items-center justify-between">
                        {item.name} {item.icon}
                      </p>
                    }
                  >
                    {item.label.map((item_label) => {
                      const isActive = selectMenu === item_label.label_id;
                      return (
                        // ถ้าไม่ต้องการ control navigation timing ให้ใช้ <Link> ปกติ
                        // แต่ถ้าต้องการให้ state เปลี่ยนก่อน navigation ให้ใช้ onClick แบบด้านล่าง
                        <div key={item_label.label_id}>
                          <Link
                            color="foreground"
                            // ใช้ <a> เพราะเรเรียก router.push เอง (หรือเปลี่ยนเป็น <Link> แล้วใช้ onClick และ preventDefault)
                            href={item_label.link}
                            onClick={(e) =>
                              handleClickAndNavigate(
                                e,
                                item_label.link,
                                item_label.label_id
                              )
                            }
                            className={
                              isActive
                                ? "text-xs bg-[#fee5f1] dark:bg-[#0e0e11] border border-[#ffcce5] dark:border-divider rounded-lg p-1.5 flex items-center justify-between"
                                : "text-xs hover:bg-[#fee5f1] dark:hover:bg-[#0e0e11] rounded-lg p-1.5 flex items-center justify-between"
                            }
                          >
                            {item_label.label_name}
                          </Link>
                        </div>
                      );
                    })}
                  </AccordionItem>
                </Accordion>
              ))}
              <Accordion variant="shadow" className="dark:bg-[#27272A]">
                <AccordionItem
                  aria-label="SETTING"
                  classNames={{ content: "grid grid-cols-1 gap-1" }}
                  title={
                    <p className="text-xs flex items-center justify-between">
                      <span>SETTING</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4.5 text-neutral-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  }
                >
                  <div>
                    <div className="hover:bg-[#fee5f1] dark:hover:bg-[#0e0e11] rounded-lg p-1.5 flex items-center justify-between">
                      {" "}
                      <ThemeSwitch
                        theme={currentTheme} // ส่งค่า theme เข้าไป
                        onChange={(newTheme) => setCurrentTheme(newTheme)} // รับค่ากลับ
                      />
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </ScrollShadow>
          </div>

          <div className="mt-auto">
            <Button className="w-full" color="danger" onPress={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
