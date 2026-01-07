"use client";
import { Button } from "@heroui/button";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./login/page";
import { gsap } from "gsap";

export default function Page() {
  const buttonRef = useRef(null);
  const logoRef = useRef(null);
  const iconRef = useRef(null);
  const textRefs = useRef([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // โลโก้เข้ามา + เด้ง
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
    gsap.to(logoRef.current, {
      y: -8,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ข้อความ fade-in ทีละบรรทัด
    tl.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    );

    // ปุ่มขึ้นมาทีหลัง
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.2"
    );

    // ภาพหมอเลื่อนเข้าจากขวา
    tl.fromTo(
      iconRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.5"
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto px-6 py-10">
        {/* ด้านข้อความ */}
        <div className="flex flex-col justify-center items-center space-y-6 text-center">
          <img
            ref={logoRef}
            src="/images/logoppk.png"
            alt="logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-md"
          />

          <div className="space-y-2">
            <h1
              ref={(el) => (textRefs.current[0] = el)}
              className="text-xl md:text-2xl text-gray-500 dark:text-gray-300"
            >
              Welcome To
            </h1>
            <h2
              ref={(el) => (textRefs.current[1] = el)}
              className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100"
            >
              สมุดฝากครรภ์ Online
            </h2>
            <h3
              ref={(el) => (textRefs.current[2] = el)}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400"
            >
              โรงพยาบาลพระปกเกล้า
            </h3>
          </div>

          <div className="pt-4 w-full md:w-3/4">
            <Button
              color="danger"
              ref={buttonRef}
              className="w-full text-lg md:text-xl font-medium py-5 rounded-xl shadow-md text-white transition-all duration-200"
              variant="shadow"
              onPress={() => setOpenLoginModal(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>

        {/* ด้านภาพ */}
        <div className="flex justify-center md:justify-end">
          <img
            ref={iconRef}
            src="/images/doctor_anc.png"
            className="w-[80%] md:w-[90%] lg:w-[700px] max-w-full h-auto object-contain drop-shadow-lg"
            alt="หมอหญิง"
          />
        </div>

        <LoginModal
          openModalLogin={openLoginModal}
          closeModalLogin={() => setOpenLoginModal(false)}
        />
      </div>

      {/* แสงตกแต่งเบา ๆ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-green-200 opacity-30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-blue-200 opacity-30 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
